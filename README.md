# SistemaFichajes


# Desarrollo
Cuando se inicia la aplicación, se ejecuta automáticamente docker compose up y la app se conecta a los servicios definidos en Docker. Docker debe estar disponible en el sistema.

Durante el desarrollo, se recomienda usar el perfil local.
En IntelliJ puedes añadir -Dspring.profiles.active=local en las opciones de la máquina virtual (VM options) dentro de la configuración de ejecución ("Run Configuration") tras habilitar esta opción en "Modify options".

Lombok debe estar soportado por tu IDE.
En IntelliJ, instala el plugin de Lombok y activa el procesamiento de anotaciones (annotation processing).

Frontend (Angular)
Además de la aplicación Spring Boot, también se debe iniciar el servidor de desarrollo del frontend.
Para esto, se requiere Node.js versión 22.

Instala Angular CLI y las dependencias necesarias (esto solo una vez):
```
npm install -g @angular/cli
npm install
```

Luego, puedes iniciar el servidor de desarrollo con:

```
ng serve
```

La aplicación ahora estará disponible desde http://localhost:4200


