const INIT_LOCATION = '@@router/INIT_LOCATION'
const CHANGE_LOCATION = '@@router/CHANGE_LOCATION'
const ADD_LOCATION_COMPONENT = '@@router/ADD_LOCATION_COMPONENT'

export default function (state, action) {
    if (!state) {
        state = {
            locations: []
        }
    }

    switch (action.type) {
        case INIT_LOCATION:
            return {
                locations: [
                    {
                        pathname: action.locationItem.pathname,
                        isactive: true
                    }
                ]
            }
        case CHANGE_LOCATION:
            let changeState = {
                ...state
            }
            const changAction = action.locationItem;
            const changActionParams = changAction.match.params;

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
        case ADD_LOCATION_COMPONENT:

            let addState = {
                ...state
            }

            const addAction = action.locationItem;
            const addActionParams = addAction.match.params;

            let locationIndex = -1

            addState
                .locations
                .map((item, index) => {
                    if (item.keepParams && item.keepParams == addAction.keepParams) {
                        const keepParamVal = item.match.params[addAction.keepParams];
                        if (keepParamVal == addActionParams[addAction.keepParams]) {
                            locationIndex = index;
                            item.component = addAction.component;
                            item.match = addAction.match;
                            item.keepParams = addAction.keepParams;
                            item.pathname = addAction.pathname;
                        }
                    } else if (item.pathname == addAction.pathname) {
                        locationIndex = index;
                        item.component = addAction.component;
                        item.match = addAction.match;
                        item.keepParams = addAction.keepParams;
                    }
                })
                
            if (locationIndex < 0) {
                addState = {
                    locations: [
                        ...state.locations, {
                            pathname: addAction.pathname,
                            component: addAction.component,
                            match: addAction.match,
                            keepParams: addAction.keepParams,
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

export const addLocationComponent = (locationItem) => {
    return {type: ADD_LOCATION_COMPONENT, locationItem}
}