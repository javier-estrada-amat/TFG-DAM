package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.UsuarioService;
import coredev.sistema_fichajes.config.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioService.agregarUsuario(usuario);
        return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado con éxito"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Optional<Usuario> user = usuarioService.findByEmail(usuario.getEmail());

        if (user.isPresent() && passwordEncoder.matches(usuario.getPassword(), user.get().getPassword())) {
            List<String> roles = user.get().getRoles().stream()
                .map(rol -> "ROLE_" + rol.getNombre())
                .toList();

            String token = jwtUtil.generarToken(user.get().getEmail(), roles);
            return ResponseEntity.ok(Map.of("code", 1, "token", token));
        }
        return ResponseEntity.status(401).body(Map.of("code", 2, "mensaje", "Credenciales incorrectas"));
    }
}
