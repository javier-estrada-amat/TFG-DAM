package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Empresa;

import java.util.List;

public interface EmpresaService {
    Empresa agregarEmpresa(Empresa empresa);
    List<Empresa> getAllEmpresas();
    Empresa actualizarEmpresa(Empresa empresa);
    void eliminarEmpresa(int id);
    List<Empresa> buscarPorNombre(String nombre);
}
