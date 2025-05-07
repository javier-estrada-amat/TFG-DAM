package coredev.sistema_fichajes.controller;

import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.service.ExcelExportService;
import coredev.sistema_fichajes.service.UsuarioService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/export")
public class ExportController {

    private final UsuarioService usuarioService;
    private final ExcelExportService excelExportService;

    public ExportController(UsuarioService usuarioService, ExcelExportService excelExportService) {
        this.usuarioService = usuarioService;
        this.excelExportService = excelExportService;
    }

    @GetMapping("/usuarios")
    public ResponseEntity<InputStreamResource> exportUsuarios() throws IOException {
        List<Usuario> usuarios = usuarioService.getAllUsuarios(); // Asegúrate de tener este método
        ByteArrayInputStream in = excelExportService.exportUsuariosToExcel(usuarios);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=usuarios.xlsx");

        return ResponseEntity
            .ok()
            .headers(headers)
            .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
            .body(new InputStreamResource(in));
    }
}
