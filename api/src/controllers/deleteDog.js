const { Dog } = require("../db")

async function deleteDog(req, res) {
    try {
        const { id } = req.params
        const dbDogs = await Dog.findByPk(id)
        if (!dbDogs) return res.status(404).json({ error: "Dog not found" })
        await dbDogs.destroy()
        return res.status(204).json({ success: "Dog deleted" })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = deleteDog