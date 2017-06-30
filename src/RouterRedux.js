const CHANGE_LOCATION = '@@router/CHANGE_LOCATION'
const ADD_LOCATION_COMPONENT = '@@router/ADD_LOCATION_COMPONENT'

export default function (state, action) {
    if (!state) {
        state = {
            locations: []
        }
    }

    switch (action.type) {
        case CHANGE_LOCATION:
            let locationIndex = -1
            state.locations.map(function(item,index,input) {
                if (item.pathname == action.locationItem.pathname) {
                    locationIndex = index
                }
            })

            let newState = { 
                ...state,
                locations: locationIndex < 0
                    ? [
                        ...state.locations, {
                            pathname: action.locationItem.pathname
                        }

                    ]
                    : state.locations
            }
            newState.locations.map(function(item,index,input) {
                if (item.pathname == action.locationItem.pathname) {
                    item.isactive = true
                }else{
                    item.isactive = false
                }
            })
            return newState
        case ADD_LOCATION_COMPONENT:
            state.locations.map(function(item,index,input) {
                if (item.pathname == action.locationItem.pathname) {
                    locationIndex = index
                    state.locations[index].component = action.locationItem.component,
                    state.locations[index].match = action.locationItem.match
                }
            })
            return state
        default:
            return state
    }
}

export const changeLocation = (locationItem) => {
    return {type: CHANGE_LOCATION, locationItem}
}

export const addLocationComponent = (locationItem) => {
    return {type: ADD_LOCATION_COMPONENT, locationItem}
}