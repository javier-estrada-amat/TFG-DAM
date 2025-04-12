package coredev.sistema_fichajes.dto;

import lombok.Data;

import java.util.Date;

@Data
public class UsuarioDTO {
    private int id_usuario;
    private String nombre;
    private String apellidos;
    private String email;
    private String password;
    private Date fecha_registro;;
    private EmpresaDTO empresa;
}
