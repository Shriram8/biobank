import { createStore, combineReducers } from 'redux';
import loginReducer from '../Reducer/loginReducer';
const rootReducer = combineReducers(
{ isLoggedIn: loginReducer }
);
const ConfigureStore = () => {
return createStore(rootReducer);
}
export default ConfigureStore;