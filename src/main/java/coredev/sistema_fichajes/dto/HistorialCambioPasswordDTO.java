package coredev.sistema_fichajes.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class HistorialCambioPasswordDTO {
    private int idRegistro;
    private int usuarioId;
    private LocalDateTime fechaCambio;
}
