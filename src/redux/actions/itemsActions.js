import { LOAD_ITEMS, REMOVE_ITEMS, UPDATE_ITEMS, CREATE_ITEMS } from "../types";
import * as FileSystem from 'expo-file-system';
import { DB } from "../../db";

export const loadItems = () => {
    return async dispatch => {
        await DB.init();
        const items = await DB.getItems();
        
        dispatch({
            type: LOAD_ITEMS,
            payload: items || []
        })
    }
}

export const updateItems = items => async dispatch => {
    let imagesList = [];
    items.img.forEach(async image => {
        const tempFileName = image.split('/').pop();
        const newFileName = FileSystem.documentDirectory + tempFileName;
        imagesList.push(newFileName);
        try {
            await FileSystem.moveAsync({
                to: newFileName,
                from: image,
            })
        } catch (e) { console.log('Ошибка перемещени картинки - ' + e) }
     })
    
    const payload = {...items, img: JSON.stringify(imagesList)};
    try {
        await DB.updateItems(payload);
    } catch(e) {console.log('Ошибка обновления базы - ' + e)}
    dispatch ({
        type: UPDATE_ITEMS,
        payload: payload
    })
}

export const removeItems = id => async dispatch => {
    try {
        await DB.removeItems(id)
    } catch (e) {console.log('Ошибка удаления из базы - ' + e)}
    dispatch ({
        type: REMOVE_ITEMS,
        payload: id
    })
}

export const createItems = items => async dispatch => {
    let imagesList = [];
    items.img.forEach(async image => {
        const tempFileName = image.split('/').pop();
        const newFileName = FileSystem.documentDirectory + tempFileName;
        imagesList.push(newFileName);
        try {
            await FileSystem.moveAsync({
                to: newFileName,
                from: image,
            })
        } catch (e) { console.log('Ошибка перемещени картинки - ' + e) }
     })
    
    const payload = {...items, img: JSON.stringify(imagesList)};
    
    const id = await DB.createItems(payload);
    payload.id = id;
    //console.log(payload)
    dispatch ({
        type: CREATE_ITEMS,
        payload
    })
}