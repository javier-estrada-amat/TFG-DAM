package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.service.HoraExtraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/horas-extras")
public class HoraExtraController {

    @Autowired
    private HoraExtraService horaExtraService;

    @PostMapping("/add")
    public ResponseEntity<HoraExtra> addHoraExtra(@RequestBody HoraExtra horaExtra) {
        return new ResponseEntity<>(horaExtraService.agregarHoraExtra(horaExtra), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<HoraExtra>> getAllHorasExtras() {
        return new ResponseEntity<>(horaExtraService.getAllHorasExtras(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<HoraExtra> updateHoraExtra(@RequestBody HoraExtra horaExtra) {
        return new ResponseEntity<>(horaExtraService.actualizarHoraExtra(horaExtra), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHoraExtra(@PathVariable int id) {
        horaExtraService.eliminarHoraExtra(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<HoraExtra>> searchByEstado(@RequestParam HoraExtra.EstadoHoraExtra estado) {
        return new ResponseEntity<>(horaExtraService.buscarPorEstado(estado), HttpStatus.OK);
    }
}
