package coredev.sistema_fichajes.repository;

import coredev.sistema_fichajes.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    List<Rol> findByNombreContainingIgnoreCase(String nombre);
    Optional<Rol> findByNombre(String nombre);
}
