function transformDogData(apiDogs) {
  return apiDogs.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight?.metric,
      height: dog.height?.metric,
      image: dog.image?.url,
      life_span: dog.life_span,
      temperament: dog.temperament,
    };
  });
}

function transformDogAPIById(apiDog) {
  return {
    id: apiDog.id,
    name: apiDog.name,
    weight: apiDog.weight?.metric,
    height: apiDog.height?.metric,
    image: apiDog.image,
    life_span: apiDog.life_span,
    temperament: apiDog.temperament,
  };
}
function transformDogDBById(DBDog) {
  return {
    id: DBDog.id,
    name: DBDog.name,
    weight: DBDog.weight,
    height: DBDog.height,
    image: DBDog.image,
    life_span: DBDog.life_span,
    temperament: DBDog.Temperaments.map((temp) => temp.name).join(", "),
  };
}
function transformDogsAPIByName(apiDogs) {
  return apiDogs.map((dog) => ({
    id: dog.id,
    name: dog.name,
    weight: dog.weight?.metric,
    height: dog.height?.metric,
    image: dog.image?.url,
    life_span: dog.life_span,
    temperament: dog.temperament,
  }));
}
function transformDogsDBByName(dbDogs) {
  return dbDogs.map((dog) => ({
    id: dog.id,
    name: dog.name,
    weight: dog.weight,
    height: dog.height,
    image: dog.image,
    life_span: dog.life_span,
    temperament: dog.Temperaments.map((temp) => temp.name).join(", "),
  }));
}

module.exports = {
  transformDogData,
  transformDogAPIById,
  transformDogDBById,
  transformDogsAPIByName,
  transformDogsDBByName,
};
