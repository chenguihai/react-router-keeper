const INIT_LOCATION = '@@router/INIT_LOCATION'
const CHANGE_LOCATION = '@@router/CHANGE_LOCATION'
const DELETE_LOCATION = '@@router/DELETE_LOCATION'
const ADD_LOCATION_COMPONENT = '@@router/ADD_LOCATION_COMPONENT'

export default function (state, action) {
    if (!state) {
        state = {
            locations: []
        }
    }

    switch (action.type) {
        case INIT_LOCATION:
            //初始化路由
            return {
                locations: [
                    {
                        pathname: action.locationItem.pathname,
                        isactive: true
                    }
                ]
            }
        case CHANGE_LOCATION:
            //切换路由
            let changeState = {
                ...state
            }
            const changAction = action.locationItem;
            const changActionParams = changAction.match ? changAction.match.params : "";

            changeState
                .locations
                .map((item, index) => {
                    if (item.keepParams && item.keepParams == changAction.keepParams) {
                        const keepParamVal = item.match.params[changAction.keepParams];
                        if (keepParamVal == changActionParams[changAction.keepParams]) {
                            item.isactive = true
                        } else {
                            item.isactive = false
                        }
                    } else if (item.pathname == changAction.pathname) {
                        item.isactive = true
                    } else {
                        item.isactive = false
                    }
                }) 
            return changeState
        case DELETE_LOCATION:
            //删除路由
            return {
                locations: [
                ...state.locations.slice(0, action.locationIndex),
                ...state.locations.slice(action.locationIndex + 1)
                ]
            }
        case ADD_LOCATION_COMPONENT:

            const addAction = action.locationItem;
            const addActionParams = addAction.match ? addAction.match.params : "";

            let locationIndex = -1

            let addState = {
                ...state,
                locations: state.locations.map((item, index) => {
                    if (item.keepParams && item.keepParams == addAction.keepParams) {
                        const keepParamVal = item.match.params[addAction.keepParams];
                        if (keepParamVal == addActionParams[addAction.keepParams]) {
                            locationIndex = index;
                            item.component = addAction.component;
                            item.match = addAction.match;
                            item.keepParams = addAction.keepParams;
                            item.isClose = addAction.isClose;
                            item.routeName = addAction.routeName;
                            item.pathname = addAction.pathname;
                        }
                    } else if (item.pathname == addAction.pathname) {
                        locationIndex = index;
                        item.component = addAction.component;
                        item.match = addAction.match;
                        item.keepParams = addAction.keepParams;
                        item.isClose = addAction.isClose;
                        item.routeName = addAction.routeName;
                    }
                    return item
                })
            }

            if (locationIndex < 0) {
                addState = {
                    ...state,
                    locations: [
                        ...state.locations, {
                            pathname: addAction.pathname,
                            component: addAction.component,
                            match: addAction.match,
                            keepParams: addAction.keepParams,
                            isClose: addAction.isClose,
                            routeName: addAction.routeName,
                            isactive: true
                        }
                    ]
                }
            }

            return addState
        default:
            return state
    }
}

export const initLocation = (locationItem) => {
    return {type: INIT_LOCATION, locationItem}
}

export const changeLocation = (locationItem) => {
    return {type: CHANGE_LOCATION, locationItem}
}

export const deleteLocation = (locationIndex) => {
    return {type: DELETE_LOCATION, locationIndex}
}

export const addLocationComponent = (locationItem) => {
    return {type: ADD_LOCATION_COMPONENT, locationItem}
}