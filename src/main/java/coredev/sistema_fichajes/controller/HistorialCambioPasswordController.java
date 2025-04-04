package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.HistorialCambioPassword;
import coredev.sistema_fichajes.service.HistorialCambioPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registro-password")
public class HistorialCambioPasswordController {

    @Autowired
    private HistorialCambioPasswordService service;

    @PostMapping("/add")
    public ResponseEntity<HistorialCambioPassword> addRegistro(@RequestBody HistorialCambioPassword registro) {
        return new ResponseEntity<>(service.agregarRegistro(registro), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<HistorialCambioPassword>> getAllRegistros() {
        return new ResponseEntity<>(service.getAllRegistros(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRegistro(@PathVariable int id) {
        service.eliminarRegistro(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
