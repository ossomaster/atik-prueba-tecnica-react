# Gestión de Eventos por Empleado

Esta aplicación web permite la creación, edición y eliminación de eventos organizados por horarios para cada empleado. Los eventos pueden moverse entre casillas mediante la funcionalidad de arrastrar y soltar (drag-and-drop).

## Tecnologías Utilizadas

-   **Vite**: Herramienta de construcción rápida para aplicaciones web modernas.
-   **React**: Biblioteca para construir interfaces de usuario.
-   **TypeScript**: Superset de JavaScript que añade tipado estático.
-   **TailwindCSS**: Framework de CSS para diseño rápido y personalizable.
-   **React dnd kit**: Librería de arrastrar y soltar para React.
-   **Shadcn-ui**: Componentes de interfaz de usuario para React.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

-   [Node.js](https://nodejs.org/) (versión 18.20 o superior)
-   [npm](https://www.npmjs.com/)

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1. Clona este repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

4. Abre tu navegador y accede a la URL proporcionada (por defecto: `http://localhost:5173`).

## Scripts Disponibles

-   `npm run dev` / `yarn dev`: Inicia el servidor de desarrollo.

## Características

-   **Gestión de eventos**: Crea, edita y elimina eventos fácilmente.
-   **Interfaz intuitiva**: Arrastra y suelta eventos entre horarios y empleados.

## Algunas mejoras futuras
- Manejo de estado global con Zustand o equivalentes
- Implementación de tests unitarios y de integración
- Modo responsivo para dispositivos móviles
- Manejo de validaciones en formularios