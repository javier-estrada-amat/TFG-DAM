package coredev.sistema_fichajes.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class HistorialActividadDTO {
    private int idHistorial;
    private int usuarioId;
    private String nombreUsuario;
    private String accion;
    private String entidadAfectada;
    private String descripcion;
    private LocalDateTime fecha;
}
