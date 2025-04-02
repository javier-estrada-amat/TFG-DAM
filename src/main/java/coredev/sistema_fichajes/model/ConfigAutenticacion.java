package coredev.sistema_fichajes.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "configuracion_autenticacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ConfigAutenticacion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_autenticacion;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @Column(name = "codigo_secreto", nullable = false)
    private String codigoSecreto;

    @Column(nullable = false)
    private boolean activado;
}
