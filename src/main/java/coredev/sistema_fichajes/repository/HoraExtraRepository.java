package coredev.sistema_fichajes.repository;


import coredev.sistema_fichajes.model.HoraExtra;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HoraExtraRepository extends JpaRepository<HoraExtra, Integer> {
    List<HoraExtra> findByEstado(HoraExtra.EstadoHoraExtra estado);
}
