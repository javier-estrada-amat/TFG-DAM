package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Rol;

import java.util.List;

public interface RolService {
    Rol agregarRol(Rol rol);
    List<Rol> getAllRoles();
    Rol actualizarRol(Rol rol);
    void eliminarRol(int id);
    List<Rol> buscarPorNombre(String nombre);
}
