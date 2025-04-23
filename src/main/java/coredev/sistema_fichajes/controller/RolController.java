package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.dto.RolDTO;
import coredev.sistema_fichajes.mapper.RolMapper;
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

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping("/add")
    public ResponseEntity<RolDTO> addRol(@RequestBody RolDTO rolDto) {
        Rol nuevo = rolService.agregarRol(RolMapper.toEntity(rolDto));
        return ResponseEntity.status(HttpStatus.CREATED).body(RolMapper.toDTO(nuevo));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<RolDTO>> getAllRoles() {
        List<Rol> roles = rolService.getAllRoles();
        List<RolDTO> dtoList = roles.stream().map(RolMapper::toDTO).toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RolDTO> getRolById(@PathVariable int id) {
        Rol rol = rolService.getRolById(id);
        return ResponseEntity.ok(RolMapper.toDTO(rol));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RolDTO> updateRol(@PathVariable int id, @RequestBody RolDTO rolDto) {
        rolDto.setId_rol(id);
        Rol actualizado = rolService.actualizarRol(RolMapper.toEntity(rolDto));
        return ResponseEntity.ok(RolMapper.toDTO(actualizado));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteRol(@PathVariable int id) {
        rolService.eliminarRol(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<RolDTO>> searchByNombre(@RequestParam String nombre) {
        List<Rol> roles = rolService.buscarPorNombre(nombre);
        List<RolDTO> dtoList = roles.stream().map(RolMapper::toDTO).toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/values")
    public ResponseEntity<Map<Integer, String>> getRolesValues() {
        List<Rol> roles = rolService.getAllRoles();
        Map<Integer, String> valores = roles.stream()
            .collect(Collectors.toMap(Rol::getId_rol, Rol::getNombre));
        return new ResponseEntity<>(valores, HttpStatus.OK);
    }
}

