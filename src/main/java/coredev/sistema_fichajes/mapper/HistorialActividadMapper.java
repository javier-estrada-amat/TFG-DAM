package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.HistorialActividadDTO;
import coredev.sistema_fichajes.model.HistorialActividad;

public class HistorialActividadMapper {

    public static HistorialActividadDTO toDTO(HistorialActividad entity) {
        if (entity == null) return null;

        HistorialActividadDTO dto = new HistorialActividadDTO();
        dto.setIdHistorial(entity.getId_historial());
        dto.setUsuarioId(entity.getUsuario().getId_usuario());
        dto.setNombreUsuario(entity.getUsuario().getNombre() + " " + entity.getUsuario().getApellidos());
        dto.setAccion(entity.getAccion());
        dto.setEntidadAfectada(entity.getEntidadAfectada());
        dto.setDescripcion(entity.getDescripcion());
        dto.setFecha(entity.getFecha());
        return dto;
    }

    public static HistorialActividad toEntity(HistorialActividadDTO dto) {
        if (dto == null) return null;

        HistorialActividad entity = new HistorialActividad();
        entity.setId_historial(dto.getIdHistorial());
        entity.setAccion(dto.getAccion());
        entity.setEntidadAfectada(dto.getEntidadAfectada());
        entity.setDescripcion(dto.getDescripcion());
        entity.setFecha(dto.getFecha());
        // Usuario se debe asignar desde el servicio/controlador
        return entity;
    }
}
