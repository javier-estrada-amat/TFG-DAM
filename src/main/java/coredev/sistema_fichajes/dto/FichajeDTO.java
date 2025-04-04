package coredev.sistema_fichajes.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class FichajeDTO {
    private int idFichaje;
    private UsuarioDTO usuario;
    private LocalDate fecha;
    private LocalDateTime horaEntrada;
    private LocalDateTime horaSalida;
    private String estado;
}
