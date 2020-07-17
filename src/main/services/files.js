import { app } from 'electron';
import fs from 'fs'
import path from 'path'

export const saveImageToAppFolder = (data, name) => new Promise((resolve, reject) => {
    //var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
    const dir = path.join(app.getPath('downloads'), 'examen-media-screenshots');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const src = path.join(dir, `${name}.jpeg`);

    fs.writeFile(src, data, function(err) {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    });
})
