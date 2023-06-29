import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from '../src/store/store';
import { BrowserRouter } from 'react-router-dom';

type TestParams = Parameters<typeof render>

const renderApp = (ui: TestParams[0]) => {
	const store = configureStore();

	return render(
		<Provider store={store}>
			<BrowserRouter>
				{ui}
			</BrowserRouter>
		</Provider>,
	);
};

export default renderApp
