package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Rol;
import coredev.sistema_fichajes.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImp implements RolService {

    @Autowired
    private RolRepository rolRepository;

    @Override
    public Rol agregarRol(Rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public List<Rol> getAllRoles() {
        return rolRepository.findAll();
    }

    @Override
    public Rol actualizarRol(Rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public void eliminarRol(int id) {
        rolRepository.deleteById(id);
    }

    @Override
    public List<Rol> buscarPorNombre(String nombre) {
        return rolRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
