import { LOGIN_CHANGE } from '../Constants/login';

export function changeUserLogin(isLoggedIn: any) {
return {
type: LOGIN_CHANGE,
payload: isLoggedIn
}
}