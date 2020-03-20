/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import sidebarReducer from './SidebarReducer';
import authUserReducer from './AuthUserReducer';
import appReducer from './AppReducer';

const reducers = combineReducers({
  settings,
  sidebar: sidebarReducer,
  authUser: authUserReducer,
  reducerApp: appReducer
});


export default reducers;
