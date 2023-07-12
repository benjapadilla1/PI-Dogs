const axios = require("axios");
const { Op } = require("sequelize"); // consultas avanzadas en la base de datos
const { Dog } = require("../db");
const URL = "https://api.thedogapi.com/v1/breeds";
const { transformDogByName } = require("../utils/dataDog")
async function getDogByQuery(req, res) {
    try {
        const { name } = req.query
        if (!name) { return res.status(400).json({ error: "You must provide a name" }) }

        const { data } = await axios.get(URL)
        const apiDogs = data.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
        if (apiDogs.length > 0) {
            const apiDogsRes = transformDogByName(apiDogs)
            return res.status(200).json({ dog: apiDogsRes })
        }
        const dbDogs = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        if (dbDogs.length > 0) {
            return res.status(200).json({ dog: dbDogs })
        }
        else {
            return res.status(404).json({
                error: `Couldn't find a dog breed with name "${name}"`
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getDogByQuery;

