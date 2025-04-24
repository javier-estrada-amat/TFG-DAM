package coredev.sistema_fichajes.service;


import coredev.sistema_fichajes.model.HistorialActividad;
import coredev.sistema_fichajes.model.Usuario;

import java.util.List;

public interface HistorialActividadService {
    void registrar(String accion, String descripcion, String entidadAfectada, Usuario usuario);
    List<HistorialActividad> getAll();
}
