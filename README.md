# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
--UNIVERSIDAD DE GUAYAQUIL---
FACULTAD DE CIENCIAS MATEMATICAS Y FÍSICAS
CARRERA DE SOFTWARE
Miercoles,29 de Enero de 2025.
CONSTRUCCION DE SOFTWARE-ZAMBRANO VALVERDE LUIS ABRAHAM
NO-6-7
ING. JOHANNA ZUMBA GAMBOA

Arquitectura
El sistema sigue una arquitectura basada en el patrón MVC, que separa la lógica de negocio, la presentación y el control de flujo en tres componentes principales:

Modelo (Model):

Representa la capa de datos y lógica de negocio.

Se encarga de interactuar con la base de datos (consultas, inserciones, actualizaciones, eliminaciones).

Ejemplo: Clases que representan entidades como Usuario, Producto, etc.

Vista (View):

Es la interfaz de usuario (UI) que muestra los datos al usuario.

No contiene lógica de negocio, solo se encarga de presentar la información.

Ejemplo: Páginas HTML con formularios, tablas, etc.

Controlador (Controller):

Actúa como intermediario entre el Modelo y la Vista.

Recibe las solicitudes del usuario, procesa la lógica y decide qué vista mostrar.

Ejemplo: Maneja las acciones como "crear", "editar", "eliminar" y "listar".

Componentes
Base de datos: Almacena la información del sistema (por ejemplo, MySQL, PostgreSQL, SQLite).

Backend: Lógica del servidor que maneja las solicitudes HTTP y ejecuta las operaciones CRUD.

Frontend: Interfaz de usuario construida con HTML, CSS y JavaScript.

Servidor web: Encargado de servir la aplicación (por ejemplo, Apache, Nginx).

Diagrama 

+-------------------+       +-------------------+       +-------------------+
|      Vista        | <---> |   Controlador     | <---> |      Modelo       |
| (Interfaz de UI)  |       | (Maneja solicitudes)|       | (Lógica de datos) |
+-------------------+       +-------------------+       +-------------------+
        ↑                           ↑                           ↑
        |                           |                           |
        |                           |                           |
+-------------------+       +-------------------+       +-------------------+
|   Navegador Web   |       |   Servidor Web    |       |   Base de Datos   |
+-------------------+       +-------------------+       +-------------------+
Requisitos del Sistema
Requisitos Funcionales
Crear (Create):

Permitir al usuario agregar nuevos registros a la base de datos (por ejemplo, agregar un nuevo producto).

Leer (Read):

Mostrar una lista de registros existentes (por ejemplo, listar todos los productos).
Requisitos Técnicos
Lenguaje de programación: JavaScript,TypeScript etc.

Base de datos: SQLSERVER, O MYSQL etc.

Servidor web: Apache, Nginx, etc.

Framework (opcional): ANGULAR(Typescript)
