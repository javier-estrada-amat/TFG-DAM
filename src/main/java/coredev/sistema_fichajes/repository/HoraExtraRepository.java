package coredev.sistema_fichajes.repository;


import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HoraExtraRepository extends JpaRepository<HoraExtra, Integer> {
    List<HoraExtra> findByEstado(HoraExtra.EstadoHoraExtra estado);

    @Query("SELECT h FROM HoraExtra h WHERE h.usuario.empresa.id_empresa = :idEmpresa")
    List<HoraExtra> findByEmpresaId(@Param("idEmpresa") int idEmpresa);

    @Query("SELECT h FROM HoraExtra h WHERE h.usuario.id_usuario = :idUsuario")
    List<HoraExtra> findByUsuarioId(@Param("idUsuario") int idUsuario);

    @Query("SELECT h FROM HoraExtra h WHERE h.usuario.empresa.id_empresa = :idEmpresa AND h.estado = :estado")
    List<HoraExtra> findByEmpresaIdAndEstado(@Param("idEmpresa") int idEmpresa, @Param("estado") HoraExtra.EstadoHoraExtra estado);

}
