package coredev.sistema_fichajes.repository;

import coredev.sistema_fichajes.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    List<Usuario> findByActivoTrue();
    Optional<Usuario> findByEmail(String email);
    @Query("SELECT u FROM Usuario u WHERE u.empresa.id_empresa = ?1")
    List<Usuario> findUsuariosByEmpresaId(int id_empresa);
}
