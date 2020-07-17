import { connect } from 'react-redux';
import MainPage from '../components/MainPage';

import { selectAnimation, nextAnimation, prevAnimation, openFolder, revealInExplorer, takeScreenShot, stopScreenShot } from '../store/actions';
import { isTakingSreenshots } from '../store/selectors';

const MainPageContainer = connect(
    state => ({
        animations: state.animations,
        selectedId: state.selectedId,
        isFetching: state.isFetching,
        isTakingScreenshots: isTakingSreenshots(state),
    }),
    {
        selectAnimation,
        nextAnimation,
        prevAnimation,
        openFolder,
        revealInExplorer,
        takeScreenShot,
        stopScreenShot,
    }
)(MainPage);

export default MainPageContainer;
