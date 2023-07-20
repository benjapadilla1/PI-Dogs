import axios from "axios"

const URL = "http://localhost:3001/dogs"

export const GET_DOGS = "GET_DOGS"
export const GET_DOG_BY_ID = "GET_DOG_BY_ID"
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME"

export const GETALLTEMPS = "GETALLTEMPS"

export const POST_DOGS = "POST_DOGS"
export const DELETE_DOG = "DELETE_DOG"

export const FILTEDTEMPER = "FILTEDTEMPER"
export const FILTEDORIGIN = "FILTEDORIGIN"
export const RESETFILTERS = "RESETFILTERS"

export const ORDERBYNAME = "ORDERBYNAME"
export const ORDERBYWEIGHT = "ORDERBYWEIGHT"

export function getAllDogs() {
    return async function (dispatch) {
        const { data } = await axios.get(URL)
        return dispatch({
            type: GET_DOGS,
            payload: data.dogs
        })
    }
}

export function getDogById(id) {
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`${URL}/${id}`)
            const result = data.dog
            return dispatch({
                type: GET_DOG_BY_ID,
                payload: result
            })
        }
    }
    catch (error) {
        throw new Error("There was an error searching for a dog by id")
    }
}

export function getDogByName(name) {
    try {
        return async function (dispatch) {
            const { data } = await axios.get(`${URL}/name?name=${name}`)
            const result = data.dog
            return dispatch({
                type: GET_DOG_BY_NAME,
                payload: result
            })
        }
    }
    catch (error) {
        alert(`The dog with the name ${name} was not found`)
        throw error
    }
}

//POST
export function postDog(dog) {
    return async function (dispatch) {
        try {
            const { data } = await axios.post(URL, dog)
            return dispatch({
                type: POST_DOGS,
                payload: data
            })
        }
        catch (error) {
            console.log("There was en error creating the dog", error)
            throw error
        }
    }
}

//DELETE 
export function deleteDog(id) {
    return async function (dispatch) {
        try {
            await axios.delete(`${URL}/delete/${id}`)
            return dispatch({
                type: DELETE_DOG,
                payload: id
            })
        } catch (error) {
            console.error("There was an error deleting the dog", error)
        }
    }
}

//FILTERS
export function resetFilters() {
    return {
        type: RESETFILTERS,
    }
}

export function getAllTemps() {
    return async function (dispatch) {
        const { data } = await axios(`${URL}/temperaments`)
        const temperaments = data.temperaments.map((t) => t.name)
        return dispatch({
            type: GETALLTEMPS,
            payload: temperaments
        })
    }
}
export function filterTemp(temperament) {
    return async function (dispatch) {
        try {
            const { data } = await axios(URL)
            const filtedDogs = data.dogs.filter((d) => d.temperament && d.temperament.toLowerCase().includes(temperament.toLowerCase()))
            return dispatch({
                type: FILTEDTEMPER,
                payload: filtedDogs,
            })
        }
        catch (error) {
            console.error("Error obtaining the temperaments", error)
            throw new Error("Error obtaining the temperaments")
        }
    }
}

export function filterOrigin(origin) {
    try {
        return {
            type: FILTEDORIGIN,
            payload: origin
        }
    } catch (error) {
        alert("No dogs have been created yet")
    }
}

//ORDERS

export function orderByWeight(weight) {
    return {
        type: ORDERBYWEIGHT,
        payload: weight
    }
}

export function orderByName(order) {
    return {
        type: ORDERBYNAME,
        payload: order
    }
}

