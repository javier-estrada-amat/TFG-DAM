package coredev.sistema_fichajes.config;

import coredev.sistema_fichajes.model.Empresa;
import coredev.sistema_fichajes.model.Rol;
import coredev.sistema_fichajes.model.Usuario;
import coredev.sistema_fichajes.repository.EmpresaRepository;
import coredev.sistema_fichajes.repository.RolRepository;
import coredev.sistema_fichajes.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@Configuration
public class UsuarioDefaultConfig {

    @Bean
    public CommandLineRunner crearUsuarioYRolesPorDefecto(
        UsuarioRepository usuarioRepository,
        RolRepository rolRepository,
        EmpresaRepository empresaRepository,
        PasswordEncoder passwordEncoder) {

        return args -> {
            // Crear o recuperar empresa por defecto
            Empresa empresa = empresaRepository.findByNombre("Empresa SistemaFichajes")
                .orElseGet(() -> {
                    Empresa nuevaEmpresa = new Empresa();
                    nuevaEmpresa.setNombre("Empresa SistemaFichajes");
                    nuevaEmpresa.setCif("A00000000");
                    return empresaRepository.save(nuevaEmpresa);
                });

            // Crear roles si no existen
            Rol rolAdmin = obtenerOCrearRol("ADMIN", rolRepository);
            obtenerOCrearRol("DIRECCION", rolRepository);
            obtenerOCrearRol("EMPLEADO", rolRepository);

            // Crear usuario admin si no existen usuarios
            if (usuarioRepository.count() == 0) {
                Usuario admin = new Usuario();
                admin.setNombre("Admin");
                admin.setApellidos("Sistema");
                admin.setEmail("admin@empresa.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setActivo(true);
                admin.setPrimerAcceso(true);
                admin.setEmpresa(empresa);
                admin.setRoles(Collections.singletonList(rolAdmin));

                usuarioRepository.save(admin);

                System.out.println("Usuario admin creado con éxito: admin@empresa.com / admin123");
            }
        };
    }

    private Rol obtenerOCrearRol(String nombre, RolRepository rolRepository) {
        return rolRepository.findByNombre(nombre)
            .orElseGet(() -> rolRepository.save(new Rol(nombre)));
    }
}
