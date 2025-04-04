package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.HistorialCambioPassword;
import coredev.sistema_fichajes.repository.HistorialCambioPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistorialCambioPasswordServiceImp implements HistorialCambioPasswordService {

    @Autowired
    private HistorialCambioPasswordRepository repository;

    @Override
    public HistorialCambioPassword agregarRegistro(HistorialCambioPassword registro) {
        return repository.save(registro);
    }

    @Override
    public List<HistorialCambioPassword> getAllRegistros() {
        return repository.findAll();
    }

    @Override
    public void eliminarRegistro(int id) {
        repository.deleteById(id);
    }
}
