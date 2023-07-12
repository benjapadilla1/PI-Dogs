const { Dog, Temperaments } = require("../db")

async function createDog(req, res) {
    try {
        const { name, height, weight, image, temperament, life_span } = req.body
        //Busco el perro en la base de datos y si esta digo que ya existe
        const dbDog = await Dog.findOne({
            where: {
                name,
            },
        })
        if (dbDog) { return res.status(400).json({ error: "Dog already exists" }) }

        const newDog = await Dog.create({
            name,
            height,
            weight,
            image,
            life_span,
        })
        await newDog.addTemperaments(temperament)
        return res.status(201).json({ dog: newDog, })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = createDog