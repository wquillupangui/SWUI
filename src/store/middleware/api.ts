import axios, { AxiosRequestConfig } from 'axios';
import { Middleware } from 'redux';
import * as actions from '../api';

const api: Middleware =
	({ dispatch, getState }) =>
		(next) =>
			async (action) => {
				if (action.type !== actions.apiCallBegan.type) return next(action);

				const { url, method, data, onStart, onSuccess, onError } = action.payload;
				

				if (onStart) dispatch({ type: onStart });

				next(action);

				try {
					const config = {
						url,
						method,
						data
					} as AxiosRequestConfig<any>;

					const response = await axios.request(config);

					dispatch(actions.apiCallSuccess(response.data));

					if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
				} catch (error: any) {

					dispatch(actions.apiCallFailed(error.message));

					if (onError) dispatch({ type: onError, payload: error.message });
				}
			};

export default api;
