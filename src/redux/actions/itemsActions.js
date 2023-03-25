import { LOAD_ITEMS, REMOVE_ITEMS, UPDATE_ITEMS, CREATE_ITEMS } from "../types";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
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
    //console.log(items)
    items.img.forEach(async image => {
        const tempFileName = image.split('/').pop();
        const newFileName = FileSystem.documentDirectory + tempFileName;
        imagesList.push(newFileName);
        if (image.split("/").includes('cache')) {
            try {
                await FileSystem.moveAsync({
                    to: newFileName,
                    from: image,
                })
            } catch (e) { console.log('Ошибка перемещени картинки - ' + e) }
        }})
    
    const payload = {...items, img: JSON.stringify(imagesList)};
    try {
        await DB.updateItems(payload);
    } catch(e) {console.log('Ошибка обновления базы - ' + e)}
    //console.log("update: ", payload)
    dispatch ({
        type: UPDATE_ITEMS,
        payload: payload
    })
}

export const deleteImg = img => async dispatch => {
    try {
        await FileSystem.deleteAsync(img)
    } catch (e) { console.log('Ошибка удаления картинки - ' + e) }
}

export const removeItems = item => async dispatch => {
    try {
        await DB.removeItems(item.id)
    } catch (e) {console.log('Ошибка удаления из базы - ' + e)}

    item.img.forEach(async element => {
        //if (element.split("/").includes('files')) {
            try {
                await FileSystem.deleteAsync(element)
            } catch (e) { console.log('Ошибка удаления картинки - ' + e) }
        })

    dispatch ({
        type: REMOVE_ITEMS,
        payload: item.id
    })
}

export async function saveItems (item) {
        try {
            const asset = await MediaLibrary.createAssetAsync(item);
            const album = await MediaLibrary.getAlbumAsync("TextPadPhoto");
            if (!album) {
                await MediaLibrary.createAlbumAsync("TextPadPhoto", asset, true);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync(asset, album, true);
            }
            } catch (error) {
                console.log(error);
            }
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