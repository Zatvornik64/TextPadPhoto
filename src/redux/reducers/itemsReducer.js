import { LOAD_ITEMS, REMOVE_ITEMS, UPDATE_ITEMS, CREATE_ITEMS } from "../types"

const initialState = {
    items: [],
    loading: true,
}

export const itemsReducer = (state=initialState, action) => {
    //console.log(action)
    switch (action.type) {
        case LOAD_ITEMS: return { ...state, items: action.payload, loading: false }

        case UPDATE_ITEMS: 
            const items = state.items.map(item => {
                if (item.id === action.payload.id) { item = action.payload };
                return item;
            })
            return { ...state, items }

        case REMOVE_ITEMS:
            return { ...state, items: state.items.filter(item => item.id !== action.payload) }

        case CREATE_ITEMS: 
            return { ...state, items: [ ...state.items, {...action.payload}] }
            
        default: return state
    }
}