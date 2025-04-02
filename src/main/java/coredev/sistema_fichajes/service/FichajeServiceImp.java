package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Fichaje;
import coredev.sistema_fichajes.repository.FichajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FichajeServiceImp implements FichajeService {

    @Autowired
    private FichajeRepository fichajeRepository;

    @Override
    public Fichaje agregarFichaje(Fichaje fichaje) {
        return fichajeRepository.save(fichaje);
    }

    @Override
    public List<Fichaje> getAllFichajes() {
        return fichajeRepository.findAll();
    }

    @Override
    public Fichaje actualizarFichaje(Fichaje fichaje) {
        return fichajeRepository.save(fichaje);
    }

    @Override
    public void eliminarFichaje(int id) {
        fichajeRepository.deleteById(id);
    }

    @Override
    public List<Fichaje> buscarPorEstado(Fichaje.EstadoFichaje estado) {
        return fichajeRepository.findByEstado(estado);
    }
}
