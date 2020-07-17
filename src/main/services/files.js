import { app } from 'electron';
import fs from 'fs'
import path from 'path'

export const saveImageToAppFolder = (data, name) => new Promise((resolve, reject) => {
    //var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
    const src = path.join(app.getAppPath(), `${name}.jpeg`);

    fs.writeFile(src, data, function(err) {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    });
})
