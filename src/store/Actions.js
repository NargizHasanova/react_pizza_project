export const ADD_COUNTER = "ADD_COUNTER"
export const REMOVE_COUNTER = "REMOVE_COUNTER"

export const addAction = () => {
    return {
        type: ADD_COUNTER
    }
}

export const removeAction = () => {
    return {
        type: REMOVE_COUNTER
    }
}