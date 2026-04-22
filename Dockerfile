# Usamos una imagen ligera de Node.js
FROM node:18-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código del proyecto
COPY . .

# Exponemos el puerto que usa React (3000 por defecto)
EXPOSE 3000

# Variable de entorno para que React detecte cambios de archivos en Windows/Docker
ENV CHOKIDAR_USEPOLLING=true

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "start"]
