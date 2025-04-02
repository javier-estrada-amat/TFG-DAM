package coredev.sistema_fichajes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("coredev.sistema_fichajes.model")
@SpringBootApplication
public class SistemaFichajesApplication {

    public static void main(final String[] args) {
        SpringApplication.run(SistemaFichajesApplication.class, args);
    }

}
