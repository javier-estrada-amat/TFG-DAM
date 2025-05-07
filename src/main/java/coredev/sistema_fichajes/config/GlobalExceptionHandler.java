package coredev.sistema_fichajes.config;

import coredev.sistema_fichajes.exception.RecursoNoEncontradoException;
import coredev.sistema_fichajes.exception.UsuarioNoAutorizadoException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<Map<String, String>> handleNotFound(RecursoNoEncontradoException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(UsuarioNoAutorizadoException.class)
    public ResponseEntity<Map<String, String>> handleUnauthorized(UsuarioNoAutorizadoException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDuplicateKey(DataIntegrityViolationException ex) {
        if (ex.getMessage() != null) {
            if (ex.getMessage().contains("UKkfsp0s1tflm1cwlj8idhqsad0")) {
                return ResponseEntity.badRequest().body("USUARIOS_EMAIL_UNIQUE");
            }
            if (ex.getMessage().contains("UKc7cyjurr7becfrsbpmlxdpciq7")) {
                return ResponseEntity.badRequest().body("EMPRESAS_CIF_UNIQUE");
            }
        }
        return ResponseEntity.internalServerError().body("ERROR_DESCONOCIDO");
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatus(ResponseStatusException ex) {
        String mensaje = ex.getReason();
        return ResponseEntity.status(ex.getStatusCode()).body(Map.of("error", mensaje));
    }
}
