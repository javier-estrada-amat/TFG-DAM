package coredev.sistema_fichajes.config;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDuplicateKey(DataIntegrityViolationException ex) {
        if (ex.getMessage() != null && ex.getMessage().contains("UKkfsp0s1tflm1cwlj8idhqsad0")) {
            return ResponseEntity.badRequest().body("USUARIOS_EMAIL_UNIQUE");
        }
        return ResponseEntity.internalServerError().body("ERROR_DESCONOCIDO");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}
