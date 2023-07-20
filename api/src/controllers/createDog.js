const { Dog, Temperaments } = require("../db")
const axios = require("axios")
const URL = "https://api.thedogapi.com/v1/breeds"
async function createDog(req, res) {
    try {
        const { name, height, weight, image, temperament, life_span } = req.body
        //Busco el perro en la base de datos y si esta digo que ya existe
        const dbDog = await Dog.findOne({
            where: {
                name,
            },
        })
        const { data } = await axios(URL)
        const apiDog = data.find((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
        if (dbDog || apiDog) { return res.status(400).json({ error: "Dog already exists" }) }

        const newDog = await Dog.create({
            name,
            height,
            weight,
            image,
            life_span,
        })
        const temperaments = await Temperaments.findAll({
            where: {
                id: temperament,
            },
        });
        await newDog.addTemperaments(temperaments)
        return res.status(201).json({ dog: newDog, })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = createDog