import { ipcMain, dialog, BrowserWindow } from 'electron';
import { dispatchToWindow } from 'redux-electron-global-dispatch';
import _ from 'lodash';

import getAnimations from './getAnimations';

ipcMain.on('@@GLOBAL_REDUX_ACTION', (event, action) => {
    const currentWindow = BrowserWindow.getFocusedWindow();

    console.log('BUTTON_PRESSED IN RENDERER', action);
    if (action.type === 'OPEN_FOLDER') {
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
    }
});
