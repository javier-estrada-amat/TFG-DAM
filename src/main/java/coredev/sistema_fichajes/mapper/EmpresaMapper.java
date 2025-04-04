package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.EmpresaDTO;
import coredev.sistema_fichajes.model.Empresa;

public class EmpresaMapper {

    public static EmpresaDTO toDTO(Empresa empresa) {
        if (empresa == null) return null;

        EmpresaDTO dto = new EmpresaDTO();
        dto.setIdEmpresa(empresa.getId_empresa());
        dto.setNombre(empresa.getNombre());
        dto.setCif(empresa.getCif());
        dto.setDireccion(empresa.getDireccion());
        dto.setTelefono(empresa.getTelefono());
        dto.setEmail(empresa.getEmail());
        return dto;
    }

    public static Empresa toEntity(EmpresaDTO dto) {
        if (dto == null) return null;

        Empresa empresa = new Empresa();
        empresa.setId_empresa(dto.getIdEmpresa());
        empresa.setNombre(dto.getNombre());
        empresa.setCif(dto.getCif());
        empresa.setDireccion(dto.getDireccion());
        empresa.setTelefono(dto.getTelefono());
        empresa.setEmail(dto.getEmail());
        return empresa;
    }
}
