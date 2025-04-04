package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.ConfigAutenticacion;
import coredev.sistema_fichajes.repository.ConfigAutenticacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfigAutenticacionServiceImp implements ConfigAutenticacionService {

    @Autowired
    private ConfigAutenticacionRepository repository;

    @Override
    public ConfigAutenticacion agregarConfig(ConfigAutenticacion config) {
        return repository.save(config);
    }

    @Override
    public List<ConfigAutenticacion> getAllConfigs() {
        return repository.findAll();
    }

    @Override
    public ConfigAutenticacion actualizarConfig(ConfigAutenticacion config) {
        return repository.save(config);
    }

    @Override
    public void eliminarConfig(int id) {
        repository.deleteById(id);
    }
}
