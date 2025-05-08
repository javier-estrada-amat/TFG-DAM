package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.config.JwtUtil;
import coredev.sistema_fichajes.dto.FichajeDTO;
import coredev.sistema_fichajes.mapper.FichajeMapper;
import coredev.sistema_fichajes.model.Fichaje;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.FichajeService;
import coredev.sistema_fichajes.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/fichajes")
public class FichajeController {

    private final FichajeService fichajeService;
    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;

    public FichajeController(FichajeService fichajeService, UsuarioService usuarioService, JwtUtil jwtUtil) {
        this.fichajeService = fichajeService;
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<FichajeDTO>> obtenerFichajes(HttpServletRequest request) {
        String email = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        List<Fichaje> fichajes;
        boolean esAdminODireccion = usuario.getRoles().stream()
            .anyMatch(rol -> rol.getNombre().equalsIgnoreCase("ADMIN") || rol.getNombre().equalsIgnoreCase("DIRECCION"));
        if (esAdminODireccion) {
            fichajes = fichajeService.obtenerFichajesPorEmpresa(usuario.getEmpresa().getId_empresa());
        } else {
            fichajes = fichajeService.obtenerFichajesPorUsuario(usuario.getId_usuario());
        }
        List<FichajeDTO> fichajesDTO = fichajes.stream()
            .map(FichajeMapper::toDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(fichajesDTO);
    }

    @PostMapping("/iniciar")
    public ResponseEntity<FichajeDTO> iniciarFichaje(HttpServletRequest request) {
        String emailUsuario = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(emailUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el email: " + emailUsuario));

        Fichaje nuevo = fichajeService.iniciarFichaje(usuario.getId_usuario());
        return ResponseEntity.status(HttpStatus.CREATED).body(FichajeMapper.toDTO(nuevo));
    }

    @PutMapping("/finalizar")
    public ResponseEntity<FichajeDTO> finalizarFichaje(HttpServletRequest request) {
        String emailUsuario = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(emailUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el email: " + emailUsuario));

        Fichaje actualizado = fichajeService.finalizarFichaje(usuario.getId_usuario());
        return ResponseEntity.ok(FichajeMapper.toDTO(actualizado));
    }

    @GetMapping("/usuario")
    public ResponseEntity<List<FichajeDTO>> fichajesDelUsuario(HttpServletRequest request) {
        String emailUsuario = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(emailUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Fichaje> fichajes = fichajeService.obtenerFichajesPorUsuario(usuario.getId_usuario());
        return ResponseEntity.ok(
            fichajes.stream().map(FichajeMapper::toDTO).toList()
        );
    }

    @GetMapping("/estado")
    public ResponseEntity<Boolean> estadoFichaje(HttpServletRequest request) {
        String emailUsuario = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(emailUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean enCurso = fichajeService.tieneFichajeEnCurso(usuario.getId_usuario());
        return ResponseEntity.ok(enCurso);
    }
}
