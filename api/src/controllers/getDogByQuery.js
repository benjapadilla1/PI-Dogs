const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
const {
  transformDogsAPIByName,
  transformDogsDBByName,
} = require("../utils/dataDog");
const getDBDogsByName = require("../handlers/queryHandler");
async function getDogByQuery(req, res) {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "You must provide a name" });
    }

    const { data: dogs } = await axios.get(
      URL +
        "?api_key=live_pApEoncZ1D9dDiOBgXOtOYZtAx5z8JnOGgsOx0CZZ75KwZT3xPZ5X4OeawHnrHJC"
    );
    const apiDogs = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );

    const dbDogs = await getDBDogsByName(name);

    let comnbinedDogs = [];
    if (apiDogs.length > 0) {
      const apiDogsRes = transformDogsAPIByName(apiDogs);
      comnbinedDogs = comnbinedDogs.concat(apiDogsRes);
    }

    if (dbDogs.length > 0) {
      const dbDogsRes = transformDogsDBByName(dbDogs);
      comnbinedDogs = comnbinedDogs.concat(dbDogsRes);
    }
    if (comnbinedDogs.length > 0) {
      return res.status(200).json({ dog: comnbinedDogs });
    } else {
      return res.status(404).json({
        error: `Couldn't find a dog breed with name "${name}"`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = getDogByQuery;
