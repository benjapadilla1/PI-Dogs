async function getDBDogs() {
    const dbDogs = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["name"],
            through: { attributes: [] },
        },
    })
    return dbDogs
}
module.exports = getDBDogs