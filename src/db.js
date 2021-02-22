import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('textpadphoto.db')

export class DB {
    static init () {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS textpadphoto (id INTEGER PRIMARY KEY NOT NULL, img TEXT, title TEXT, text TEXT, booked INTEGER )',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    };

    static getItems () {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM textpadphoto',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createItems ({ img, title, text, booked }) {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO textpadphoto (img, title, text, booked) VALUES ( ?, ?, ?, ? )',
                    [ img, title, text, booked ],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updateItems ({ id, img, title, text, booked }) {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE textpadphoto SET img = ?, title = ?, text = ?, booked=? WHERE id = ?',
                    [ img, title, text, booked, id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }

    static removeItems ( id ) {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM textpadphoto WHERE id = ?',
                    [ id ],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
}