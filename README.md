# Escuela Colombiana de Ingeniería Julio Garavito

# Proyecto ARSW 2021-1

## 📍 LACMAN

#### Product Owner 💥

> - Sebastián Henao Pinzón

#### Team 👤👤👤

> - María Angélica Alfaro Fandiño (Back)
> - César Fernando Ortiz Rocha (Front)
> - Laura Alejandra Izquierdo Castro (Design)

### 🔎 Descripción del producto

**Descripción general:** El presente repositorio contiene el Frontend y Server para manejo de eventos del juego multijugador **LACMAN** que se encuentra en mayor detalle en el repositorio de Backend.

#### 📂 Enlace a Backend: [Ir a Repositorio](https://github.com/Los-Programadoress/ARSW-2-2021-1-PROY)

## 🚀 Despliegue en Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://lacman-si.herokuapp.com)

## 🚀 Despliegue en Azure

[![Deploy](https://aka.ms/deploytoazurebutton)](https://lacmanmultiplayer.azurewebsites.net)

## 🏁 Cómo Empezar (para ejecutar el juego localmente)

Seguir los pasos descritos a continuación, después de clonar el repositorio:

### 🖐 Requisitos

**Para la Instalación:**

- Node

**Para la Ejecución:**

- Cambia el *endpoint* de socket.io del lado del Cliente. Para hacer esto, dirígete a `client/src/components/ComponentsGame/Game.js` y cambie la línea #15 de `const ENDPOINT = 'https://lacman-si.herokuapp.com/'` a `const ENDPOINT = 'http://localhost:5000'`

### ⏳ Instalación

- En la raíz del proyecto, use npm para instalar las dependencias del lado del servidor.

```bash
npm install
```

Este comando instala todas las dependencias que necesita el lado del servidor para que el juego ejecute localmente.

- Usa npm para ejecutar el servidor

```bash
npm start
```

Este comando ejecuta al servidor por el puerto 5000 de localhost.

- En una terminal separada, navegue entre el folder del cliente y use npm para instalar las dependencias del lado del cliente.
 
```bash
cd client
npm install
```

Este comando instala todas las dependencias que necesita el lado del cliente para que el juego ejecute localmente.

- Finalmente, use npm para ejecutar el cliente.

```bash
npm start
```

Este comando ejecuta al cliente por el puerto 3000 de localhost.

Dirígete a http://localhost:3000/ y a jugar! 🎮
