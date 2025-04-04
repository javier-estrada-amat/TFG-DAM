package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.HoraExtraDTO;
import coredev.sistema_fichajes.dto.UsuarioDTO;
import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.model.Usuario;

public class HoraExtraMapper {

    public static HoraExtraDTO toDTO(HoraExtra horaExtra) {
        if (horaExtra == null) return null;

        HoraExtraDTO dto = new HoraExtraDTO();
        dto.setIdHoraExtra(horaExtra.getId_hora_extra());
        dto.setUsuario(UsuarioMapper.toDTO(horaExtra.getUsuario()));
        dto.setFecha(horaExtra.getFecha());
        dto.setHorasSolicitadas(horaExtra.getHorasSolicitadas());
        dto.setHorasAprobadas(horaExtra.getHorasAprobadas());
        dto.setMotivo(horaExtra.getMotivo());
        dto.setEstado(horaExtra.getEstado().name());
        dto.setAprobadoPor(
            horaExtra.getAprobadoPor() != null ? UsuarioMapper.toDTO(horaExtra.getAprobadoPor()) : null
        );

        return dto;
    }

    public static HoraExtra toEntity(HoraExtraDTO dto) {
        if (dto == null) return null;

        HoraExtra horaExtra = new HoraExtra();
        horaExtra.setId_hora_extra(dto.getIdHoraExtra());
        horaExtra.setUsuario(UsuarioMapper.toEntity(dto.getUsuario()));
        horaExtra.setFecha(dto.getFecha());
        horaExtra.setHorasSolicitadas(dto.getHorasSolicitadas());
        horaExtra.setHorasAprobadas(dto.getHorasAprobadas());
        horaExtra.setMotivo(dto.getMotivo());
        horaExtra.setEstado(HoraExtra.EstadoHoraExtra.valueOf(dto.getEstado()));
        horaExtra.setAprobadoPor(
            dto.getAprobadoPor() != null ? UsuarioMapper.toEntity(dto.getAprobadoPor()) : null
        );

        return horaExtra;
    }
}
