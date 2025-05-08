package coredev.sistema_fichajes.service;

import coredev.sistema_fichajes.model.Empresa;
import coredev.sistema_fichajes.repository.EmpresaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EmpresaServiceImp implements EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Override
    @Transactional
    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }

    @Override
    public Empresa actualizarEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @Override
    public void eliminarEmpresa(int id) {
        empresaRepository.deleteById(id);
    }

    @Override
    public Empresa getEmpresaById(int id) {
        return empresaRepository.findById(id).orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
    }

    @Override
    public Empresa agregarEmpresa(Empresa empresa) {
        if (empresaRepository.existsByCif(empresa.getCif())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "EMPRESAS_CIF_UNIQUE");
        }
        if (empresaRepository.existsByNombreIgnoreCase(empresa.getNombre())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "EMPRESAS_NOMBRE_UNIQUE");
        }
        return empresaRepository.save(empresa);
    }

    @Override
    public List<Empresa> buscarPorNombre(String nombre) {
        return empresaRepository.findByNombreContainingIgnoreCase(nombre);
    }

}
