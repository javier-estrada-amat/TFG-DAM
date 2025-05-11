package coredev.sistema_fichajes.dto;

import coredev.sistema_fichajes.model.HoraExtra;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ResolucionHoraExtraDTO {

    @NotNull
    private BigDecimal horasAprobadas;

    @NotNull
    private HoraExtra.EstadoHoraExtra estado;
}
