package coredev.sistema_fichajes.model;

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
public class HoraExtra implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_hora_extra;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(name = "horas_solicitadas", nullable = false)
    private BigDecimal horasSolicitadas;

    @Column(name = "horas_aprobadas")
    private BigDecimal horasAprobadas;

    @Column
    private String motivo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoHoraExtra estado;

    @ManyToOne
    @JoinColumn(name = "aprobado_por")
    private Usuario aprobadoPor;

    public enum EstadoHoraExtra {
        PENDIENTE,
        APROBADA,
        RECHAZADA
    }
}
