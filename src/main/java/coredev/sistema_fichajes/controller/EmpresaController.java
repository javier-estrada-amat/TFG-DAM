package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.Empresa;
import coredev.sistema_fichajes.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @PostMapping("/add")
    public ResponseEntity<Empresa> addEmpresa(@RequestBody Empresa empresa) {
        return new ResponseEntity<>(empresaService.agregarEmpresa(empresa), HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Empresa>> getAllEmpresas() {
        return new ResponseEntity<>(empresaService.getAllEmpresas(), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Empresa> updateEmpresa(@RequestBody Empresa empresa) {
        return new ResponseEntity<>(empresaService.actualizarEmpresa(empresa), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEmpresa(@PathVariable int id) {
        empresaService.eliminarEmpresa(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Empresa>> searchByNombre(@RequestParam String nombre) {
        return new ResponseEntity<>(empresaService.buscarPorNombre(nombre), HttpStatus.OK);
    }
}
