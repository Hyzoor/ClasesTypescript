****
```ts
let a: number = 5;
const b: string = "5";

console.log(a == b);    // True
console.log(a === b);   // False 
```

Hay dos tipos disponibles cuando no conocemos el tipo de la variable:
- **Any**: No conozco el tipo, compila sin warning, es el único remedio.
- **Unknown**: No conozco el tipo, compila con warning, intención de cambiarlo. 

```ts
type Objeto = {
	atributo1?: number;
	atributo2?: string;
};

interface Interfaz {
	atributo: number;
};

const objeto: Objeto = {
	atributo1: 1,
	atributo2: "atri"
}

// Dos maneras de declarar funciones: 
const arrowFunction = (atributo1: number): string => {}
function nameFunction(atributo: number): number {};
```

> [!warning]
> En TypeScript todo son variables! Incluso las funciones son consideradas como variables, podemos tener un array de funciones, pasar funciones como argumento y devolver como resultado una función 
> 
>**Callbacks**: funciones que se pasan como argumento a otras funciones para ejecutarse después o dentro de esa función

> [!note]
> En TypeScript: ( ) => {return a+b}  es exactamente lo mismo que: ( ) => (a+b)
### Arrays y sus métodos

```ts
// const variable: tipo[];
const numeritos: number[] = [1,2,3,4];

// Array.from crear array de un size con un contenido
// Array.from({length: 5}, )
numeritos = Array.from({length: 20}, () => (Math.floor.Math.random*11));

// Array.filter(), Array nuevo con los elementos que cumplen una condicion
numeritosPares = numeritos.filter((element) => {return element%2 == 0});

// Array.forEach(), itera cada elemento y hace una funcion
numeritos.forEach( (n) => {if(n%2 == 0) console.log(n)} );

// Array.every(), comprueba si todos los elementos cumplen una condicion
const todosPares: boolean = numeritos.every((n) => (n%2 == 0));

// Array.map(), nuevo array con el resultado de la funcion
const numerosMultiplicados: number[] = numeritos.map( (x) => (x*2) );

// Array.find(), devuelve la primera coincidencia que cumpla la condicion
const multiplo2y5 = numerosMultiplicados.find((x) => (x%2 === 0 && x%5 === 0));

// Array.some(), devuelve true si algun elemento cumple la condicion
const algunosPares: boolean = numeritos.some((x) => (x%2 === 0));

// Array.includes(), true en caso de que un elemento este incluido, falso si no
const estaElNumero5: boolean = numeritos.includes(5);

```

### Array.reduce();

```ts
// Array.reduce( (funcion) => {} , valorInicial); Devuelve un unico valor/variable
// La funcion es (accumulador, valorActual) => {}

const numeritos: number[] = [1,2,3,4,5];
const sumaTotal = numeritos.reduce((accumulator, i) => (accumulator + i),0)

```

### Spread Operator and Deconstruction

```ts
const numeros: number[] = [1,2];
const nuevosNumeros = [numeros]; // [1,2] nuevosNumeros = [[1,2]]
const nuevosNumeros2 = [...numeros, 5]; // 1,2,5

type Persona = {name: string, altura: number, age: number}
const persona = {name:"Juanito", altura:170, age:22}
const {altura, ...restoDeAtributos} = persona;
const persona2 = {...persona, name:"Pepito"}; // Sobreescribo solo el name
```

### Proyectos en NODEjs

```bash
npm init -y
npm install --save-dev typescript ts-node nodemon @types/node
npx tsc --init

npm run "nombre del script"

## Agregar
"type": "module"

scripts
"start": "ts-node index.ts",
"dev": "nodemon --exec ts-node index.ts"
```

### Configurar Git

```bash
git config --global user.name "username"
git config --global user.email "email"

//Crear llave ssh
ssh-keygen -t ed25519 -C "miemail"

//Llaves guardadas en ~/.ssh

git remote add origin url
//Para omitir el escribir continuamente el origin
git -u push origin master
```

### APIs (Application Programming Interface)

Interfaz para comunicarnos con una aplicacion de una manera mas sencilla.
Podemos hacer peticiones para obtener datos, actualizar, crear, ect.

>[!info] **Promesa** : Al realizar una peticion no recibes la respuesta del servidor instantaneamente, si no que recibes un objeto promesa del cual recibiras la respuesta en cuanto se resuelva o en caso contrario, un error.
**Handshake**: Cliente realiza peticion, recibe una promesa por parte del servidor que contiene una promesa de la consulta a la base de datos. En cuanto el servidor obtiene la informacion y resuelve su promesa la primera se resuelve tambien obteniendo la info.

```bash
## Para manejar promesas, errores y muchas cosas mas de red usar paquete axios
npm install axios
npm install -D @types/axios

## Agregar al package.json: "type":module
```

### Await and Async

Funcion Asyc (Asincrona) : Funcion que se ejecuta de manera independiente apartada.
Await: Es el .then de las promesas para indicar que una vez se resuelva la funcion asincrona

