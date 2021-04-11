import { LOGIN_CHANGE } from '../Constants/login';
const initialState = {
isLoggedIn: false
};
const loginReducer = (state = initialState, action: { type: any; payload: any; }) => {
switch(action.type) {
case LOGIN_CHANGE:
return {
...state,
isLoggedIn:action.payload
};
default:
return state;
}
}
export default loginReducer;