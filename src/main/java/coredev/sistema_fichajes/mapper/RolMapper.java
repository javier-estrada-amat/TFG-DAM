package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.RolDTO;
import coredev.sistema_fichajes.model.Rol;

public class RolMapper {

    public static RolDTO toDTO(Rol rol) {
        if (rol == null) return null;

        RolDTO dto = new RolDTO();
        dto.setId_rol(rol.getId_rol());
        dto.setNombre(rol.getNombre());
        return dto;
    }

    public static Rol toEntity(RolDTO dto) {
        if (dto == null) return null;

        Rol rol = new Rol();
        rol.setId_rol(dto.getId_rol());
        rol.setNombre(dto.getNombre());
        return rol;
    }
}