```ts
const getCharacter = async (id: number) => (await axios.get("endpoint")).data
const Morty = await getCharacter(2);
```

### Making own API using express

```bash
## Installing express library
npm install express
npm install -D @types/express

## Installing cors library (ONLY FOR TESTING)
npm install cors
npm install -D @types/cors
```

### Mini Example API
```ts
import axios from "axios"
import cors from "cors"
import express from "express"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => res.send("Bienvenido, ruta principal /"))
app.listen(3000, () => console.log("Servidor a la escucha"))
```

### TsConfig Default Project

```json
{
	"compilerOptions": {
	"target": "es2020",
	"module": "commonjs",
	"rootDir": "src",
	"outDir": "dist",
	"esModuleInterop": true,
	"strict": true,
	"skipLibCheck": true,
	"forceConsistentCasingInFileNames": true,
	"declaration": true
},
	"include": ["src"],
}
```
### API using MongoDB

```bash
npm install mongodb
```

```
- Cluster: Servidor/Maquina
	- Database: Base de datos
		- Collection: "Tablas de SQL"
			- Document: Objeto JSON / "Fila de una tabla de SQL"
```

#### Connecting to MongoDB
```ts
let client: MongoClient;
let DB: Db;
const dbName = "Universidad";

export const connectMongoDB = async () : Promise<void> => {
	try{
		const mongoURL = "blablabla check MongoDB Atlas website";
		client = new MongoClient(mongoURL);
		await client.connect();
		DB = client.db(dbName);
		console.log("Connected to mongodb at db:" + dbName);
	}catch(error){
		console.log("Error message:", error);
	}
}

export const getDb = () => DB;
```

#### Using a Router
```ts
import { Router } from "express";

const router = Router();
const coleccion = getDb().collection("Nombre de la coleccion (Tabla de SQL)");

router.get('/', async (req, res) => {
	try{
		const personas = await coleccion().find().toArray();
		res.json(personas);
	}catch(error){
		res
			.status(404)
			.json({message: "Error", detail: error.message})
	}
})
```

```ts
// index.ts
connectMongoDB();
const app = express();
app.use('/api/personas', router); 
// All routes of the router will be attached to /api/personas
// '/1' === /api/personas/1
```

### Variables de Entorno

Podemos crear archivos .env para tener variables privadas.
- Archivo .env con nuestras variables privadas. GIT IGNORE
- Archivo .env.sample con una plantilla de como se nombran las variables

```bash
npm install dotenv
```

```ts
const mivariableSecreta = process.env.NOMBRE_VARIABLE
```

```
// .env
PORT = 3000
USER = Pepito
USER_PASSWORD = 1234
```


### MongoDB Functions

```ts

const miscosas = await coleccion().find().toArray(); // filtro vacio = todos
const micosa = await coleccion().findOne({filtro: valor});
const result = await coleccion().insertOne({json});
const result = await coleccion().updateOne({filter: valor}, {update});

// Para los filtros podemos usar:
// $eq, $nq, $gt, $gte, $lt, $lte, $in, $nin

// Algunos ejemplos:

const cosa = await collecion().find(
	{age: {$gt: Number(req.params.age)}}
	);

```

### Paginacion

```ts

router.get('/', (req, res) => {
	
	// Si no se introduce ninguna pagina o limite establezco uno por defecto.
	const page = Number(req.query?.page) || 1;
	const limit = Number(req.query?.limit) || 2;  
	const skipt = (page - 1) * limit; // Calculo cuantos elementos debo saltar
	
	try{
		const cosas = await colecion().find().skip(skip).limit(limit).toArray();
		res.json({
			
			info:{
				page: page,
				numberOfObjsInPage: limit
			},
			result: cosas
		});
		
	}catch(error:any){
		res
			.status(404)
			.json({message: "Error", detail: error})
	}
})
```

### Auth Ejemplo en API REST

```ts
router.post('/register', async (req, res) => {
try {
	const { email, password } = req.body as User;
	const exists = await coleccion().findOne({ email: email });
	if (exists) return res.status(404).json({ message: ""});
	// Omito validar email y passwd
	const psswdEncrypted = await bcrypt.hash(password, 10);

	await coleccion().insertOne({email, passwordEncriptada});
	
	res.status(201).json({ message: ""});
	} catch (err: any) {
	
		res
			.status(500)
			.json({ message: "", detail: err.message })
			
	}

})

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body as User;
		const user = await coleccion().findOne({ email });
		if (!user) return res.status(404).json({ message: ""});
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return res.status(401).json({ message });
		const token = jwt.sign({ id, email }, SECRET as string,{expiresIn: "1h"})
		
		res.status(200).json({ message: token })
	} catch (err: any) {
		
		res
			.status(500)
			.json({ message, detail: err.message });
	
	}

})
```

### API usando GraphQL

- Schema
- Resolvers
