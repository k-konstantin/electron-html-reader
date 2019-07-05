const initialState = {
    isFetching: false,
    selectedId: 0,
    animations: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ANIMATIONS_SEARCH':
            return { ...state, isFetching: true };
        case 'ANIMATIONS_FIND':
            console.log(action.animations)
            return { ...state, animations: action.animations, isFetching: false, selectedId: 0 };
        case 'SELECT_ANIMATION': {
            const { selectedId } = action.payload;
            return { ...state, selectedId };

        }    
        case 'NEXT_ANIMATION': {
            const count = state.animations.length;
            let selectedId = state.selectedId + 1;
            if (selectedId >= count) {
                selectedId = 0
            }
            return { ...state, selectedId };
        }
        case 'PREV_ANIMATION': {
            const count = state.animations.length;
            let selectedId = state.selectedId - 1;
            if (selectedId < 0) {
                selectedId = count - 1;
            }
            return { ...state, selectedId };
        }
    }
    return state
}