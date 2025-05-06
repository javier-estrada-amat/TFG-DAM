package coredev.sistema_fichajes.repository;

import coredev.sistema_fichajes.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {
    List<Empresa> findByNombreContainingIgnoreCase(String nombre);
    boolean existsByCif(String cif);
    boolean existsByNombreIgnoreCase(String nombre);
}
