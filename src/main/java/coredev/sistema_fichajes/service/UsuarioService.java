package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Usuario;

import java.util.List;

public interface UsuarioService {
    Usuario agregarUsuario(Usuario usuario);
    List<Usuario> getAllUsuarios();
    Usuario actualizarUsuario(Usuario usuario);
    void eliminarUsuario(int id);
    List<Usuario> buscarPorNombre(String nombre);
}
