import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import matchPath from './matchPath'
import {changeLocation, addLocationComponent} from './RouterRedux'

class Route extends Component {

    static propTypes = {
        path: PropTypes.string,
        exact: PropTypes.bool,
        strict: PropTypes.bool,
        component: PropTypes.func,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        location: PropTypes.object,
        retain: PropTypes.bool
    }

    static contextTypes = {
        router: PropTypes.shape({history: PropTypes.object.isRequired})
    }

    _handleAddLocationComponent() {
        const {children, component, path, keepParams, isClose, routeName} = this.props;
        const {history, route} = this.context.router;
        const pathObj = matchPath(history.location.pathname, {path})

        if (pathObj && history.location.pathname == pathObj.url) {

            let locationItem = {
                pathname: history.location.pathname,
                component: this.props.component,
                match: pathObj
            }

            if (keepParams && keepParams != "") {
                locationItem["keepParams"] = keepParams
            }

            debugger

            if (isClose != undefined) {
                locationItem["isClose"] = isClose
            }else{
                locationItem["isClose"] = true
            }

            locationItem["routeName"] = ((routeName && routeName != '') ? routeName : (pathObj.params.routeName ? pathObj.params.routeName : '...'))

            this
                .props
                .onAddLocationComponent(locationItem);
        }
    }

    componentWillMount() {
        this._handleAddLocationComponent();

        const {history} = this.context.router
        this.unlisten = history.listen(() => {
            this._handleAddLocationComponent();
        })
    }

    render() {
        return null
    }
}

const mapStateToProps = (state) => {
    return {locations: state.router.locations}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddLocationComponent: (locationItem) => {
            dispatch(addLocationComponent(locationItem))
        }
    }
}

Route = connect(mapStateToProps, mapDispatchToProps)(Route)

export default Route;