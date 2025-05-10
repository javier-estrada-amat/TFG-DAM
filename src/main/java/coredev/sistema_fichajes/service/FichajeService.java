package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Fichaje;

import java.util.List;

public interface FichajeService {
    Fichaje iniciarFichaje(int usuarioId);
    Fichaje finalizarFichaje(int usuarioId);
    List<Fichaje> obtenerFichajesPorUsuario(int usuarioId);
    List<Fichaje> obtenerTodosFichajes();
    boolean tieneFichajeEnCurso(int usuarioId);
    List<Fichaje> obtenerFichajesPorEmpresa(int idEmpresa);
}
