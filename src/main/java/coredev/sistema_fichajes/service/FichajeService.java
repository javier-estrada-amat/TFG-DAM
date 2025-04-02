package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Fichaje;

import java.util.List;

public interface FichajeService {
    Fichaje agregarFichaje(Fichaje fichaje);
    List<Fichaje> getAllFichajes();
    Fichaje actualizarFichaje(Fichaje fichaje);
    void eliminarFichaje(int id);
    List<Fichaje> buscarPorEstado(Fichaje.EstadoFichaje estado);
}
