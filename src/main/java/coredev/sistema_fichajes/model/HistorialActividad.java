package coredev.sistema_fichajes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_actividad")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HistorialActividad implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_historial;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private String accion;

    @Column(name = "entidad_afectada", nullable = false)
    private String entidadAfectada;

    @Column
    private String descripcion;

    @Column(nullable = false)
    private LocalDateTime fecha;
}
