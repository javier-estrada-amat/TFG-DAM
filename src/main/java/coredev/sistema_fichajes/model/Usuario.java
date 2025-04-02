package coredev.sistema_fichajes.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_usuario;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellidos;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "fecha_registro")
    private Date fechaRegistro;

    @ManyToOne
    @JoinColumn(name = "empresa_id", referencedColumnName = "id_empresa", nullable = false) // Aquí indicamos el nombre real en la tabla empresas
    private Empresa empresa;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Fichaje> fichajes;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<HoraExtra> horasExtras;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    private ConfigAutenticacion configAutenticacion;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<HistorialCambioPassword> historialCambioPassword;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<HistorialActividad> historialActividad;

    @ManyToMany
    @JoinTable(
        name = "usuarios_roles",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "rol_id")
    )
    private List<Rol> roles;
}
