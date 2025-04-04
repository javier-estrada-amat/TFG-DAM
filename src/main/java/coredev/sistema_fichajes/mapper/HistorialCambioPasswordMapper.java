package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.HistorialCambioPasswordDTO;
import coredev.sistema_fichajes.model.HistorialCambioPassword;

public class HistorialCambioPasswordMapper {

    public static HistorialCambioPasswordDTO toDTO(HistorialCambioPassword entity) {
        if (entity == null) return null;

        HistorialCambioPasswordDTO dto = new HistorialCambioPasswordDTO();
        dto.setIdRegistro(entity.getId_registro());
        dto.setUsuarioId(entity.getUsuario().getId_usuario());
        dto.setFechaCambio(entity.getFechaCambio());
        return dto;
    }

    public static HistorialCambioPassword toEntity(HistorialCambioPasswordDTO dto) {
        if (dto == null) return null;

        HistorialCambioPassword entity = new HistorialCambioPassword();
        entity.setId_registro(dto.getIdRegistro());
        entity.setFechaCambio(dto.getFechaCambio());
        // Usuario se debe asignar desde el servicio/controlador
        return entity;
    }
}
