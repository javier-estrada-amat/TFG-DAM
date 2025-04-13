package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.Rol;
import coredev.sistema_fichajes.service.RolService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/api/roles")
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

    @GetMapping("/values")
    public ResponseEntity<Map<Integer, String>> getRolesValues() {
        List<Rol> roles = rolService.getAllRoles();
        Map<Integer, String> valores = roles.stream()
            .collect(Collectors.toMap(Rol::getId_rol, Rol::getNombre));
        return new ResponseEntity<>(valores, HttpStatus.OK);
    }
}

