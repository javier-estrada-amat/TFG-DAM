package coredev.sistema_fichajes.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class FichajeDTO {
    private int id_fichaje;
    private int usuario_id;
    private LocalDate fecha;
    private LocalDateTime hora_entrada;
    private LocalDateTime hora_salida;
    private String estado;
}
