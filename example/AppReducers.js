import {combineReducers} from 'redux'
import {RouterRedux} from '../src'

import Main from './MainRedux';

const AppReducer = combineReducers({
    Main,
    router:RouterRedux
})

export default AppReducer;