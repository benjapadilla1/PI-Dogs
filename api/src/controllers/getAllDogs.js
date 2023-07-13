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
        }) //Buscar perros de base de datos que incluyan el modelo temperaments
        const temperdbDog = dbDogs.map((dog) => {
            const temperamentToMap = dog.Temperaments.map((temp) => ({ name: temp.name }))
            const temperament = temperamentToMap.map((temp) => temp.name).join(", ")
            return {
                ...dog.toJSON(),
                temperament
            }
        })

        const apiDogs = transformDogData(data)
        const allDogs = [...temperdbDog, ...apiDogs]
        // const allDogs = [...dbDogs, ...apiDogs]

        res.status(200).json({ dogs: allDogs })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getAllDogs
