package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.HistorialActividad;
import coredev.sistema_fichajes.service.HistorialActividadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historial-actividad")
@RequiredArgsConstructor
public class HistorialActividadController {

    private final HistorialActividadService service;

    @GetMapping
    public ResponseEntity<List<HistorialActividad>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}
