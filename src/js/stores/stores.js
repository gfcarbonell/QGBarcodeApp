import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const rootStore = createStore(
    compose(applyMiddleware(thunk)),
);

export default rootStore