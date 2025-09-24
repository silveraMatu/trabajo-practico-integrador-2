## Trabajo Práctico Integrador 2 - Silvera Matías
#### Instrucciones de instalación y configuración
Una vez clonado el repositorio. ejecutar el siguiente comando dentro del directorio del proyceto:

```
npm i //esto le instalará todas las dependencias necesarias para poder ejecutar con normalidad el proyecto
```

A continuación, a la misma altura del archivo "server.js", crear un archivo ".env" para configurar las variables de entorno. El mismo debe seguir la misma estructura de ".env.example"

Dentro de .env:

```
PORT = Cualquier puerto libre de su ambiente local (ej. 3000)
MONGO_URI = mongodb://localhost:27017/nombreDeSuDB
JWT_SECRET = SuPalabraSecreta
SALT = valor de su preferencia. Recomiendo entre 10 o 12
```

#### Modelos y relaciones

Los modelos utilizados son:

##### `User (cuenta con profile embebido)`, `Article`, `Comment`, `Tag`

Relaciones:

| Modelos | Relación | Ventajas | Desventajas |
| :---         |     :---:      |:---          |:---|
| `User` y `Profile`  | Embebido     | Al estar embebido, se maximiza la velocidad de lectura y minimiza la cantidad de consultas a realizar. Es conveniente debido a que son datos que por lo general se traen juntos.|  Modelo de user ligeramente más grande, existe posibilidad de redundancia, y se pierde flexibilidad al querer manipular u actualizar los datos.  |
| `User` y `Article`     | 1:M    | Un usuario puede tener muchos articulos, pero estos, al no estar embebidos sino referenciados, no afectan el tamaño del documento padre. Lo cual si sucediera no sería viable en caso de que un usuario tenga muchos artículos. Además, facilita la actualización de datos por artículo sin la necesidad de traer todos los datos.     |  Se requiere más de una consulta para poder acceder a los artículos, lo cual relentiza la velocidad de lectura. Además, la consulta gana complejidad con la utilización de `populate`  |
| `User` y `Comment`     | 1:M       | Facilita la actualización de documentos y no altera el tamaño del documento padre| Se requiere más de una consulta para poder acceder a los comentarios, lo cual aumenta la complejidad de la query y la hace más lenta.  |
| `Article` y `Comment`     | No agrega tamaño       | ventaja      |  desventaja  |
| modelo     | relacion       | ventaja      |  desventaja  |
