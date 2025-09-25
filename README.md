## Trabajo Práctico Integrador 2 - Silvera Matías
#### Instrucciones de instalación y configuración
Una vez clonado el repositorio. ejecutar el siguiente comando dentro del directorio del proyceto:

```
npm i
//esto le instalará todas las dependencias necesarias para poder ejecutar con normalidad el proyecto
```

A continuación, a la misma altura del archivo "server.js", crear un archivo ".env" para configurar las variables de entorno. El mismo debe seguir la misma estructura de ".env.example"

Dentro de .env:

```
#Archivo .env

PORT=3000                     #Puerto de la app (ej: 3000)
MONGO_URI=mongodb://localhost:27017/mi_base_de_datos   #Conexión a Mongodb
JWT_SECRET=MiPalabraSecreta   #Secreto para firmar JWT
SALT=12                       #Rondas de encriptación para bcrypt (10-12 recomendado)

```
Para poder correr el servidor y comenzar a realizar peticiones a la API:

```
npm run dev
```

#### Modelos y relaciones

Los modelos utilizados son:

##### `User (cuenta con profile embebido)`, `Article`, `Comment`, `Tag`

Relaciones:

| Modelos | Relación | Ventajas | Desventajas |
| :---         |     :---:      |:---          |:---|
| `User` y `Profile`  | Embebido     | Lecturas más rápidas al obtener todo junto en una sola consulta. Conveniente porque el perfil suele pedirse siempre junto al usuario. | El documento `User` crece en tamaño, puede haber redundancia y se pierde flexibilidad si se necesita actualizar solo el perfil. |
| `User` y `Article`  | 1:M    | Mantiene el documento `User` liviano, ya que los artículos están referenciados. Permite actualizar artículos sin traer al usuario completo. (Ej: editar solo un artículo de un autor). | Requiere consultas adicionales y uso de `populate`, lo que puede hacer la query más lenta o compleja. |
| `User` y `Comment`  | 1:M       | Los comentarios se pueden manejar de forma independiente y actualizar sin afectar al usuario. (Ej: borrar solo un comentario). | Para obtener comentarios de un usuario hay que hacer consultas extra, lo que agrega complejidad y puede afectar el rendimiento. |
| `Article` y `Comment`  | 1:M       | Permite vincular múltiples comentarios a un artículo sin agrandar el documento padre. Actualizar o eliminar un comentario no afecta al artículo. | Acceder a todos los comentarios de un artículo requiere queries adicionales y puede volverse costoso en artículos con muchos comentarios. |
| `Article` y `Tag`     | N:M       | Flexibilidad: un artículo puede tener varios tags y un tag puede pertenecer a muchos artículos. Facilita búsquedas como "dame todos los artículos con el tag X". | Se necesitan varias referencias, lo que complica las consultas y puede impactar en rendimiento si hay demasiados vínculos. |

### Endpoints

La mayoría de los endpoints siguien un estándar que los hace muy parecidos y facilita su uso en request. Todos comienzan con el prefijo `/api`. Los endpoints del proyecto son los siguientes:

##### Para los controladore de `Auth`

`POST | /api/auth/register` --> Crear un usuario

body de la request:
```json
{
    "username": "domadorDePatis2025",
    "email": "domadordepatis@gmail.com",
    "password": "Unicornio123",
    "role": "admin",
		"profile":{
          "firstName": "Matias",
          "lastName": "Silvera",
          "avatarUrl": "www.avatarMatias.com",
          "biography": "Me gusta el mango"
		}
}
```
response:

```json
{
	"ok": true,
	"msg": "Registro exitoso",
	"data": {
		"username": "domadorDePatis2025",
		"email": "domadordepatis@gmail.com",
		"role": "admin",
		"profile": {
			"firstName": "Matias",
			"lastName": "Silvera",
			"biography": "Me gusta el mango",
			"avatarUrl": "www.avatarMatias.com"
		},
		"deletedAt": null,
		"_id": "68d2c928fabdee614600015d",
		"createdAt": "2025-09-23T16:22:00.951Z",
		"updatedAt": "2025-09-23T16:22:00.951Z"
	}
}
```
`POST | /api/auth/login` --> Iniciar sesión

body de la request:
```json
{
    "username": "domadorDePatis2025",
    "password": "Unicornio123"
}
```
response:

