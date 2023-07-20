
export default function validate(dogData, temperament) {

    let errors = {}

    const { name, height, weight, image, life_span } = dogData


    // NAME
    if (name.trim() === "") {
        errors.name = "Please enter the name"
    }
    if (/\d/.test(name)) {
        errors.name = "Name must not contain numbers"
    }

    // HEIGHT
    if (height.trim() === "") {
        errors.height = "Please enter a height"
    }
    else if (!/^\d+\s*-\s*\d+$/.test(height)) {
        errors.height = "Please enter a valid height range (min - max)"
    } else {
        const heightMin = parseInt(height.split('-')[0].trim())
        const heightMax = parseInt(height.split('-')[1].trim())
        if (heightMin > heightMax) {
            errors.height = "The minimun height cannot be smaller than the maximum"
        } else if (heightMin === heightMax) {
            errors.height = "The minimum and maximum height should be different"
        }
    }

    // WEIGHT
    if (weight.trim() === "") {
        errors.weight = "Please enter a weight"
    } else if (!/^\d+\s*-\s*\d+$/.test(weight)) {
        errors.weight = "Please enter a valid weight range (min - max)"
    } else {
        const weightMin = parseInt(weight.split('-')[0].trim())
        const weightMax = parseInt(weight.split('-')[1].trim())
        if (weightMin > weightMax) {
            errors.weight = "The minimun weight cannot be smaller than the maximum"
        } else if (weightMin === weightMax) {
            errors.weight = "The minimum and maximum weight should be different"
        }
    }

    // IMAGE
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    const imageExtensionRegex = /\.(jpg|jpeg|png)$/i
    if (!urlRegex.test(image) || !imageExtensionRegex.test(image)) {
        errors.image = "Please enter a valid URL image"
    }

    // TEMPERAMENT
    if (!temperament || temperament.length === 0 || temperament.length > 6) {
        errors.temperament = "Please choose no more than 6 and no less than 1 temperament"
    }

    // LIFE_SPAN
    if (life_span.trim() === "") {
        errors.life_span = "Please enter a life span"
    } else if (!/^\d+\s*-\s*\d+$/.test(life_span)) {
        errors.life_span = "Please enter a valid life span range (min - max)"
    } else {
        const lifeMin = parseInt(life_span.split('-')[0].trim())
        const lifeMax = parseInt(life_span.split('-')[1].trim())
        if (lifeMin > lifeMax) {
            errors.life_span = "The minimun life Span cannot be smaller than the maximum"
        } else if (lifeMin === lifeMax) {
            errors.life_span = "The minimum and maximum life Span should be different"
        }
    }
    return errors
}
