export const getSelectedResourceId = (state) => state.selectedId
export const getAnimations = (state) => state.animations
export const isTakingSreenshots = (state) => state.isTakingScreenshots
export const getFileNameFromSrc = (src) => {
    const fileName = src.slice(src.lastIndexOf('\\') + 1)
    return fileName.slice(0, fileName.lastIndexOf('.'))
}