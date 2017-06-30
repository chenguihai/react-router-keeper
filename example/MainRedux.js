const CHANGE_THEMECOLOR = '@@main/CHANGE_THEMECOLOR'

export default function (state, action) {
    if (!state) {
        state = {
            themeColor: "blue"
        }
    }
    switch (action.type) {
        case CHANGE_THEMECOLOR:
            return {
                ...state,
                themeColor: action.themeColor
            }
        default:
            return state
    }
}

export const changeThemeColor = (themeColor) => {
    return {type: CHANGE_THEMECOLOR, themeColor}
}