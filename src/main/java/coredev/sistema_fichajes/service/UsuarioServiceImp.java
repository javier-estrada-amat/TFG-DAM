package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImp implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Usuario agregarUsuario(Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario actualizarUsuario(Usuario usuario) {
        Usuario original = usuarioRepository.findById(usuario.getId_usuario()).orElseThrow();

        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            original.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        original.setNombre(usuario.getNombre());
        original.setApellidos(usuario.getApellidos());
        original.setEmail(usuario.getEmail());
        original.setActivo(usuario.isActivo());
        original.setEmpresa(usuario.getEmpresa());
        original.setRoles(usuario.getRoles());

        return usuarioRepository.save(original);
    }

    @Override
    public void eliminarUsuario(int id) {
        System.out.println("Eliminando usuario con ID: " + id);
        usuarioRepository.deleteById(id);
    }

    @Override
    public List<Usuario> buscarPorNombre(String nombre) {
        return usuarioRepository.findByNombreContainingIgnoreCase(nombre);
    }
    @Override
    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Override
    public Optional<Usuario> getUsuarioById(int id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public List<Usuario> getAllUsuariosActivos() {
        return usuarioRepository.findByActivoTrue();
    }
}
