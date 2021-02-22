import { LOAD_RECIPE, REMOVE_RECIPE, UPDATE_RECIPE, CREATE_RECIPE } from "../types";
import * as FileSystem from 'expo-file-system';
import { DB } from "../../db";

export const loadRecipes = () => {
    return async dispatch => {
        await DB.init();
        const recipes = await DB.getRecipes();
        dispatch({
            type: LOAD_RECIPE,
            payload: recipes
        })
    }
}

export const updateRecipes = recipe => async dispatch => {
    try {
        await DB.updateRecipe(recipe);
    } catch(e) {console.log('Ошибка обновления базы - ' + e)}
    dispatch ({
        type: UPDATE_RECIPE,
        payload: recipe
    })
}

export const removeRecipes = id => async dispatch => {
    try {
        await DB.removeRecipe(id)
    } catch (e) {console.log('Ошибка удаления из базы - ' + e)}
    dispatch ({
        type: REMOVE_RECIPE,
        payload: id
    })
}

export const createRecipes = recipe => async dispatch => {
    const tempFileName = recipe.img ? recipe.img.split('/').pop() : null;
    const newFileName = recipe.img ? FileSystem.documentDirectory + tempFileName : null;
     if (recipe.img) {
        try {
            await FileSystem.moveAsync({
                to: newFileName,
                from: recipe.img,
            })
        } catch (e) { console.log('Ошибка перемещени картинки - ' + e) }
     }

    const payload = {...recipe, img: newFileName};
    const id = await DB.createRecipe(payload);
    payload.id = id;

    dispatch ({
        type: CREATE_RECIPE,
        payload
    })
}