package coredev.sistema_fichajes.exception;

public class UsuarioNoAutorizadoException extends RuntimeException {
    public UsuarioNoAutorizadoException(String mensaje) {
        super(mensaje);
    }
}
