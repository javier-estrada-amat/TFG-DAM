package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.ConfigAutenticacion;
import coredev.sistema_fichajes.service.ConfigAutenticacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/config-autenticacion")
public class ConfigAutenticacionController {

    @Autowired
    private ConfigAutenticacionService service;

    @PostMapping("/add")
    public ResponseEntity<ConfigAutenticacion> addConfig(@RequestBody ConfigAutenticacion config) {
        return new ResponseEntity<>(service.agregarConfig(config), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ConfigAutenticacion>> getAllConfigs() {
        return new ResponseEntity<>(service.getAllConfigs(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ConfigAutenticacion> updateConfig(@RequestBody ConfigAutenticacion config) {
        return new ResponseEntity<>(service.actualizarConfig(config), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteConfig(@PathVariable int id) {
        service.eliminarConfig(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
