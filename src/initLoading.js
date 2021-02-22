import * as Font from 'expo-font';
import { DB } from './db';

export async function initLoading() {
  try {
    await DB.init();
  } catch (e) { console.log('DB loading error - ' + e) }
}
