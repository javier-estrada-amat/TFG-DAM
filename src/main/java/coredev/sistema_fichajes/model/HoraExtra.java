package coredev.sistema_fichajes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "horas_extras")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class HoraExtra implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_hora_extra;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(name = "horas_solicitadas", nullable = false, columnDefinition = "DECIMAL(4,2)")
    private BigDecimal horasSolicitadas;

    @Column(name = "horas_aprobadas", columnDefinition = "DECIMAL(4,2)")
    private BigDecimal horasAprobadas;

    @Column
    private String motivo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoHoraExtra estado;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "aprobado_por")
    private Usuario aprobadoPor;

    public double getId() {
        return id_hora_extra;
    }

    public enum EstadoHoraExtra {
        PENDIENTE,
        APROBADA,
        RECHAZADA
    }
}
