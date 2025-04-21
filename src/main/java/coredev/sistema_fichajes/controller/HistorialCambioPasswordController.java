package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.HistorialCambioPasswordDTO;
import coredev.sistema_fichajes.mapper.HistorialCambioPasswordMapper;
import coredev.sistema_fichajes.model.HistorialCambioPassword;
import coredev.sistema_fichajes.service.HistorialCambioPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/registrocambioscontrasenias")
public class HistorialCambioPasswordController {

    @Autowired
    private HistorialCambioPasswordService service;

    @PostMapping("/add")
    public ResponseEntity<HistorialCambioPasswordDTO> addRegistro(@RequestBody HistorialCambioPassword registro) {
        HistorialCambioPassword saved = service.agregarRegistro(registro);
        return new ResponseEntity<>(HistorialCambioPasswordMapper.toDTO(saved), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<HistorialCambioPasswordDTO>> getAllRegistros() {
        List<HistorialCambioPassword> registros = service.getAllRegistros();
        List<HistorialCambioPasswordDTO> registrosDTO = registros.stream()
            .map(HistorialCambioPasswordMapper::toDTO)
            .collect(Collectors.toList());

        return new ResponseEntity<>(registrosDTO, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRegistro(@PathVariable int id) {
        service.eliminarRegistro(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
