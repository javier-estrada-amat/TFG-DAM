package coredev.sistema_fichajes.service;
import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.repository.HoraExtraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoraExtraServiceImp implements HoraExtraService {

    @Autowired
    private HoraExtraRepository horaExtraRepository;

    @Override
    public HoraExtra agregarHoraExtra(HoraExtra horaExtra) {
        return horaExtraRepository.save(horaExtra);
    }

    @Override
    public List<HoraExtra> getAllHorasExtras() {
        return horaExtraRepository.findAll();
    }

    @Override
    public HoraExtra actualizarHoraExtra(HoraExtra horaExtra) {
        return horaExtraRepository.save(horaExtra);
    }

    @Override
    public void eliminarHoraExtra(int id) {
        horaExtraRepository.deleteById(id);
    }

    @Override
    public List<HoraExtra> buscarPorEstado(HoraExtra.EstadoHoraExtra estado) {
        return horaExtraRepository.findByEstado(estado);
    }
}
