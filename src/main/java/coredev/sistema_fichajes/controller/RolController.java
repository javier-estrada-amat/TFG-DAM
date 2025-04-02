package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.Rol;
import coredev.sistema_fichajes.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RolController {

    @Autowired
    private RolService rolService;

    @PostMapping("/add")
    public ResponseEntity<Rol> addRol(@RequestBody Rol rol) {
        return new ResponseEntity<>(rolService.agregarRol(rol), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Rol>> getAllRoles() {
        return new ResponseEntity<>(rolService.getAllRoles(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Rol> updateRol(@RequestBody Rol rol) {
        return new ResponseEntity<>(rolService.actualizarRol(rol), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRol(@PathVariable int id) {
        rolService.eliminarRol(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Rol>> searchByNombre(@RequestParam String nombre) {
        return new ResponseEntity<>(rolService.buscarPorNombre(nombre), HttpStatus.OK);
    }
}

