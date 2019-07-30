import { ipcMain, dialog, BrowserWindow, shell } from 'electron';
import { dispatchToWindow } from 'redux-electron-global-dispatch';
import _ from 'lodash';

import getAnimations from './getAnimations';

ipcMain.on('@@GLOBAL_REDUX_ACTION', (event, action) => {
    const currentWindow = BrowserWindow.getFocusedWindow();

    console.log('BUTTON_PRESSED IN RENDERER', action);
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
    }
});
