package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.UsuarioDTO;
import coredev.sistema_fichajes.mapper.UsuarioMapper;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/add")
    public ResponseEntity<UsuarioDTO> addUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = UsuarioMapper.toEntity(usuarioDTO);
        Usuario creado = usuarioService.agregarUsuario(usuario);
        return new ResponseEntity<>(UsuarioMapper.toDTO(creado), HttpStatus.CREATED);
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

    @DeleteMapping("/delete/{id}")
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
}
