package coredev.sistema_fichajes.service;


import coredev.sistema_fichajes.model.HistorialActividad;

import java.util.List;

public interface HistorialActividadService {
    HistorialActividad agregarHistorial(HistorialActividad historial);
    List<HistorialActividad> getAllHistoriales();
    void eliminarHistorial(int id);
}
