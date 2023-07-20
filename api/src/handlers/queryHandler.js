const { Op } = require("sequelize");
const { Dog, Temperaments } = require("../db");

async function getDBDogsByName(name) {
    try {
        return await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: {
                model: Temperaments,
                attributes: ["name"],
                through: { attributes: [] },
            },
        });
    } catch (error) {
        throw new Error("Failed to fetch dogs from the database");
    }
}

module.exports = getDBDogsByName
