package coredev.sistema_fichajes.repository;


import coredev.sistema_fichajes.model.HistorialCambioPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistorialCambioPasswordRepository extends JpaRepository<HistorialCambioPassword, Integer> {

    @Query("SELECT h FROM HistorialCambioPassword h WHERE h.usuario.id_usuario = :idUsuario ORDER BY h.fechaCambio DESC")
    List<HistorialCambioPassword> findByUsuarioId(@Param("idUsuario") int idUsuario);

    @Query("SELECT h FROM HistorialCambioPassword h WHERE h.usuario.empresa.id_empresa = :idEmpresa ORDER BY h.fechaCambio DESC")
    List<HistorialCambioPassword> findByEmpresaId(@Param("idEmpresa") int idEmpresa);
}
