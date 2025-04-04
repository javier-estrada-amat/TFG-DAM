package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.UsuarioDTO;
import coredev.sistema_fichajes.model.Usuario;

public class UsuarioMapper {

    public static UsuarioDTO toDTO(Usuario usuario) {
        if (usuario == null) return null;

        UsuarioDTO dto = new UsuarioDTO();
        dto.setIdUsuario(usuario.getId_usuario());
        dto.setNombre(usuario.getNombre());
        dto.setApellidos(usuario.getApellidos());
        dto.setEmail(usuario.getEmail());
        dto.setPassword(usuario.getPassword());
        dto.setEmpresa(EmpresaMapper.toDTO(usuario.getEmpresa()));
        return dto;
    }

    public static Usuario toEntity(UsuarioDTO dto) {
        if (dto == null) return null;

        Usuario usuario = new Usuario();
        usuario.setId_usuario(dto.getIdUsuario());
        usuario.setNombre(dto.getNombre());
        usuario.setApellidos(dto.getApellidos());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword());
        usuario.setEmpresa(EmpresaMapper.toEntity(dto.getEmpresa()));
        return usuario;
    }
}
