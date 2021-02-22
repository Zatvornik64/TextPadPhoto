import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recipes.db')

export class DB {
    static init () {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY NOT NULL, img TEXT, title TEXT, ingredients TEXT, cooking TEXT, booked INTEGER )',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    };

    static getRecipes () {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM recipes',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createRecipe ({ img, title, ingredients, cooking, booked }) {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO recipes (img, title, ingredients, cooking, booked) VALUES ( ?, ?, ?, ?, ? )',
                    [ img, title, ingredients, cooking, booked ],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updateRecipe ({ id, img, title, ingredients, cooking, booked }) {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE recipes SET img = ?, title = ?, ingredients = ?, cooking = ?, booked=? WHERE id = ?',
                    [ img, title, ingredients, cooking, booked, id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static removeRecipe ( id ) {

        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM recipes WHERE id = ?',
                    [ id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
}