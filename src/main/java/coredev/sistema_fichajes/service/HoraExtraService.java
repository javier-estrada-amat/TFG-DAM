package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.HoraExtra;

import java.util.List;

public interface HoraExtraService {
    HoraExtra agregarHoraExtra(HoraExtra horaExtra);
    List<HoraExtra> getAllHorasExtras();
    HoraExtra actualizarHoraExtra(HoraExtra horaExtra);
    void eliminarHoraExtra(int id);
    List<HoraExtra> buscarPorEstado(HoraExtra.EstadoHoraExtra estado);
}
