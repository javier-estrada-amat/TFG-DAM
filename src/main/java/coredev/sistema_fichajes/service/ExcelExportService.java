package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Usuario;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelExportService {

    public ByteArrayInputStream exportUsuariosToExcel(List<Usuario> usuarios) throws IOException {
        String[] columnas = {"ID", "Nombre", "Email", "Rol"};

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Usuarios");

            Row header = sheet.createRow(0);
            for (int i = 0; i < columnas.length; i++) {
                header.createCell(i).setCellValue(columnas[i]);
            }

            int rowIdx = 1;
            for (Usuario usuario : usuarios) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(usuario.getId());
                row.createCell(1).setCellValue(usuario.getNombre());
                row.createCell(2).setCellValue(usuario.getEmail());
                row.createCell(3).setCellValue(usuario.getRol());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    // Puedes repetir esto con otros métodos: exportFichajesToExcel, exportHorasExtrasToExcel, etc.
}
