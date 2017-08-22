const INIT_LOCATION = '@@router/INIT_LOCATION'
const CHANGE_LOCATION = '@@router/CHANGE_LOCATION'
const DELETE_LOCATION = '@@router/DELETE_LOCATION'
const ADD_LOCATION = '@@router/ADD_LOCATION'

let locationItem, keepParam, urlStack, urlStackIndex = -1, locations;

export default function (state, action) {
    if (!state) {
        state = {
            locations: [],
            urlStack:[]
        }
    }

    switch (action.type) {
        case INIT_LOCATION:
            //初始化
            return {
                locations: [
                    {
                        pathname: action.locationItem.pathname,
                        isactive: true
                    }
                ],
                urlStack:[]
            }
        case CHANGE_LOCATION:
            //切换
            locationItem = action.locationItem;
            keepParam = locationItem.keepParam;
            urlStack = [...state.urlStack];
            locations = [];

            //修改路由激活状态
            state.locations.map((item, index) => {
                const itemParams = item.match ? item.match.params : '';
                const actionParam = locationItem.match ? locationItem.match.params : '';
                let newItem = {...item};
                
                if (item.keepParam && item.keepParam == locationItem.keepParam) {
                    if (itemParams[keepParam] == actionParam[keepParam]) {
                        newItem.isactive = true;
                    }else{
                        newItem.isactive = false;
                    }
                }else if(item.pathname == locationItem.pathname){
                    newItem.isactive = true;
                }else{
                    newItem.isactive = false;
                }
                locations.push(newItem);
            })

            //修改路由序列
            state.urlStack.map((urlItem, index) => {
                if(urlItem == locationItem.pathname){
                    urlStackIndex = index;
                }
            })

			if(urlStackIndex >= 0){
                urlStack.splice(urlStackIndex,1);
                urlStack.push(locationItem.pathname);
            }
            
            return {
                locations: locations,
                urlStack: urlStack
            }
        case DELETE_LOCATION:
            //删除
            locationItem = state.locations[action.locationIndex];
            urlStack = [...state.urlStack];
            locations = [
                ...state.locations.slice(0, action.locationIndex),
                ...state.locations.slice(action.locationIndex + 1)
            ];

            //修改路由序列
            state.urlStack.map((urlItem, index) => {
                if(urlItem == locationItem.pathname){
                    urlStackIndex = index;
                }
            })

			if(urlStackIndex >= 0){
                urlStack.splice(urlStackIndex,1);
            }

            //激活前一个页面
            locations.map((item, index) => {
                if(item.pathname == urlStack[urlStack.length - 1]){
                    item.isactive = true;
                }else{
                    item.isactive = false;
                }
            })

            return {
                locations: locations,
                urlStack: urlStack
            }
        case ADD_LOCATION:
            //增加
            locationItem = action.locationItem;
            keepParam = locationItem.keepParam;
            urlStack = [];
            locations = [];
            let haslocationItem = false;
            state.locations.map((item, index) => {
                const itemParams = item.match ? item.match.params : '';
                const actionParam = locationItem.match ? locationItem.match.params : '';
                let newItem = {...item};

                if (item.keepParam && item.keepParam == locationItem.keepParam) {
                    if (itemParams[keepParam] == actionParam[keepParam]) {
                        newItem.pathname = locationItem.pathname;
                    }
                } 
                
                if ((item.keepParam && item.keepParam == locationItem.keepParam) || item.pathname == locationItem.pathname) {
                    newItem.component = locationItem.component;
                    newItem.match = locationItem.match;
                    newItem.keepParam = locationItem.keepParam;
                    newItem.isClose = locationItem.isClose;
                    newItem.routeName = locationItem.routeName;
                    haslocationItem = true;
                }
                locations.push(newItem);
                urlStack.push(newItem.pathname);
            })

            if (!haslocationItem) {
                locations.push({
                    pathname: locationItem.pathname,
                    component: locationItem.component,
                    match: locationItem.match,
                    keepParam: locationItem.keepParam,
                    isClose: locationItem.isClose,
                    routeName: locationItem.routeName,
                    isactive: true
                });
                urlStack.push(locationItem.pathname)
            }

            return {
                locations: locations,
                urlStack: urlStack
            }
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

export const addLocation = (locationItem) => {
    return {type: ADD_LOCATION, locationItem}
}