```json
{
	"ok": true,
	"msg": "logueado exitosamente",
	"data": {
		"profile": {
			"firstName": "Matias",
			"lastName": "Silvera",
			"biography": "Me gusta el mango",
			"avatarUrl": "www.avatarMatias.com"
		},
		"_id": "68d4a5b2f8b2cb5b74fe1dec",
		"username": "domadorDePatis2025",
		"email": "domadordepatis@gmail.com",
		"role": "admin",
		"deletedAt": null,
		"createdAt": "2025-09-25T02:15:14.558Z",
		"updatedAt": "2025-09-25T02:15:14.558Z"
	}
}
```

*Ya logueado, podrás acceder al resto de endpoints que conforman la API.*

`GET | /api/auth/profile` --> Traer perfil del usuario autenticado

response:

```json
{
	"ok": true,
	"data": {
		"profile": {
			"firstName": "Matias",
			"lastName": "Silvera",
			"biography": "Me gusta el mango",
			"avatarUrl": "www.avatarMatias.com"
		},
		"id": null
	}
}
```

`PUT | /api/auth/profile` --> Actualizar el perfil del usuario autenticado

body de la request:

```json
{
  "biography": "Ya me dejo de gustar el mango." <-- Puede pasarse cualquier campo que conforma a profile, estos son: firstNane, lastName, avatarUrl, biography, birthDate
}
```

response:
```json
{
	"ok": true,
	"msg": "profile actualizado",
	"data": {
		"firstName": "Matias",
		"lastName": "Silvera",
		"biography": "Ya me dejo de gustar el mango.",
		"avatarUrl": "www.avatarMatias.com"
	}
}
```


`POST | /api/auth/logout` --> Cerrar sesión

*No requiere body*

response:
```json
{
	"ok": true,
	"msg": "has cerrado sesión"
}
```


##### Para los controladores de `User`

`GET | /api/users` → Traer todos los usuarios con sus artículos

response: 
```json
{
	"ok": true,
	"data": [
		{
			"_id": "68d534b35de0e4c7b8db9d27",
			"username": "domadorDePatis2025",
			"articles": [
				{
					"_id": "68d5357f5de0e4c7b8db9d33",
					"title": "Como hacer un buen readme en 5 pasos",
					"status": "published",
					"author": "68d534b35de0e4c7b8db9d27",
					"id": "68d5357f5de0e4c7b8db9d33"
				}
			],
			"id": "68d534b35de0e4c7b8db9d27"
		},
		{
			"_id": "68d534f15de0e4c7b8db9d2c",
			"username": "hOLA1234",
			"articles": [],
			"id": "68d534f15de0e4c7b8db9d2c"
		}
	]
}
```
`GET | /api/users/68d5373e6d971e266f967177` → Traer usuario específico con artículos y comentarios

response:
```json
{
	"ok": true,
	"data": {
		"_id": "68d5373e6d971e266f967177",
		"username": "domadorDePatis2025",
		"articles": [
			{
				"_id": "68d5357f5de0e4c7b8db9d33",
				"title": "Como hacer un buen readme en 5 pasos",
				"status": "published",
				"author": "68d534b35de0e4c7b8db9d27",
				"comments": [
					{
						"_id": "68d536075de0e4c7b8db9d3b",
						"content": "Buen post. Ahora qur ya lo vi borralo",
						"author": "68d534b35de0e4c7b8db9d27",
						"article": "68d5357f5de0e4c7b8db9d33"
					}
				],
				"id": "68d5357f5de0e4c7b8db9d33"
			}
		],
		"id": "68d534b35de0e4c7b8db9d27"
	}
}
```

`PUT | /api/users/68d5373e6d971e266f967177` → Actualizar usuario
En el body se puede pasar cualquier campo que pertenezca al modelo de usuario

body:

```json
{
    "username": "matusilvera808",
    "email": "domadordepatis2026@gmail.com",
    "password": "Incorrect4",
		"profile":{
    	"biography": "No me avisaron que hoy habia examen man actualizado"
		}
}
```

response:

```json
{
	"ok": true,
	"msg": "usuario actualizado",
	"data": {
		"profile": {
			"firstName": "Matias",
			"lastName": "Silvera",
			"biography": "No me avisaron que hoy habia examen man actualizado",
			"avatarUrl": "www.avatarMatias.com"
		},
		"_id": "68d5373e6d971e266f967177",
		"username": "matusilvera808",
		"email": "domadordepatis2026@gmail.com",
		"role": "admin",
		"deletedAt": null,
		"createdAt": "2025-09-25T12:36:14.359Z",
		"updatedAt": "2025-09-25T12:36:23.305Z"
	}
}
```
`DELETE | /api/users/68d5373e6d971e266f967177` → Eliminar usuario
response: Al ser 204 (no content), manda una respuesta vacía.

