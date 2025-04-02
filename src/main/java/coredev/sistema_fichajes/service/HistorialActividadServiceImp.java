package coredev.sistema_fichajes.service;


import coredev.sistema_fichajes.model.HistorialActividad;
import coredev.sistema_fichajes.repository.HistorialActividadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistorialActividadServiceImp implements HistorialActividadService {

    @Autowired
    private HistorialActividadRepository repository;

    @Override
    public HistorialActividad agregarHistorial(HistorialActividad historial) {
        return repository.save(historial);
    }

    @Override
    public List<HistorialActividad> getAllHistoriales() {
        return repository.findAll();
    }

    @Override
    public void eliminarHistorial(int id) {
        repository.deleteById(id);
    }
}
