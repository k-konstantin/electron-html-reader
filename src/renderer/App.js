import React from 'react';
import { Provider } from 'react-redux';
import MainPageContainer from './containers/MainPageContainer';

import configureStore from './store/configureStore';
import './css/main.sass';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <MainPageContainer />
    </Provider>
);

export default App;
