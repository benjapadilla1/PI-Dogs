import React from 'react'

export default function validate(dogData) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    let errors = {}
    //ALL
    if (Object.values(dogData).every(value => value.trim() === '')) {
        errors = { all: "Please enter the required fields" }
    }
    // NAME
    if (!dogData.name.trim()) {
        errors.name = "Please enter the name"
    }

    // HEIGHT
    if (!dogData.height.trim()) {
        errors.height = "Please enter a height"
    }
    // WEIGHT
    if (!dogData.weight.trim()) {
        errors.weight = "Please enter a weight"
    }
    // IMAGE
    else if (!urlRegex.test(dogData.image)) {
        errors.image = "Please enter a valid URL image"
    }
    // TEMPERAMENT
    if (!dogData.temperament.trim()) {
        errors.temperament = "Please enter a temperament"
    }

    // LIFE_SPAN
    if (!dogData.life_span.trim()) {
        errors.life_span = "Please enter a life span"
    }
    return errors
}
