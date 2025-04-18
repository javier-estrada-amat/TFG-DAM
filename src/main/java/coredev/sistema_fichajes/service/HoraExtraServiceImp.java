package coredev.sistema_fichajes.service;
import coredev.sistema_fichajes.dto.HoraExtraDTO;
import coredev.sistema_fichajes.dto.ResolucionHoraExtraDTO;
import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.HoraExtraRepository;
import coredev.sistema_fichajes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

        if (dto.getEstado() != HoraExtra.EstadoHoraExtra.APROBADA && dto.getEstado() != HoraExtra.EstadoHoraExtra.RECHAZADA) {
            throw new RuntimeException("Estado inválido. Debe ser APROBADA o RECHAZADA.");
        }

        Usuario aprobador = usuarioRepository.findById(idDireccion)
            .orElseThrow(() -> new RuntimeException("Usuario que aprueba no encontrado"));

        horaExtra.setHorasAprobadas(dto.getHorasAprobadas());
        horaExtra.setEstado(dto.getEstado());
        horaExtra.setAprobadoPor(aprobador);

        return horaExtraRepository.save(horaExtra);
    }

    @Override
    public List<HoraExtra> obtenerPorUsuario(int idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return horaExtraRepository.findByUsuario(usuario);
    }

    @Override
    public List<HoraExtra> obtenerTodas() {
        return horaExtraRepository.findAll();
    }

    @Override
    public List<HoraExtra> getAllHorasExtras() {
        return horaExtraRepository.findAll();
    }

    @Override
    public List<HoraExtra> buscarPorEstado(HoraExtra.EstadoHoraExtra estado) {
        return horaExtraRepository.findByEstado(estado);
    }
}
