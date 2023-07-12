const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const getDogById = require('../controllers/getDogById');
const getDogByQuery = require('../controllers/getDogByQuery');
const createDog = require('../controllers/createDog');
const getAllTemperaments = require('../controllers/getAllTemperaments');
const postMiddleware = require('../middleware/postMiddleware');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/temperaments", getAllTemperaments)

router.get("/name", getDogByQuery)

router.get("/:id", getDogById)

router.post("/", postMiddleware, createDog)

router.get("/", getAllDogs)

module.exports = router;
