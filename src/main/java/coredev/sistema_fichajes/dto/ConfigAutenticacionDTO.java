package coredev.sistema_fichajes.dto;

import lombok.Data;

@Data
public class ConfigAutenticacionDTO {
    private int idAutenticacion;
    private int usuarioId;
    private String codigoSecreto;
    private boolean activado;
}
