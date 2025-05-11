package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Fichaje;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.FichajeRepository;
import coredev.sistema_fichajes.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FichajeServiceImp implements FichajeService {

    private final FichajeRepository fichajeRepository;

    private final UsuarioRepository usuarioRepository;

    public FichajeServiceImp(FichajeRepository fichajeRepository, UsuarioRepository usuarioRepository) {
        this.fichajeRepository = fichajeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Fichaje iniciarFichaje(int usuarioId) {
        if (tieneFichajeEnCurso(usuarioId)) {
            throw new RuntimeException("Ya hay un fichaje en progreso para este usuario.");
        }
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
        Fichaje fichaje = new Fichaje();
        fichaje.setUsuario(usuario);
        fichaje.setFecha(LocalDate.now());
        fichaje.setHora_entrada(LocalDateTime.now());
        fichaje.setEstado(Fichaje.EstadoFichaje.EN_PROGRESO);
        return fichajeRepository.save(fichaje);
    }

    @Override
    public Fichaje finalizarFichaje(int usuarioId) {
        Fichaje fichaje = fichajeRepository
            .findPrimerFichajeEnCurso(usuarioId, Fichaje.EstadoFichaje.EN_PROGRESO)
            .orElseThrow(() -> new RuntimeException("No hay fichaje en progreso para finalizar"));

        fichaje.setHora_salida(LocalDateTime.now());
        fichaje.setEstado(Fichaje.EstadoFichaje.FINALIZADO);

        return fichajeRepository.save(fichaje);
    }

    @Override
    public List<Fichaje> obtenerFichajesPorUsuario(int usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return fichajeRepository.findByUsuario(usuario);
    }


    @Override
    public List<Fichaje> obtenerTodosFichajes() {
        return fichajeRepository.findAll();
    }

    @Override
    public boolean tieneFichajeEnCurso(int usuarioId) {
        return fichajeRepository.existsFichajeEnCurso(usuarioId, Fichaje.EstadoFichaje.EN_PROGRESO);
    }

    @Override
    public List<Fichaje> obtenerFichajesPorEmpresa(int idEmpresa) {
        return fichajeRepository.findByEmpresaId(idEmpresa);
    }
}
