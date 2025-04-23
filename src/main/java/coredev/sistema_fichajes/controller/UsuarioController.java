package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.UsuarioDTO;
import coredev.sistema_fichajes.mapper.UsuarioMapper;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }


    @PostMapping("/add")
    public ResponseEntity<UsuarioDTO> addUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = UsuarioMapper.toEntity(usuarioDTO);
        Usuario creado = usuarioService.agregarUsuario(usuario);
        return new ResponseEntity<>(UsuarioMapper.toDTO(creado), HttpStatus.CREATED);
    }
    @GetMapping("/list/activos")
    public ResponseEntity<List<UsuarioDTO>> getUsuariosActivos() {
        List<Usuario> usuarios = usuarioService.getAllUsuariosActivos();
        List<UsuarioDTO> usuariosDTO = usuarios.stream()
            .map(UsuarioMapper::toDTO)
            .collect(Collectors.toList());
        return new ResponseEntity<>(usuariosDTO, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        List<UsuarioDTO> usuariosDTO = usuarios.stream()
            .map(UsuarioMapper::toDTO)
            .collect(Collectors.toList());
        return new ResponseEntity<>(usuariosDTO, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<UsuarioDTO> updateUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = UsuarioMapper.toEntity(usuarioDTO);
        Usuario actualizado = usuarioService.actualizarUsuario(usuario);
        return new ResponseEntity<>(UsuarioMapper.toDTO(actualizado), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable int id) {
        usuarioService.eliminarUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UsuarioDTO>> searchByNombre(@RequestParam String nombre) {
        List<UsuarioDTO> resultados = usuarioService.buscarPorNombre(nombre).stream()
            .map(UsuarioMapper::toDTO)
            .collect(Collectors.toList());
        return new ResponseEntity<>(resultados, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable int id) {
        Optional<Usuario> usuarioOpt = usuarioService.getUsuarioById(id);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(UsuarioMapper.toDTO(usuarioOpt.get()));
    }

    @PutMapping("/desactivar/{id}")
    public ResponseEntity<Void> desactivarUsuario(@PathVariable int id) {
        Usuario usuario = usuarioService.getUsuarioById(id).orElseThrow();
        usuario.setActivo(false);
        usuarioService.actualizarUsuario(usuario);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/resetear-password/{id}")
    public ResponseEntity<?> resetearPassword(@PathVariable int id) {
        usuarioService.resetearPassword(id);
        return ResponseEntity.ok(Map.of("mensaje", "Contraseña reseteada. Se requerirá cambio al iniciar sesión."));
    }
}
