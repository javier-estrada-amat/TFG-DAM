package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.LoginResponseDTO;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.UsuarioRepository;
import coredev.sistema_fichajes.service.UsuarioService;
import coredev.sistema_fichajes.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UsuarioRepository usuarioRepository;

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
        Optional<Usuario> user = usuarioService.buscarPorEmail(usuario.getEmail());

        if (user.isPresent() && passwordEncoder.matches(usuario.getPassword(), user.get().getPassword())) {
            Usuario u = user.get();
            List<String> roles = user.get().getRoles().stream()
                .map(rol -> "ROLE_" + rol.getNombre())
                .toList();

            String token = jwtUtil.generarToken(user.get().getEmail(), roles);
            return ResponseEntity.ok(new LoginResponseDTO(1, token, u.isPrimerAcceso()));
        }
        return ResponseEntity.status(401).body(Map.of("code", 2, "mensaje", "Credenciales incorrectas"));
    }

    @PostMapping("/cambiar-password")
    public ResponseEntity<?> cambiarPassword(@RequestBody Map<String, String> datos) {
        String email = datos.get("email");
        String nuevaPassword = datos.get("nuevaPassword");

        Optional<Usuario> userOpt = usuarioService.buscarPorEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensaje", "Usuario no encontrado"));
        }

        Usuario usuario = userOpt.get();
        usuario.setPassword(passwordEncoder.encode(nuevaPassword));
        usuario.setPrimerAcceso(false);

        usuarioRepository.save(usuario);

        return ResponseEntity.ok(Map.of("mensaje", "Contraseña cambiada correctamente"));
    }
}
