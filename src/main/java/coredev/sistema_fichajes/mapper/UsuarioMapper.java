package coredev.sistema_fichajes.mapper;

import coredev.sistema_fichajes.dto.UsuarioDTO;
import coredev.sistema_fichajes.model.Rol;
import coredev.sistema_fichajes.model.Usuario;

import java.util.List;

public class UsuarioMapper {

    public static UsuarioDTO toDTO(Usuario usuario) {
        if (usuario == null) return null;

        UsuarioDTO dto = new UsuarioDTO();
        dto.setId_usuario(usuario.getId_usuario());
        dto.setNombre(usuario.getNombre());
        dto.setApellidos(usuario.getApellidos());
        dto.setEmail(usuario.getEmail());
        dto.setPassword(usuario.getPassword());
        dto.setEmpresa(EmpresaMapper.toDTO(usuario.getEmpresa()));
        dto.setActivo(usuario.isActivo());
        dto.setPrimerAcceso(usuario.isPrimerAcceso());
        dto.setFecha_registro(usuario.getFecha_registro());
        if (usuario.getRoles() != null) {
            List<Integer> idsRoles = usuario.getRoles().stream()
                .map(Rol::getId_rol)
                .toList();
            dto.setRoles(idsRoles);
        }
        return dto;
    }

    public static Usuario toEntity(UsuarioDTO dto) {
        if (dto == null) return null;

        Usuario usuario = new Usuario();
        usuario.setId_usuario(dto.getId_usuario());
        usuario.setNombre(dto.getNombre());
        usuario.setApellidos(dto.getApellidos());
        usuario.setEmail(dto.getEmail());
        usuario.setPassword(dto.getPassword());
        usuario.setEmpresa(EmpresaMapper.toEntity(dto.getEmpresa()));
        usuario.setActivo(dto.isActivo());
        usuario.setPrimerAcceso(dto.isPrimerAcceso());
        usuario.setFecha_registro(dto.getFecha_registro());
        if (dto.getRoles() != null) {
            List<Rol> roles = dto.getRoles().stream()
                .map(id -> {
                    Rol r = new Rol();
                    r.setId_rol(id);
                    return r;
                })
                .toList();
            usuario.setRoles(roles);
        }
        return usuario;
    }
}
