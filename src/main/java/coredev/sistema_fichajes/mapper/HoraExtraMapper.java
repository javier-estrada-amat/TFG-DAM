package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.HoraExtraDTO;
import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.model.Usuario;

public class HoraExtraMapper {

    public static HoraExtraDTO toDTO(HoraExtra entity) {
        HoraExtraDTO dto = new HoraExtraDTO();
        dto.setId_hora_extra(entity.getId_hora_extra());
        dto.setUsuario(UsuarioMapper.toDTO(entity.getUsuario()));
        dto.setFecha(entity.getFecha());
        dto.setHorasSolicitadas(entity.getHorasSolicitadas());
        dto.setHorasAprobadas(entity.getHorasAprobadas());
        dto.setMotivo(entity.getMotivo());
        dto.setEstado(entity.getEstado() != null ? entity.getEstado().name() : null); // Enum → String

        if (entity.getAprobadoPor() != null) {
            dto.setAprobadoPor(UsuarioMapper.toDTO(entity.getAprobadoPor()));
        }

        return dto;
    }

    public static HoraExtra toEntity(HoraExtraDTO dto, Usuario usuario, Usuario aprobadoPor) {
        HoraExtra h = new HoraExtra();
        h.setId_hora_extra(dto.getId_hora_extra());
        h.setUsuario(usuario);
        h.setFecha(dto.getFecha());
        h.setHorasSolicitadas(dto.getHorasSolicitadas());
        h.setHorasAprobadas(dto.getHorasAprobadas());
        h.setMotivo(dto.getMotivo());

        if (dto.getEstado() != null) {
            h.setEstado(HoraExtra.EstadoHoraExtra.valueOf(dto.getEstado()));
        }

        h.setAprobadoPor(aprobadoPor);
        return h;
    }
}
