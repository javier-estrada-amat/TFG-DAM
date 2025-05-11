package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.EmpresaDTO;
import coredev.sistema_fichajes.mapper.EmpresaMapper;
import coredev.sistema_fichajes.model.Empresa;
import coredev.sistema_fichajes.service.EmpresaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService) {
        this.empresaService = empresaService;
    }

    @PostMapping("/add")
    public ResponseEntity<Empresa> addEmpresa(@RequestBody Empresa empresa) {
        return new ResponseEntity<>(empresaService.agregarEmpresa(empresa), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaDTO> getEmpresaById(@PathVariable int id) {
        Empresa empresa = empresaService.getEmpresaById(id);
        return ResponseEntity.ok(EmpresaMapper.toDTO(empresa));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Empresa>> getAllEmpresas() {
        return new ResponseEntity<>(empresaService.getAllEmpresas(), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<EmpresaDTO> updateEmpresa(@PathVariable int id, @RequestBody EmpresaDTO empresaDto) {
        empresaDto.setId_empresa(id);
        Empresa empresaActualizada = empresaService.actualizarEmpresa(EmpresaMapper.toEntity(empresaDto));
        return ResponseEntity.ok(EmpresaMapper.toDTO(empresaActualizada));
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
    @GetMapping("/values")
    public ResponseEntity<Map<Integer, String>> getEmpresasValues() {
        List<Empresa> empresas = empresaService.getAllEmpresas();
        Map<Integer, String> valores = empresas.stream()
            .collect(Collectors.toMap(Empresa::getId_empresa, Empresa::getNombre));
        return new ResponseEntity<>(valores, HttpStatus.OK);
    }
}
