package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.dto.HoraExtraDTO;
import coredev.sistema_fichajes.dto.ResolucionHoraExtraDTO;
import coredev.sistema_fichajes.model.HoraExtra;

import java.util.List;

public interface HoraExtraService {
    HoraExtra solicitarHoraExtra(int idUsuario, HoraExtraDTO dto);
    HoraExtra resolverHoraExtra(int idHoraExtra, ResolucionHoraExtraDTO dto, int idDireccion);
    List<HoraExtra> getAllHorasExtras();
    List<HoraExtra> buscarPorEstado(HoraExtra.EstadoHoraExtra estado);
    List<HoraExtra> buscarPorUsuario(int idUsuario);
}
