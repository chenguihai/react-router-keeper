import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import matchPath from './matchPath'
import {changeLocation, addLocation} from './RouterRedux'

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

    _handleAddLocation() {
        const {children, component, path, keepParam, isClose, routeName} = this.props;
        const {history, route} = this.context.router;
        const pathObj = matchPath(history.location.pathname, {path})

        if (pathObj && history.location.pathname == pathObj.url) {

            let locationItem = {
                pathname: history.location.pathname,
                component: this.props.component,
                match: pathObj
            }

            if (keepParam && keepParam != "") {
                locationItem["keepParam"] = keepParam
            }

            if (isClose != undefined) {
                locationItem["isClose"] = isClose
            }else{
                locationItem["isClose"] = true
            }

            locationItem["routeName"] = ((routeName && routeName != '') ? routeName : (pathObj.params.routeName ? pathObj.params.routeName : '...'))

            this
                .props
                .onAddLocation(locationItem);
        }
    }

    componentWillMount() {
        this._handleAddLocation();

        const {history} = this.context.router
        this.unlisten = history.listen(() => {
            this._handleAddLocation();
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
        onAddLocation: (locationItem) => {
            dispatch(addLocation(locationItem))
        }
    }
}

Route = connect(mapStateToProps, mapDispatchToProps)(Route)

export default Route;