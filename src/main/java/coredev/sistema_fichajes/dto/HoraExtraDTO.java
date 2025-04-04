package coredev.sistema_fichajes.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class HoraExtraDTO {
    private int idHoraExtra;
    private UsuarioDTO usuario;
    private LocalDate fecha;
    private BigDecimal horasSolicitadas;
    private BigDecimal horasAprobadas;
    private String motivo;
    private String estado; // String porque lo convertimos a Enum en el mapper
    private UsuarioDTO aprobadoPor;
}
