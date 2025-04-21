package coredev.sistema_fichajes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private int code;
    private String token;
    private boolean primerAcceso;
}
