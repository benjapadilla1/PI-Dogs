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
        }
    })
}

function transformDogById(apiDog) {
    return {
        id: apiDog.id,
        name: apiDog.name,
        weight: apiDog.weight?.metric,
        height: apiDog.height?.metric,
        image: apiDog.image?.url,
        life_span: apiDog.life_span,
        temperament: apiDog.temperament,
    }
}
function transformDogByName(apiDogs) {
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

module.exports = { transformDogData, transformDogById, transformDogByName }