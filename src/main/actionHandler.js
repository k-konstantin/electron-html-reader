import { ipcMain, dialog, BrowserWindow, shell, app } from 'electron';
import { dispatchToWindow } from 'redux-electron-global-dispatch';
import _ from 'lodash';

import getAnimations from './getAnimations';
import {saveImageToAppFolder} from './services/files'

ipcMain.on('@@GLOBAL_REDUX_ACTION', (event, action) => {
    const currentWindow = BrowserWindow.getFocusedWindow();

    const { type } = action;

    if (type === 'OPEN_FOLDER') {
        dialog.showOpenDialog(
            {
                properties: ['openDirectory'],
            },
            folders => {
                if (folders && folders.length > 0) {
                    dispatchToWindow(currentWindow, { type: 'ANIMATIONS_SEARCH' });
                    const animations = getAnimations(folders[0]);
                    const sortedAnimations = _.sortBy(animations);
                    dispatchToWindow(currentWindow, { type: 'ANIMATIONS_FIND', animations: sortedAnimations });
                }
            }
        );
    } else if (type === 'REVEAL_IN_EXPLORER') {
        const {
            payload: { fileURI },
        } = action;
        shell.showItemInFolder(fileURI);
    } else if (type === 'SAVE_BASE64_TO_IMAGE') {
        const {
            payload: { data, fileName },
        } = action;

        saveImageToAppFolder(data, fileName).then(() => {
            console.log('Image Saved')
        }).catch((err) => {
            console.log('Image Save Failed')
            console.log(err);
        })
    }
});
