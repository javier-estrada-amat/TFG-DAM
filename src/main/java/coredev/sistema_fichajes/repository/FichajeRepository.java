package coredev.sistema_fichajes.repository;

import coredev.sistema_fichajes.model.Fichaje;
import coredev.sistema_fichajes.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FichajeRepository extends JpaRepository<Fichaje, Integer> {
    List<Fichaje> findByUsuario(Usuario usuario);
    @Query("SELECT f FROM Fichaje f WHERE f.usuario.id_usuario = :usuarioId AND f.estado = :estado ORDER BY f.hora_entrada ASC")
    Optional<Fichaje> findPrimerFichajeEnCurso(@Param("usuarioId") int usuarioId, @Param("estado") Fichaje.EstadoFichaje estado);
    @Query("SELECT COUNT(f) > 0 FROM Fichaje f WHERE f.usuario.id_usuario = :usuarioId AND f.estado = :estado")
    boolean existsFichajeEnCurso(@Param("usuarioId") int usuarioId, @Param("estado") Fichaje.EstadoFichaje estado);
    @Query("SELECT f FROM Fichaje f WHERE f.usuario.empresa.id_empresa = :idEmpresa")
    List<Fichaje> findByEmpresaId(@Param("idEmpresa") int idEmpresa);
}
