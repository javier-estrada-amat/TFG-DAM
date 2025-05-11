package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.config.JwtUtil;
import coredev.sistema_fichajes.dto.HistorialCambioPasswordDTO;
import coredev.sistema_fichajes.mapper.HistorialCambioPasswordMapper;
import coredev.sistema_fichajes.model.HistorialCambioPassword;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.HistorialCambioPasswordService;
import coredev.sistema_fichajes.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrocambioscontrasenias")
public class HistorialCambioPasswordController {

    private final HistorialCambioPasswordService service;
    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService;
    private final HistorialCambioPasswordService historialService;

    public HistorialCambioPasswordController(HistorialCambioPasswordService service, JwtUtil jwtUtil, UsuarioService usuarioService, HistorialCambioPasswordService historialService) {
        this.service = service;
        this.jwtUtil = jwtUtil;
        this.usuarioService = usuarioService;
        this.historialService = historialService;
    }

    @PostMapping("/add")
    public ResponseEntity<HistorialCambioPasswordDTO> addRegistro(@RequestBody HistorialCambioPassword registro) {
        HistorialCambioPassword saved = service.agregarRegistro(registro);
        return new ResponseEntity<>(HistorialCambioPasswordMapper.toDTO(saved), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<HistorialCambioPasswordDTO>> obtenerHistorial(HttpServletRequest request) {
        String email = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(email).orElseThrow();

        List<HistorialCambioPassword> historial;

        boolean esAdminODireccion = usuario.getRoles().stream()
            .anyMatch(r -> r.getNombre().equals("ADMIN") || r.getNombre().equals("DIRECCION"));

        if (esAdminODireccion) {
            historial = historialService.obtenerPorEmpresa(usuario.getEmpresa().getId_empresa());
        } else {
            historial = historialService.obtenerPorUsuario(usuario.getId_usuario());
        }

        List<HistorialCambioPasswordDTO> historialDTO = historial.stream()
            .map(HistorialCambioPasswordMapper::toDTO)
            .toList();

        return ResponseEntity.ok(historialDTO);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRegistro(@PathVariable int id) {
        service.eliminarRegistro(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
