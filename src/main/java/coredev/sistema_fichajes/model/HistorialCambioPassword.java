package coredev.sistema_fichajes.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "registro_cambios_contrasenia")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class HistorialCambioPassword implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_registro;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_cambio", nullable = false)
    private LocalDateTime fechaCambio;
}
