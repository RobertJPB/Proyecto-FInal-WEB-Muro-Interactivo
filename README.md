# Muro Interactivo

Plataforma dedicada al intercambio de mensajes persistentes, desarrollada bajo estándares de Clean Architecture, Principios SOLID y el uso de las tecnologias Javascript
(ES6), el framework React y los servicios en nube de Firebase para el Backend.

Url de la Web: https://muro-interactivo-86500.web.app/

Capturas de pantalla del Sistema funcionando en la Web, tanto en Computadores como en Moviles:

<img width="1892" height="859" alt="image" src="https://github.com/user-attachments/assets/6123b095-13d6-4835-8ab7-2f10d7ddc634" />
<img width="1890" height="875" alt="image" src="https://github.com/user-attachments/assets/58480375-58e9-4c59-9e89-6b4ad95d91cc" />
<img width="1592" height="861" alt="image" src="https://github.com/user-attachments/assets/bb990228-e7f5-4820-af21-68d3c7310db2" />
<img width="1895" height="865" alt="image" src="https://github.com/user-attachments/assets/82413b8a-9936-45e8-8307-cb7ac0e93cd2" />
<img width="1019" height="708" alt="image" src="https://github.com/user-attachments/assets/478f22ff-5457-4393-b987-bbd07069153e" />
<img width="786" height="1600" alt="image" src="https://github.com/user-attachments/assets/8726febb-e0ad-4090-8daf-9d2f8faca0f5" />

## Requisitos Funcionales del Sistema

El desarrollo se rige por las siguientes especificaciones funcionales obligatorias:

1. Acceso Público: Los usuarios no autenticados tienen permisos de lectura sobre todas las publicaciones registradas en el sistema de manera global.
2. Registro de Usuarios: El sistema permite la creación de perfiles almacenando de forma segura: usuario, clave, nombre y apellido.
3. Autenticación: Gestión de sesiones para validación de identidad.
4. Publicación Restringida: La creación de nuevas entradas en el muro está reservada exclusivamente para usuarios autenticados.

## Especificaciones Técnicas

La arquitectura del proyecto está segmentada en capas para garantizar la independencia de la lógica de negocio frente a agentes externos:

- Capa de Dominio: Contiene las entidades y las interfaces que definen el contrato del sistema.
- Capa de Aplicación: Implementa los casos de uso (gestión de cuentas y publicaciones).
- Capa de Infraestructura: Provee la persistencia mediante Firebase Firestore y la seguridad mediante Firebase Authentication.
- Capa de Presentación: Interfaz reactiva desarrollada con React, optimizada para la legibilidad técnica y funcional.

