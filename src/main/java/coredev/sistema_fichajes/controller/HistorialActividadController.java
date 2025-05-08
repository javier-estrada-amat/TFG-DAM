package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.config.JwtUtil;
import coredev.sistema_fichajes.dto.HistorialActividadDTO;
import coredev.sistema_fichajes.mapper.HistorialActividadMapper;
import coredev.sistema_fichajes.model.HistorialActividad;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.HistorialActividadService;
import coredev.sistema_fichajes.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historial-actividad")

public class HistorialActividadController {

    private final JwtUtil jwtUtil;
    private final HistorialActividadService service;
    private final UsuarioService usuarioService;

    public HistorialActividadController(JwtUtil jwtUtil, HistorialActividadService service, UsuarioService usuarioService) {
        this.jwtUtil = jwtUtil;
        this.service = service;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<HistorialActividadDTO>> getAll(HttpServletRequest request) {
        String email = jwtUtil.extraerCorreoDesdeRequest(request);
        Usuario usuario = usuarioService.buscarPorEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean esAdminODireccion = usuario.getRoles().stream()
            .anyMatch(r -> r.getNombre().equals("ADMIN") || r.getNombre().equals("DIRECCION"));

        List<HistorialActividad> historial;
        if (esAdminODireccion) {
            historial = service.obtenerPorEmpresa(usuario.getEmpresa().getId_empresa());
        } else {
            historial = service.obtenerPorUsuario(usuario.getId_usuario());
        }

        List<HistorialActividadDTO> dtoList = historial.stream()
            .map(HistorialActividadMapper::toDTO)
            .toList();

        return ResponseEntity.ok(dtoList);
    }

}
