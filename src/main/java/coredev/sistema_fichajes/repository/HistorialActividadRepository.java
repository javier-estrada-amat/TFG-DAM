package coredev.sistema_fichajes.repository;

import coredev.sistema_fichajes.model.HistorialActividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistorialActividadRepository extends JpaRepository<HistorialActividad, Integer> {

    @Query("SELECT h FROM HistorialActividad h WHERE h.usuario.id_usuario = :idUsuario")
    List<HistorialActividad> findByUsuarioId(@Param("idUsuario") int idUsuario);

    @Query("SELECT h FROM HistorialActividad h WHERE h.usuario.empresa.id_empresa = :idEmpresa")
    List<HistorialActividad> findByEmpresaId(@Param("idEmpresa") int idEmpresa);
}
