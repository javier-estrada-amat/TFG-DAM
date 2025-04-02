package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.Fichaje;
import coredev.sistema_fichajes.service.FichajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fichajes")
public class FichajeController {

    @Autowired
    private FichajeService fichajeService;

    @PostMapping("/add")
    public ResponseEntity<Fichaje> addFichaje(@RequestBody Fichaje fichaje) {
        return new ResponseEntity<>(fichajeService.agregarFichaje(fichaje), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Fichaje>> getAllFichajes() {
        return new ResponseEntity<>(fichajeService.getAllFichajes(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Fichaje> updateFichaje(@RequestBody Fichaje fichaje) {
        return new ResponseEntity<>(fichajeService.actualizarFichaje(fichaje), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFichaje(@PathVariable int id) {
        fichajeService.eliminarFichaje(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Fichaje>> searchByEstado(@RequestParam Fichaje.EstadoFichaje estado) {
        return new ResponseEntity<>(fichajeService.buscarPorEstado(estado), HttpStatus.OK);
    }
}