##### Para los controladores de `Tag`

`POST | /api/tags` → crear Tag
**Body:**
```json
{
  "name": "javascript"
}
```

response:
```json
{
	"ok": true,
	"msg": "tag creado",
	"data": {
		"name": "javascript",
		"_id": "68d4aa5df8b2cb5b74fe1df3",
		"createdAt": "2025-09-25T02:35:09.885Z",
		"updatedAt": "2025-09-25T02:35:09.885Z",
		"id": "68d4aa5df8b2cb5b74fe1df3"
	}
}
```
`GET | /api/tags/68d4acf7f8b2cb5b74fe1dfa` → traer etiqueta por id (el id usado es de ejemplo)

response:

```json
{
	"ok": true,
	"data": {
		"_id": "68d4acf7f8b2cb5b74fe1dfa",
		"name": "javascript",
		"createdAt": "2025-09-25T02:46:15.387Z",
		"updatedAt": "2025-09-25T02:46:15.387Z",
		"articles": [],
		"id": "68d4acf7f8b2cb5b74fe1dfa"
	}
}
```

`GET | /api/tags` → traer todas las tags

response:

```json
{
	"ok": true,
	"data": [
		{
			"_id": "68d4acf7f8b2cb5b74fe1dfa",
			"name": "javascript",
			"createdAt": "2025-09-25T02:46:15.387Z",
			"updatedAt": "2025-09-25T02:46:15.387Z",
			"id": "68d4acf7f8b2cb5b74fe1dfa"
		},
		{
			"_id": "68d4ad93f8b2cb5b74fe1e00",
			"name": "riBer",
			"createdAt": "2025-09-25T02:48:51.437Z",
			"updatedAt": "2025-09-25T02:48:51.437Z",
			"id": "68d4ad93f8b2cb5b74fe1e00"
		}
	]
}
```
`PUT | /api/tags/68d4acf7f8b2cb5b74fe1dfa` --> actualizar tag

body:

```json
{
	"name":"typeScript"
}
```

response:
```json
{
	"ok": true,
	"msg": "tag actualizado",
	"data": {
		"_id": "68d4acf7f8b2cb5b74fe1dfa",
		"name": "typeScript",
		"createdAt": "2025-09-25T02:46:15.387Z",
		"updatedAt": "2025-09-25T02:55:13.225Z",
		"id": "68d4acf7f8b2cb5b74fe1dfa"
	}
}
```
`DELETE | /api/tags/68d4acf7f8b2cb5b74fe1dfa` --> eliminar tag

response: Al ser 204 (no content), manda una respuesta vacía.

##### Para los controladores de `Article`

`POST | /api/articles` --> Crear artículo

body:
```json
{
	"title": "Como hacer un buen readme en 5 pasos",
	"content": "Para poder hacer un buen readme en solamente 5 pasos debes seguir las siguintes indicaciones. Estas son",
	"author": "68d5373e6d971e266f967177" <-- id del autor del articulo
}
```

response:
```json
{
	"ok": true,
	"msg": "articulo creado",
	"data": {
		"title": "Como hacer un buen readme en 5 pasos",
		"content": "Para poder hacer un buen readme en solamente 5 pasos debes seguir las siguintes indicaciones. Estas son",
		"status": "published",
		"author": "68d5373e6d971e266f967177",
		"tags": [],
		"_id": "68d5385d6d971e266f96717c",
		"createdAt": "2025-09-25T12:41:01.422Z",
		"updatedAt": "2025-09-25T12:41:01.422Z",
		"id": "68d5385d6d971e266f96717c"
	}
}
```



`GET | /api/articles` --> Listar artículos creados con author y tags

response:
```json
{
	"ok": true,
	"data": [
		{
			"_id": "68d5385d6d971e266f96717c",
			"title": "Como hacer un buen readme en 5 pasos",
			"author": {
				"_id": "68d5373e6d971e266f967177",
				"username": "matusilvera808",
				"id": "68d5373e6d971e266f967177"
			},
			"tags": [],
			"id": "68d5385d6d971e266f96717c"
		}
	]
}
```
`GET | /api/articles/my` --> Listar artículos del usuario autenticado

