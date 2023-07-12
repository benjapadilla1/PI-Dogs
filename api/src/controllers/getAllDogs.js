const axios = require("axios")
const URL = "https://api.thedogapi.com/v1/breeds"
const { Dog, Temperaments } = require("../db")
const { transformDogData } = require("../utils/dataDog")

async function getAllDogs(req, res) {
    try {
        const { data } = await axios.get(URL) // Buscar perros de API
        const dbDogs = await Dog.findAll({
            include: {
                model: Temperaments,
                attributes: ["name"],
                through: { attributes: [] }
            }
        }) //Buscar perros de base de datos

        const apiDogs = transformDogData(data)
        const allDogs = [...dbDogs, ...apiDogs]

        res.status(200).json({ dogs: allDogs })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getAllDogs
