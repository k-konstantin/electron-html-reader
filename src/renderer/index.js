import React from 'react';
import { render } from 'react-dom';

import App from './App';

const appElement = document.createElement('div');
document.body.append(appElement);

render(<App />, appElement);
