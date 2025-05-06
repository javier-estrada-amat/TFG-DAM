package coredev.sistema_fichajes.service;
import coredev.sistema_fichajes.dto.HoraExtraDTO;
import coredev.sistema_fichajes.dto.ResolucionHoraExtraDTO;
import coredev.sistema_fichajes.exception.RecursoNoEncontradoException;
import coredev.sistema_fichajes.exception.UsuarioNoAutorizadoException;
import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.HoraExtraRepository;
import coredev.sistema_fichajes.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoraExtraServiceImp implements HoraExtraService {

    private final HoraExtraRepository horaExtraRepository;
    private final UsuarioRepository usuarioRepository;

    public HoraExtraServiceImp(HoraExtraRepository horaExtraRepository, UsuarioRepository usuarioRepository) {
        this.horaExtraRepository = horaExtraRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public HoraExtra solicitarHoraExtra(int idUsuario, HoraExtraDTO dto) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        HoraExtra horaExtra = new HoraExtra();
        horaExtra.setUsuario(usuario);
        horaExtra.setFecha(dto.getFecha());
        horaExtra.setHorasSolicitadas(dto.getHorasSolicitadas());
        horaExtra.setMotivo(dto.getMotivo());
        horaExtra.setEstado(HoraExtra.EstadoHoraExtra.PENDIENTE);
        return horaExtraRepository.save(horaExtra);
    }

    @Override
    public HoraExtra resolverHoraExtra(int idHoraExtra, ResolucionHoraExtraDTO dto, int idDireccion) {
        HoraExtra horaExtra = horaExtraRepository.findById(idHoraExtra)
            .orElseThrow(() -> new RuntimeException("Hora extra no encontrada"));

        if (dto.getEstado() != HoraExtra.EstadoHoraExtra.APROBADA &&
            dto.getEstado() != HoraExtra.EstadoHoraExtra.RECHAZADA) {
            throw new IllegalArgumentException("Estado inválido. Debe ser APROBADA o RECHAZADA.");
        }

        Usuario aprobador = usuarioRepository.findById(idDireccion)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario que aprueba no encontrado"));

        int empresaSolicitante = horaExtra.getUsuario().getEmpresa().getId_empresa();
        int empresaAprobador = aprobador.getEmpresa().getId_empresa();

        boolean esAdminODireccion = aprobador.getRoles().stream()
            .anyMatch(rol -> rol.getNombre().equalsIgnoreCase("ADMIN") || rol.getNombre().equalsIgnoreCase("DIRECCION"));

        if (empresaSolicitante != empresaAprobador) {
            throw new UsuarioNoAutorizadoException("No puedes aprobar solicitudes de otra empresa.");
        }
        if (!esAdminODireccion) {
            throw new UsuarioNoAutorizadoException("Solo usuarios con rol ADMIN o DIRECCION pueden aprobar horas extra.");
        }

        horaExtra.setHorasAprobadas(dto.getHorasAprobadas());
        horaExtra.setEstado(dto.getEstado());
        horaExtra.setAprobadoPor(aprobador);

        return horaExtraRepository.save(horaExtra);
    }

    @Override
    public List<HoraExtra> buscarPorUsuario(int idUsuario) {
        return horaExtraRepository.findByUsuarioId(idUsuario);
    }

    @Override
    public List<HoraExtra> getAllHorasExtras() {
        return horaExtraRepository.findAll();
    }

    @Override
    public List<HoraExtra> buscarPorEstado(HoraExtra.EstadoHoraExtra estado) {
        return horaExtraRepository.findByEstado(estado);
    }

    @Override
    public List<HoraExtra> buscarPorEmpresa(int idEmpresa) {
        return horaExtraRepository.findByEmpresaId(idEmpresa);
    }

    @Override
    public List<HoraExtra> buscarPorEmpresaYEstado(int idEmpresa, HoraExtra.EstadoHoraExtra estado) {
        return horaExtraRepository.findByEmpresaIdAndEstado(idEmpresa, estado);
    }

}
