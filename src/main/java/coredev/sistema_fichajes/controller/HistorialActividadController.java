package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.HistorialActividad;
import coredev.sistema_fichajes.service.HistorialActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historial-actividad")
public class HistorialActividadController {

    @Autowired
    private HistorialActividadService service;

    @PostMapping("/add")
    public ResponseEntity<HistorialActividad> addHistorial(@RequestBody HistorialActividad historial) {
        return new ResponseEntity<>(service.agregarHistorial(historial), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<HistorialActividad>> getAllHistoriales() {
        return new ResponseEntity<>(service.getAllHistoriales(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHistorial(@PathVariable int id) {
        service.eliminarHistorial(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
