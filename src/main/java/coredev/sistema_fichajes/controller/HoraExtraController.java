package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.config.JwtUtil;
import coredev.sistema_fichajes.dto.HoraExtraDTO;
import coredev.sistema_fichajes.dto.ResolucionHoraExtraDTO;
import coredev.sistema_fichajes.mapper.HoraExtraMapper;
import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.HistorialActividadService;
import coredev.sistema_fichajes.service.HoraExtraService;
import coredev.sistema_fichajes.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horasextras")
public class HoraExtraController {

    private final HoraExtraService horaExtraService;
    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService;
    private final HistorialActividadService historialActividadService;

    public HoraExtraController(HoraExtraService horaExtraService, JwtUtil jwtUtil, UsuarioService usuarioService, HistorialActividadService historialActividadService) {
        this.horaExtraService = horaExtraService;
        this.jwtUtil = jwtUtil;
        this.usuarioService = usuarioService;
        this.historialActividadService = historialActividadService;
    }

    @PostMapping("/crear")
    public ResponseEntity<HoraExtraDTO> crearHoraExtra(@RequestBody HoraExtraDTO dto, HttpServletRequest request) {
        String correo = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(correo)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        HoraExtra nueva = horaExtraService.solicitarHoraExtra(usuario.getId_usuario(), dto);
        historialActividadService.registrar(
            "MODIFICACION",
            "Solicitud de horas extra",
            "HORAS_EXTRA",
            usuario
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(HoraExtraMapper.toDTO(nueva));
    }

    @PutMapping("/resolver/{id}")
    public ResponseEntity<HoraExtraDTO> resolverHoraExtra(@PathVariable int id, @RequestBody ResolucionHoraExtraDTO dto, HttpServletRequest request) {
        String correo = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario aprobador = usuarioService.buscarPorEmail(correo)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        HoraExtra actualizada = horaExtraService.resolverHoraExtra(id, dto, aprobador.getId_usuario());
        String accion = dto.getEstado() == HoraExtra.EstadoHoraExtra.APROBADA ? "APROBACION" : "RECHAZO";
        historialActividadService.registrar(
            accion,
            "Resolución de horas extra (estado: " + dto.getEstado() + ")",
            "HORAS_EXTRA",
            aprobador
        );
        return ResponseEntity.ok(HoraExtraMapper.toDTO(actualizada));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<HoraExtra>> getAllHorasExtras(HttpServletRequest request) {
        String correo = jwtUtil.extraerCorreoDesdeRequest(request);
        System.out.println("Correo extraído: " + correo);
        return new ResponseEntity<>(horaExtraService.getAllHorasExtras(), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<HoraExtra>> searchByEstado(@RequestParam HoraExtra.EstadoHoraExtra estado) {
        return new ResponseEntity<>(horaExtraService.buscarPorEstado(estado), HttpStatus.OK);
    }
}
