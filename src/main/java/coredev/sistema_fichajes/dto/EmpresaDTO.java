package coredev.sistema_fichajes.dto;

import lombok.Data;

@Data
public class EmpresaDTO {
    private int idEmpresa;
    private String nombre;
    private String cif;
    private String direccion;
    private String telefono;
    private String email;
}
