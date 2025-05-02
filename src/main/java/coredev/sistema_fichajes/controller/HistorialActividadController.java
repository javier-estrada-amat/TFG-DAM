package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.HistorialActividadDTO;
import coredev.sistema_fichajes.mapper.HistorialActividadMapper;
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
    public ResponseEntity<List<HistorialActividadDTO>> getAll() {
        List<HistorialActividadDTO> dtoList = service.getAll().stream()
            .map(HistorialActividadMapper::toDTO)
            .toList();

        return ResponseEntity.ok(dtoList);
    }
}
