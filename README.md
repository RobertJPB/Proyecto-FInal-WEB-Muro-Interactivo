# 🧱 Muro Interactivo

Aplicación web desarrollada con **React (ES6)** y **Firebase** como backend, aplicando **Clean Architecture**.

---

## 🏗️ Arquitectura — Clean Architecture

```
src/
├── domain/                          ← Capa de Dominio (núcleo puro)
│   ├── entities/
│   │   ├── User.js                  ← Entidad Usuario
│   │   └── Post.js                  ← Entidad Post
│   ├── repositories/
│   │   ├── IUserRepository.js       ← Interfaz repositorio de usuarios
│   │   └── IPostRepository.js       ← Interfaz repositorio de posts
│   └── usecases/
│       ├── AuthUseCases.js          ← RegisterUser, LoginUser, Logout
│       └── PostUseCases.js          ← CreatePost, GetAll, ToggleLike, Delete
│
├── infrastructure/                  ← Capa de Infraestructura (Firebase)
│   ├── firebase/
│   │   └── firebaseConfig.js        ← Configuración Firebase
│   └── repositories/
│       ├── FirebaseUserRepository.js
│       └── FirebasePostRepository.js
│
├── application/                     ← Capa de Aplicación
│   ├── services/
│   │   └── ServiceContainer.js      ← Inyección de dependencias
│   └── hooks/
│       ├── useAuthActions.js        ← Hook de autenticación
│       └── usePosts.js              ← Hook de publicaciones
│
└── presentation/                    ← Capa de Presentación (React UI)
    ├── context/
    │   └── AuthContext.js           ← Estado global de autenticación
    ├── components/
    │   ├── layout/Navbar.jsx
    │   ├── posts/PostCard.jsx
    │   └── posts/CreatePost.jsx
    └── pages/
        ├── HomePage.jsx
        ├── LoginPage.jsx
        └── RegisterPage.jsx
```

### Principios aplicados
- **Separación de responsabilidades**: cada capa tiene un rol claro
- **Inversión de dependencias**: el dominio define interfaces; la infraestructura las implementa
- **Casos de uso**: la lógica de negocio vive en `domain/usecases`, no en los componentes
- **Independencia del framework**: si se cambia Firebase por otra BD, solo cambia `infrastructure/`

---

## ✅ Funcionalidades

| Feature | Descripción |
|---|---|
| 📋 Ver publicaciones | Cualquier visitante (sin login) ve todos los posts en tiempo real |
| 👤 Registro | username, nombre, apellido, email, contraseña |
| 🔐 Login / Logout | Firebase Authentication (Email/Password) |
| ✍️ Publicar | Solo usuarios autenticados pueden crear posts |
| ❤️ Likes | Toggle like/unlike (requiere autenticación) |
| 🗑️ Eliminar | Solo el autor puede borrar su publicación |
| 🔴 Tiempo real | Posts se actualizan automáticamente con Firestore `onSnapshot` |

---

## 🚀 Configuración e instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un nuevo proyecto
3. Activa **Authentication → Email/Password**
4. Crea una base de datos **Firestore** (modo producción)
5. En Configuración del proyecto → Tus apps → Web → copia el `firebaseConfig`

### 3. Variables de entorno

Crea un archivo `.env` en la raíz:

```env
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

### 4. Reglas de Firestore

En Firebase Console → Firestore → Reglas:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth.uid == resource.data.autorUid;
    }
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

### 5. Ejecutar en desarrollo

```bash
npm start
```

### 6. Build para producción

```bash
npm run build
```

---

## 🗄️ Estructura de datos en Firestore

### Colección `users`
```json
{
  "uid": "firebase_uid",
  "username": "juanperez",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@email.com",
  "createdAt": "timestamp"
}
```

### Colección `posts`
```json
{
  "id": "post_id",
  "contenido": "Texto del post...",
  "autorUid": "firebase_uid",
  "autorUsername": "juanperez",
  "autorNombre": "Juan",
  "autorApellido": "Pérez",
  "createdAt": "timestamp",
  "likes": ["uid1", "uid2"]
}
```

---

## 🔧 Tecnologías utilizadas

- **React 18** con hooks
- **Firebase 10** (Authentication + Firestore)
- **React Router DOM v6**
- **react-hot-toast** para notificaciones
- **date-fns** para formateo de fechas
- **ES6+** (arrow functions, destructuring, async/await, módulos)
