package coredev.sistema_fichajes.repository;


import coredev.sistema_fichajes.model.HoraExtra;
import coredev.sistema_fichajes.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HoraExtraRepository extends JpaRepository<HoraExtra, Integer> {
    List<HoraExtra> findByEstado(HoraExtra.EstadoHoraExtra estado);

    @Query("SELECT h FROM HoraExtra h WHERE h.usuario.id_usuario = :idUsuario")
    List<HoraExtra> findByUsuarioId(@Param("idUsuario") int idUsuario);

}
