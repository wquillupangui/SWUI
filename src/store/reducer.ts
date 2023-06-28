import { combineReducers } from 'redux';

import popularReducer from './reducers/popularSlice';
import entityReducer from './reducers/entitySlice';

export default combineReducers({
	popular: popularReducer,
	entities: entityReducer
});

