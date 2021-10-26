import { ADD_COUNTER, REMOVE_COUNTER } from "./Actions";

const initialValue = {
    counter: 0
}

export const counterReducer = (state = initialValue, action) => {
    switch (action.type) {
        case ADD_COUNTER:
            return {
                counter: state.counter + 1
            }
        case REMOVE_COUNTER:
            return {
                counter: state.counter - 1
            }

        default:
            return state
    }
}