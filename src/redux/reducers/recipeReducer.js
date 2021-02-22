import { LOAD_RECIPE, REMOVE_RECIPE, UPDATE_RECIPE, CREATE_RECIPE } from "../types"

const initialState = {
    recipes: [],
    loading: true,
}

export const recipeReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_RECIPE: return { ...state, recipes: action.payload, loading: false }

        case UPDATE_RECIPE: 
            const recipes = state.recipes.map(item => {
                if (item.id === action.payload.id) { item = action.payload };
                return item;
            })
            return { ...state, recipes }

        case REMOVE_RECIPE:
            return { ...state, recipes: state.recipes.filter(item => item.id !== action.payload) }

        case CREATE_RECIPE: 
            return { ...state, recipes: [ ...state.recipes, {...action.payload}] }
            
        default: return state
    }
}