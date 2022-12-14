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
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
        const imagesList = await saveToMedia(items);
    
    const payload = {...items, img: JSON.stringify(imagesList)};
    try {
        await DB.updateItems(payload);
    } catch(e) {console.log('Ошибка обновления базы - ' + e)}
    dispatch ({
        type: UPDATE_ITEMS,
        payload: payload
    })
}}

export const deleteImg = img => async dispatch => {
    await deteleFromMedia(img)
    //await FileSystem.deleteAsync(img)
}

export const removeItems = item => async dispatch => {
    try {
        await DB.removeItems(item.id)
    } catch (e) {console.log('Ошибка удаления из базы - ' + e)}

    for (const img of item.img) {
        await deteleFromMedia(img)
        //await FileSystem.deleteAsync(img)
    }

    dispatch ({
        type: REMOVE_ITEMS,
        payload: item.id
    })
}

export const createItems = items => async dispatch => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
        const imagesList = await saveToMedia(items);

        const payload = {...items, img: JSON.stringify(imagesList)};
        const id = await DB.createItems(payload);
        payload.id = id;
        dispatch ({
            type: CREATE_ITEMS,
            payload
        })
    }
}

async function saveToMedia (items) {
    let result = [];
    for (const image of items.img) {
        try {
            const tempFileName = image.split('/').pop();
            const asset = await MediaLibrary.createAssetAsync(image);
            const album = await MediaLibrary.getAlbumAsync("TextPadPhoto");
            if (!album) {
                await MediaLibrary.createAlbumAsync("TextPadPhoto", asset, true);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync(asset, album, true);
            }
            if (image.split("/").includes('cache')) await FileSystem.deleteAsync(image)
            const assets = await MediaLibrary.getAssetsAsync({album: album})
            assets.assets.forEach(el => {
                const elFileName = el.uri.split('/').pop();
                if (elFileName === tempFileName) {
                    result.push(el.uri);
                }
            })
            
            } catch (error) {
                console.log(error);
            }}
        return result;
}

async function deteleFromMedia (img) {
    try {
        const fileName = img.split('/').pop();
        const album = await MediaLibrary.getAlbumAsync("TextPadPhoto");
        const assets = await MediaLibrary.getAssetsAsync({album: album})
        assets.assets.forEach(el => {
            const elFileName = el.uri.split('/').pop();
            if (elFileName === fileName) {
                MediaLibrary.deleteAssetsAsync(el);
            }
        })
    } catch (e) { console.log('Ошибка удаления картинки - ' + e) }
}