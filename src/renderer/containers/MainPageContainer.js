import { connect } from 'react-redux';
import MainPage from '../components/MainPage';

import { selectAnimation, nextAnimation, prevAnimation, openFolder, revealInExplorer, takeScreenShot } from '../store/actions';

const MainPageContainer = connect(
    state => ({
        animations: state.animations,
        selectedId: state.selectedId,
        isFetching: state.isFetching,
    }),
    {
        selectAnimation,
        nextAnimation,
        prevAnimation,
        openFolder,
        revealInExplorer,
        takeScreenShot,
    }
)(MainPage);

export default MainPageContainer;
