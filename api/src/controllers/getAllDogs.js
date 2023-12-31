const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
const { Dog, Temperaments } = require("../db");
const { transformDogData } = require("../utils/dataDog");

async function getAllDogs(req, res) {
  try {
    const { data } = await axios.get(
      URL +
        "?api_key=live_pApEoncZ1D9dDiOBgXOtOYZtAx5z8JnOGgsOx0CZZ75KwZT3xPZ5X4OeawHnrHJC"
    ); // Buscar perros de API
    const dbDogs = await Dog.findAll({
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: { attributes: [] },
      },
    }); //Buscar perros de base de datos que incluyan el modelo temperaments
    //Los temperaments los pasa a "temperament"
    const temperdbDog = dbDogs.map((dog) => {
      const temperament = dog.Temperaments.map((temp) => temp.name).join(", ");
      return {
        ...dog.toJSON(),
        temperament,
      };
    });

    const apiDogs = transformDogData(data);
    const allDogs = [...temperdbDog, ...apiDogs];

    res.status(200).json({ dogs: allDogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAllDogs;
