package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.ConfigAutenticacionDTO;
import coredev.sistema_fichajes.model.ConfigAutenticacion;

public class ConfigAutenticacionMapper {

    public static ConfigAutenticacionDTO toDTO(ConfigAutenticacion config) {
        if (config == null) return null;

        ConfigAutenticacionDTO dto = new ConfigAutenticacionDTO();
        dto.setIdAutenticacion(config.getId_autenticacion());
        dto.setUsuarioId(config.getUsuario().getId_usuario());
        dto.setCodigoSecreto(config.getCodigoSecreto());
        dto.setActivado(config.isActivado());
        return dto;
    }

    public static ConfigAutenticacion toEntity(ConfigAutenticacionDTO dto) {
        if (dto == null) return null;

        ConfigAutenticacion config = new ConfigAutenticacion();
        config.setId_autenticacion(dto.getIdAutenticacion());
        config.setCodigoSecreto(dto.getCodigoSecreto());
        config.setActivado(dto.isActivado());
        // Usuario se asignará desde el servicio/controlador
        return config;
    }
}
