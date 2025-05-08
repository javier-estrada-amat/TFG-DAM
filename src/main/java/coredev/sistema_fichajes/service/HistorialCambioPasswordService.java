package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.HistorialCambioPassword;
import java.util.List;

public interface HistorialCambioPasswordService {
    HistorialCambioPassword agregarRegistro(HistorialCambioPassword registro);
    List<HistorialCambioPassword> getAllRegistros();
    void eliminarRegistro(int id);
    List<HistorialCambioPassword> obtenerPorUsuario(int idUsuario);
    List<HistorialCambioPassword> obtenerPorEmpresa(int idEmpresa);
}
