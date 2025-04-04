package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.ConfigAutenticacion;

import java.util.List;

public interface ConfigAutenticacionService {
    ConfigAutenticacion agregarConfig(ConfigAutenticacion config);
    List<ConfigAutenticacion> getAllConfigs();
    ConfigAutenticacion actualizarConfig(ConfigAutenticacion config);
    void eliminarConfig(int id);
}
