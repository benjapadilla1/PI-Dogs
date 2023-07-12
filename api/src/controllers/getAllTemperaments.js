const axios = require("axios")
const { Temperaments } = require("../db")

const URL = "https://api.thedogapi.com/v1/breeds"
async function getAllTemperaments(req, res) {
    try {
        const { data } = await axios.get(URL)
        const dataTemp = []
        data.forEach((dog) => {
            if (dog.temperament) {
                const dogTemper = dog.temperament
                    .split(", ")
                    .map((tem) => tem.trim())
                dataTemp.push(...dogTemper)
            }
        })
        const uniqueTemp = Array.from(new Set(dataTemp))
        await Promise.all(uniqueTemp.map((temp) => {
            Temperaments.findOrCreate({
                where: {
                    name: temp
                },
            })
        }))
        const allTemp = await Temperaments.findAll()
        res.status(200).json({ temperaments: allTemp })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = getAllTemperaments
