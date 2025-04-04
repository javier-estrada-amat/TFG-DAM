package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.FichajeDTO;
import coredev.sistema_fichajes.model.Fichaje;
import coredev.sistema_fichajes.model.Usuario;

public class FichajeMapper {

    public static FichajeDTO toDTO(Fichaje fichaje) {
        if (fichaje == null) return null;

        FichajeDTO dto = new FichajeDTO();
        dto.setIdFichaje(fichaje.getId_fichaje());
        dto.setFecha(fichaje.getFecha());
        dto.setHoraEntrada(fichaje.getHoraEntrada());
        dto.setHoraSalida(fichaje.getHoraSalida());
        dto.setEstado(fichaje.getEstado().name());
        dto.setUsuario(UsuarioMapper.toDTO(fichaje.getUsuario()));
        return dto;
    }

    public static Fichaje toEntity(FichajeDTO dto) {
        if (dto == null) return null;

        Fichaje fichaje = new Fichaje();
        fichaje.setId_fichaje(dto.getIdFichaje());
        fichaje.setFecha(dto.getFecha());
        fichaje.setHoraEntrada(dto.getHoraEntrada());
        fichaje.setHoraSalida(dto.getHoraSalida());

        if (dto.getEstado() != null) {
            fichaje.setEstado(Fichaje.EstadoFichaje.valueOf(dto.getEstado()));
        }

        if (dto.getUsuario() != null) {
            Usuario usuario = UsuarioMapper.toEntity(dto.getUsuario());
            fichaje.setUsuario(usuario);
        }

        return fichaje;
    }
}
