const axios = require("axios")
const { Dog, Temperaments } = require("../db");
const { transformDogAPIById, transformDogDBById } = require("../utils/dataDog");

const URL = "https://api.thedogapi.com/v1/breeds/"

async function getDogById(req, res) {
    try {
        const { id } = req.params
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(id)
        if (isUUID) {
            const dbDog = await Dog.findOne({
                where: { id: id },
                include: {
                    model: Temperaments,
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            })
            if (dbDog) {
                const dbDogRes = transformDogDBById(dbDog)
                return res.status(200).json({ dog: dbDogRes })
            }
        }
        const { data } = await axios.get(URL)
        const apiDogs = data.find(dog => dog.id === parseInt(id))
        //enviar el resultado si se encontro en la API
        if (apiDogs) {
            const apiDogsRes = transformDogAPIById(apiDogs)
            return res.status(200).json({ dog: apiDogsRes })
        }
        else {
            //404 si no se encontro
            return res.status(404).json({ error: "Couldn't find dog" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getDogById