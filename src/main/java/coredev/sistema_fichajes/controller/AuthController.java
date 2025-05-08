package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.LoginResponseDTO;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.UsuarioRepository;
import coredev.sistema_fichajes.service.HistorialActividadService;
import coredev.sistema_fichajes.service.UsuarioService;
import coredev.sistema_fichajes.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import coredev.sistema_fichajes.mapper.UsuarioMapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final String MENSAJE_KEY = "mensaje";

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final HistorialActividadService historialActividadService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioService.agregarUsuario(usuario);
        return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Usuario registrado con éxito"));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Usuario usuario) {
        Optional<Usuario> user = usuarioService.buscarPorEmail(usuario.getEmail());

        if (user.isPresent() && passwordEncoder.matches(usuario.getPassword(), user.get().getPassword())) {
            Usuario u = user.get();
            List<String> roles = u.getRoles().stream()
                .map(rol -> "ROLE_" + rol.getNombre())
                .toList();
            String token = jwtUtil.generarToken(u.getEmail(), roles);
//            historialActividadService.registrar(
//                "LOGIN",
//                "Inicio de sesión exitoso",
//                "USUARIO",
//                u
//            );
            LoginResponseDTO response = LoginResponseDTO.builder()
                .code(1)
                .token(token)
                .primerAcceso(u.isPrimerAcceso())
                .usuario(UsuarioMapper.toDTO(u))
                .build();

            return ResponseEntity.ok(response);
        }
        usuarioService.buscarPorEmail(usuario.getEmail()).ifPresent(uFallido ->
            historialActividadService.registrar(
                "LOGIN_FALLIDO",
                "Intento de login fallido",
                "USUARIO",
                uFallido
            )
        );
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("code", 2, MENSAJE_KEY, "Credenciales incorrectas"));
    }

    @PostMapping("/cambiar-password")
    public ResponseEntity<Map<String, String>> cambiarPassword(@RequestBody Map<String, String> datos) {
        String email = datos.get("email");
        String nuevaPassword = datos.get("nuevaPassword");

        Optional<Usuario> userOpt = usuarioService.buscarPorEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(MENSAJE_KEY, "Usuario no encontrado"));
        }

        Usuario usuario = userOpt.get();
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuario.setPrimerAcceso(false);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok(Map.of(MENSAJE_KEY, "Contraseña cambiada correctamente"));
    }
}
