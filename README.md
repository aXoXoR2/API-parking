# API-parking
 express+mysql+mongoDB

Instalar las dependencias necesarias. Luego crear un archivo .env donde se definan las variables PORT( puerto donde escuchará el servidor de la aplicación), MYSQL_HOST (host de la base de datos mysql), MYSQL_USER (usuario de la base de datos mysql), MYSQL_PASSWORD (contraseña de la base de datos mysql), MYSQL_DB (nombre que tiene la base de datos mysql), DATABASE (aqui se pone el nombre del parametro dialect para establecer la conexion, en este caso: mysql), PRIVATEKEY (clave secreta para ecriptar contraseñas) y MONGODB_HOST (ubicación del servidor de la base de datos de mongDB). 
Fueron creados los modelos para usuarios, para los aparcamientos y para las reservaciones en la base de datos mysql. En mongoDB fue creado el modelo para llevar el registro de operaciones sobre las reservaciones.
Luego para usar la API basta ejecutar el comando npm run dev y hacer una petición de tipo POST http://localhost:PORT/api/authentication teniendo en el body {  "email":"andryrosquet@gmail.com", "password":"abc123"}. Con el token que devuelva dicha petición será posible realizar cualquier petición enviandolo en la sección headers con la cabecera token.