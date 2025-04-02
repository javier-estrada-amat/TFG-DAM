package coredev.sistema_fichajes.repository;

import coredev.sistema_fichajes.model.Fichaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FichajeRepository extends JpaRepository<Fichaje, Integer> {
    List<Fichaje> findByEstado(Fichaje.EstadoFichaje estado);
}

