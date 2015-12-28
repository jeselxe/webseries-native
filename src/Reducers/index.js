import { combineReducers } from 'redux';
import series from './series';
import modal from './modal';
import login from './login';

export default combineReducers({
    series,
    modal,
    login,
});
