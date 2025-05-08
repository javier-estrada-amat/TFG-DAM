package coredev.sistema_fichajes.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private int code;
    private String token;
    private boolean primerAcceso;
    private UsuarioDTO usuario;

}
