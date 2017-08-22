import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import matchPath from './matchPath'
import {initLocation, changeLocation} from './RouterRedux'

class Router extends Component {
    static propTypes = {
        basename: PropTypes.string,
        locations: PropTypes.array,
        history: PropTypes.object.isRequired,
        children: PropTypes.node
    }

    static contextTypes = {
        router: PropTypes.object
    }

    static childContextTypes = {
        router: PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            router: {
                ...this.context.router,
                history: this.props.history
            }
        }
    }

    _handleInitLocation() {
        const {history, locations} = this.props
        const locationItem = {
            pathname: history.location.pathname
        }

        this
            .props
            .onInitLocation(locationItem);
    }

    _handleChangeLocation() {
        const {history, locations} = this.props
        let locationItem = {
            pathname: history.location.pathname
        }
        locations.map((item, index) => {
            let pathObj = matchPath(history.location.pathname, item.match.path);
            if (pathObj && pathObj != null) {
                locationItem.match = pathObj;
                locationItem.keepParam = item.keepParam;
            }
        })
        this.props.onChangeLocation(locationItem);
    }

    componentWillMount() {
        const {history, locations} = this.props
        if (locations.length <= 0) {
            this._handleInitLocation();
        }
        this.unlisten = history.listen(() => {
            this._handleChangeLocation();
        })
    }

    render() {
        const {children} = this.props
        return children
            ? React
                .Children
                .only(children)
            : null
    }
}

const mapStateToProps = (state) => {
    return {locations: state.router.locations}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitLocation: (locationItem) => {
            dispatch(initLocation(locationItem))
        },
        onChangeLocation: (locationItem) => {
            dispatch(changeLocation(locationItem))
        }
    }
}

Router = connect(mapStateToProps, mapDispatchToProps)(Router)

export default Router;