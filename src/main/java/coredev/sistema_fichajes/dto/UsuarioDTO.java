package coredev.sistema_fichajes.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UsuarioDTO {
    private int id_usuario;
    private String nombre;
    private String apellidos;
    private String email;
    private String password;
    private LocalDateTime fecha_registro;
    private boolean activo;
    private EmpresaDTO empresa;
    private List<Integer> roles;
    private boolean primerAcceso;
}
