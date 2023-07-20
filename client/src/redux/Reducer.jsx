import { DELETE_DOG, FILTEDORIGIN, FILTEDTEMPER, GETALLTEMPS, GET_DOGS, GET_DOG_BY_ID, GET_DOG_BY_NAME, ORDERBYNAME, ORDERBYWEIGHT, POST_DOGS, RESETFILTERS } from "./Actions"
import { compareWeight } from "./utils/weightAux"

const initialState = {
    allDogs: [],
    dogsCopy: [],
    dogById: null,
    allTemps: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        //GETS
        case GET_DOGS:
            return {
                ...state,
                allDogs: action.payload,
                dogsCopy: action.payload,
            }

        case GET_DOG_BY_ID:
            return {
                ...state,
                dogById: action.payload
            }

        case GET_DOG_BY_NAME:
            return {
                ...state,
                allDogs: action.payload
            }

        case GETALLTEMPS:
            return {
                ...state,
                allTemps: action.payload
            }
        //FILTERS
        case RESETFILTERS:
            return {
                ...state,
                allDogs: state.dogsCopy
            }

        case FILTEDORIGIN:
            const filterOrigin = state.dogsCopy.filter((dog) => {
                const isDB = action.payload === "DB"
                return isDB ? typeof dog.id !== "number" : typeof dog.id === "number"
            })
            return {
                ...state,
                allDogs: filterOrigin,
            }

        case FILTEDTEMPER:
            return {
                ...state,
                allDogs: action.payload,
            }
        //ORDERS
        case ORDERBYNAME:
            const orderByName = [...state.allDogs]
            if (action.payload === "A") {
                orderByName.sort((a, b) => a.name.localeCompare(b.name))
            }
            else if (action.payload === "B") {
                orderByName.sort((a, b) => b.name.localeCompare(a.name))
            }
            return {
                ...state,
                allDogs: [...orderByName]
            }

        case ORDERBYWEIGHT:
            const orderByWeight = [...state.allDogs]
            if (action.payload === "C") {
                orderByWeight.sort(compareWeight)
            } else if (action.payload === "D") {
                orderByWeight.sort((a, b) => compareWeight(b, a))
            }
            return {
                ...state,
                allDogs: [...orderByWeight]
            }
        //POST
        case POST_DOGS:
            return {
                ...state,
                allDogs: [...state.allDogs, action.payload]
            }
        //DELETE    
        case DELETE_DOG:
            const updatedDogs = state.allDogs.filter((dog) => dog.id !== action.payload)
            return {
                ...state,
                allDogs: updatedDogs
            }
        default:
            return state
    }
}

export default rootReducer