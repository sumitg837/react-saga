import {createStore, applyMiddleware, combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import user from './user-reducer';
import model from './model-reducer';
import rootSaga from '../_sagas';


// Build the middleware

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
	user: user,
	model: model,
  	form: formReducer
})

export const store = createStore(
	rootReducer,
	applyMiddleware(loggerMiddleware, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);


