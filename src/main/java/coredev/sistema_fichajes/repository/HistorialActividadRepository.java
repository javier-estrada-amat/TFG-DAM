package coredev.sistema_fichajes.repository;

import coredev.sistema_fichajes.model.HistorialActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistorialActividadRepository extends JpaRepository<HistorialActividad, Integer> {
}
