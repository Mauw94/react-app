import { createStore } from 'redux';
import StoreCreator from '../store-creator';

const {applyMiddleware } = require('redux');
const middleware = [require('redux-immutable-state-invariant').default()];


const store = createStore(StoreCreator, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware));
export default store;