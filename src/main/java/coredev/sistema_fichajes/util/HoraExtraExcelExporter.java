package coredev.sistema_fichajes.util;

import coredev.sistema_fichajes.model.HistorialActividad;
import coredev.sistema_fichajes.model.HoraExtra;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class HoraExtraExcelExporter {

    private XSSFWorkbook workbook;
    private Sheet sheet;
    private List<HoraExtra> listaHorasExtras;

    public HoraExtraExcelExporter(List<HoraExtra> listaHorasExtras) {
        this.listaHorasExtras = listaHorasExtras;
        workbook = new XSSFWorkbook();
    }

    private void escribirCabecera() {
        sheet = workbook.createSheet("Horas Extra");

        Row fila = sheet.createRow(0);

        CellStyle estilo = workbook.createCellStyle();
        Font fuente = workbook.createFont();
        fuente.setBold(true);
        fuente.setFontHeight((short) 14);
        estilo.setFont(fuente);

        String[] cabeceras = { "ID", "Usuario", "Fecha", "Horas", "Estado", "Motivo" };

        for (int i = 0; i < cabeceras.length; i++) {
            Cell celda = fila.createCell(i);
            celda.setCellValue(cabeceras[i]);
            celda.setCellStyle(estilo);
        }
    }

    private void escribirDatos() {
        int numFila = 1;

        CellStyle estilo = workbook.createCellStyle();
        Font fuente = workbook.createFont();
        fuente.setFontHeight((short) 12);
        estilo.setFont(fuente);

        for (HoraExtra he : listaHorasExtras) {
            Row fila = sheet.createRow(numFila++);

            fila.createCell(0).setCellValue(he.getId());
            fila.createCell(1).setCellValue(he.getUsuario().getNombre()); // Ajusta según tu modelo
            fila.createCell(2).setCellValue(he.getFecha().toString());
            fila.createCell(3).setCellValue((RichTextString) he.getHorasSolicitadas());
            fila.createCell(4).setCellValue(he.getEstado().name()); // Asumiendo enum
            fila.createCell(5).setCellValue(he.getMotivo());
        }

        for (int i = 0; i < 6; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    public void export(HttpServletResponse response) throws IOException {
        escribirCabecera();
        escribirDatos();

        ServletOutputStream salida = response.getOutputStream();
        workbook.write(salida);
        workbook.close();
        salida.close();
    }
}
