export const selectAnimation = animationId => ({ type: 'SELECT_ANIMATION', payload: { selectedId: animationId } });
export const nextAnimation = () => ({ type: 'NEXT_ANIMATION' });
export const prevAnimation = () => ({ type: 'PREV_ANIMATION' });
export const openFolder = () => ({ type: 'OPEN_FOLDER', global: true });
export const revealInExplorer = pathToFile => ({ type: 'REVEAL_IN_EXPLORER', global: true, payload: { fileURI: pathToFile } });
export const takeScreenShot = () => ({type: 'START_TAKING_SCREENSHOT'});
export const stopScreenShot = () => ({type: 'STOP_TAKING_SCREENSHOT'});
export const saveBase64ToImageFile = (data, fileName) => ({type: 'SAVE_BASE64_TO_IMAGE', global: true, payload: {data, fileName}})
