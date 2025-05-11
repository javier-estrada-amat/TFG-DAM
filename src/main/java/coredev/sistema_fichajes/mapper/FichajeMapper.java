package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.FichajeDTO;
import coredev.sistema_fichajes.model.Fichaje;

public class FichajeMapper {

    public static FichajeDTO toDTO(Fichaje fichaje) {
        if (fichaje == null) return null;

        FichajeDTO dto = new FichajeDTO();
        dto.setId_fichaje(fichaje.getId_fichaje());
        dto.setFecha(fichaje.getFecha());
        dto.setHora_entrada(fichaje.getHora_entrada());
        dto.setHora_salida(fichaje.getHora_salida());
        dto.setEstado(fichaje.getEstado().name());
        dto.setUsuario_id(fichaje.getUsuario().getId_usuario());
        return dto;
    }

    public static Fichaje toEntity(FichajeDTO dto) {
        if (dto == null) return null;

        Fichaje fichaje = new Fichaje();
        fichaje.setId_fichaje(dto.getId_fichaje());
        if (dto.getEstado() != null) {
            fichaje.setEstado(Fichaje.EstadoFichaje.valueOf(dto.getEstado()));
        }
        fichaje.setFecha(dto.getFecha());
        fichaje.setHora_entrada(dto.getHora_entrada());
        fichaje.setHora_salida(dto.getHora_salida());

        return fichaje;
    }
}
