# Sistema de Registro Mural

Plataforma técnica para el intercambio de mensajes persistentes, desarrollada bajo estándares de Clean Architecture y servicios distribuidos en la nube.

## Requisitos del Sistema

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

## Reglas de Seguridad Requeridas

Para el correcto funcionamiento de la aplicación bajo los términos de acceso público definidos, se deben aplicar las siguientes reglas en la consola de Firebase Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regla 1: Permiso de lectura global para todos los usuarios
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.autorUid;
    }
    
    // Regla 2: Seguridad de perfiles de usuario
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