response:
```json
{
	"ok": true,
	"data": [
		{
			"_id": "68d539f26d971e266f96718f",
			"title": "Como hacer un buen readme en 5 pasos",
			"id": "68d539f26d971e266f96718f"
		},
		{
			"_id": "68d539f36d971e266f967192",
			"title": "Como hacer un buen readme en 5 pasos",
			"id": "68d539f36d971e266f967192"
		},
		{
			"_id": "68d539f46d971e266f967195",
			"title": "Como hacer un buen readme en 5 pasos",
			"id": "68d539f46d971e266f967195"
		}
	]
}
```
`GET | /api/articles/68d539f46d971e266f967195` --> Obtener articulos por id con populate completo

response:

```json
{
	"ok": true,
	"data": {
		"_id": "68d539f46d971e266f967195",
		"title": "Como hacer un buen readme en 5 pasos",
		"author": {
			"_id": "68d539dc6d971e266f967184",
			"username": "hOLA1234",
			"id": "68d539dc6d971e266f967184"
		},
		"tags": [], <-- si tuviera tags aca aparecerian todos.
		"comments": [], <-- si tuviera comentarios aparecerian todos los comentarios
		"id": "68d539f46d971e266f967195"
	}
}
```
`PUT | /api/articles/68d539f46d971e266f967195` --> Actualizar articulo
body: Puede ir cualquier campo que corresponda al modelo de Article, excepto author
```json
{
	"title": "mi primer blog chabales",
	"content": "mi primer blog chabales. El dia hablaremos de como conseguir diamantes de manera sencilla en minecraft"
}
```

response:
```json
{
	"ok": true,
	"msg": "articulo actualizado",
	"data": {
		"_id": "68d539f46d971e266f967195",
		"title": "mi primer blog chabales",
		"content": "mi primer blog chabales. El dia hablaremos de como conseguir diamantes de manera sencilla en minecraft",
		"status": "published",
		"author": "68d539dc6d971e266f967184",
		"tags": [],
		"createdAt": "2025-09-25T12:47:48.357Z",
		"updatedAt": "2025-09-25T12:51:37.138Z",
		"id": "68d539f46d971e266f967195"
	}
}
```
`DELETE | /api/articles/68d539f46d971e266f967195` --> eliminar artículo articulo

response: Al ser 204 (no content), manda una respuesta vacía.

##### Para los controladores de `Comment`

`POST | /api/comments` <-- Crear comentario

body:
```json
{
	"content": "Buen post. Ahora qur ya lo vi borralo",
	"author": "68d539dc6d971e266f967184", <-- _id del usuario que hace el comentario
	"article": "68d539f46d971e266f967195" <-- _id del articulo donde se postea el comentario
}
```
response:
```json
{
	"ok": true,
	"msg": "comentario publicado",
	"data": {
		"content": "Buen post. Ahora qur ya lo vi borralo",
		"author": "68d539dc6d971e266f967184",
		"article": "68d539f46d971e266f967195",
		"_id": "68d53e676d971e266f9671a1",
		"createdAt": "2025-09-25T13:06:47.163Z",
		"updatedAt": "2025-09-25T13:06:47.163Z"
	}
}
```

`GET | /api/comments/article/:articleId` <-- Traer todos los comentarios que pertenecen a un articulo
ej. */api/comments/article/68d53e676d971e266f9671a1*

response:
```json
{
	"ok": true,
	"data": [
		{
			"_id": "68d53e676d971e266f9671a1",
			"content": "Buen post. Ahora qur ya lo vi borralo",
			"author": {
				"_id": "68d539dc6d971e266f967184",
				"username": "hOLA1234",
				"id": "68d539dc6d971e266f967184"
			}
		}
	]
}
```


`GET | /api/comments/my` <-- Traer todos los comentarios que pertenecen al usuario logueado

response: 
```json
{
	"ok": true,
	"data": [
		{
			"_id": "68d53e676d971e266f9671a1",
			"content": "Buen post. Ahora qur ya lo vi borralo"
		}
	]
}
```
`PUT | /api/comments/:id` <-- Actualizar comentario
ej. */api/comments/68d53e676d971e266f9671a1*

body:
```json
{
	"content": "mentira no borres el canal" <-- unicamente se puede pasar el content
}
```

response:
```json
{
	"ok": false,
	"msg": "comentario actualizado",
	"data": {
		"acknowledged": true,
		"modifiedCount": 1,
		"upsertedId": null,
		"upsertedCount": 0,
		"matchedCount": 1
	}
}
```
`DELETE | /api/comments/:id` <-- Eliminar comentario

response: Al ser 204 (no content), manda una respuesta vacía.
