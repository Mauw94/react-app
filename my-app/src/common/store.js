import { createStore } from 'redux';

import StoreCreator from '../store-creator';

const store = createStore(StoreCreator, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;