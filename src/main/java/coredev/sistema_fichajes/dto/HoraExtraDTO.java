package coredev.sistema_fichajes.dto;

import coredev.sistema_fichajes.model.HoraExtra;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class HoraExtraDTO {
    private int id_hora_extra;
    private UsuarioDTO usuario;
    private LocalDate fecha;
    private BigDecimal horasSolicitadas;
    private BigDecimal horasAprobadas;
    private String motivo;
    private String estado;
    private UsuarioDTO aprobadoPor;
}
