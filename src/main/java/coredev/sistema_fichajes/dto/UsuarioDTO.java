package coredev.sistema_fichajes.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private int idUsuario;
    private String nombre;
    private String apellidos;
    private String email;
    private String password;
    private EmpresaDTO empresa;
}
