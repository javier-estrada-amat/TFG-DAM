package coredev.sistema_fichajes.service;


import coredev.sistema_fichajes.model.HistorialActividad;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.HistorialActividadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HistorialActividadServiceImp implements HistorialActividadService {

    private final HistorialActividadRepository repository;

    @Override
    public void registrar(String accion, String descripcion, String entidadAfectada, Usuario usuario) {
        HistorialActividad historial = new HistorialActividad();
        historial.setAccion(accion);
        historial.setDescripcion(descripcion);
        historial.setEntidadAfectada(entidadAfectada);
        historial.setFecha(LocalDateTime.now());
        historial.setUsuario(usuario);
        repository.save(historial);
    }

    @Override
    public List<HistorialActividad> getAll() {
        return repository.findAll();
    }
}
