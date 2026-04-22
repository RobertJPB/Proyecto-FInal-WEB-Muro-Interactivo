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
<img width="1895" height="878" alt="image" src="https://github.com/user-attachments/assets/d6c9f56f-d5e1-4c39-aa8e-21952079eca7" />
<img width="1627" height="872" alt="image" src="https://github.com/user-attachments/assets/a85b0e1f-ee5c-4f75-a238-c39f3b424916" />
<img width="786" height="1600" alt="61aecf06-cecc-40c1-844d-c1eee8f0bdd6" src="https://github.com/user-attachments/assets/ed2edcab-0715-4e96-977c-eec4f6df76e2" />


# Requisitos Funcionales del Sistema

El desarrollo se rige por las siguientes especificaciones funcionales obligatorias:

1. Acceso Público: Los usuarios no autenticados tienen permisos de lectura sobre todas las publicaciones registradas en el sistema de manera global.
2. Registro de Usuarios: El sistema permite la creación de perfiles almacenando de forma segura: usuario, clave, nombre y apellido.
3. Autenticación: Gestión de sesiones para validación de identidad.
4. Publicación Restringida: La creación de nuevas entradas en el muro está reservada exclusivamente para usuarios autenticados.

# Especificaciones Técnicas

La arquitectura del proyecto está segmentada en capas para garantizar la independencia de la lógica de negocio frente a agentes externos:

- Capa de Dominio: Contiene las entidades y las interfaces que definen el contrato del sistema.
- Capa de Aplicación: Implementa los casos de uso (gestión de cuentas y publicaciones).
- Capa de Infraestructura: Provee la persistencia mediante Firebase Firestore y la seguridad mediante Firebase Authentication.
- Capa de Presentación: Interfaz reactiva desarrollada con React, optimizada para la legibilidad técnica y funcional.

# Reglas de Negocio
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/dc97a44d-a733-48c6-ae7d-947cc1662c00" />

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función para verificar si el usuario tiene el rol de Administrador en su perfil
    function esAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }

    // 1. REGLAS PARA LA COLECCIÓN DE USUARIOS
   
    match /users/{userId} {

      // Cualquier persona puede ver los perfiles.
      allow read: if true;
      
      // PERMITIR CREAR, EDITAR Y BORRAR: Solo si el usuario inició sesión 
      // y su ID coincide exactamente con el ID del documento que intenta alterar.
      // SEGURIDAD EXTRA: Evita que un usuario modifique su perfil para hacerse Administrador a la fuerza.
      allow create, update: if request.auth != null 
                            && request.auth.uid == userId
                            && (!request.resource.data.keys().hasAny(['isAdmin']) || request.resource.data.isAdmin == false || esAdmin());
                            
      allow delete: if request.auth != null && request.auth.uid == userId;
    }


    // 2. REGLAS PARA LA COLECCIÓN DE PUBLICACIONES

    match /posts/{postId} {
      // Todos pueden ver los posts del muro.
      allow read: if true;
      
      // PERMITIR CREAR: Solo personas que hayan iniciado sesión.
      // VALIDACIÓN AÑADIDA: El texto no puede estar vacío ni superar los 500 caracteres.
      allow create: if request.auth != null 
                    && request.resource.data.contenido.size() > 0 
                    && request.resource.data.contenido.size() <= 500;
      
      // PERMITIR EDITAR (UPDATE): Esta regla permite guardar los "Me gusta":
      // A) Si eres el autor original (Firebase requiere este permiso interno cuando tú mismo le das like a tu propio post).
      // B) Si eres otra persona, Firebase solo te dejará pasar si *ÚNICAMENTE* intentas añadir/quitar tu ID del array de "likes".
      allow update: if request.auth != null && (
        request.auth.uid == resource.data.autorUid || 
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes'])
      );
      
      // PERMITIR BORRAR: Solo se permite si quien intenta borrar es el autor del post O un Administrador.
      allow delete: if request.auth != null && (request.auth.uid == resource.data.autorUid || esAdmin());
      

      // 3. REGLAS PARA LOS COMENTARIOS 

      match /comments/{commentId} {
        // PERMITIR LEER: Todos pueden ver los comentarios dentro de un post.
        allow read: if true;
        
        // PERMITIR CREAR: Solo personas con sesión iniciada.
        // VALIDACIÓN AÑADIDA: El comentario no puede estar vacío.
        allow create: if request.auth != null && request.resource.data.contenido.size() > 0;
        
        // PERMITIR EDITAR (UPDATE): Misma lógica de los "Me gusta" usada arriba.
        // O eres el autor, o solo estás tocando el array de likes y nada más.
        allow update: if request.auth != null && (
          request.auth.uid == resource.data.autorUid || 
          request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes'])
        );
        
        // PERMITIR BORRAR: Solo el creador original del comentario O un Administrador puede eliminarlo.
        allow delete: if request.auth != null && (request.auth.uid == resource.data.autorUid || esAdmin());
      }
    }
  }
}




