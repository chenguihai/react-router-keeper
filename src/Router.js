import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {changeLocation} from './RouterRedux'

class Router extends Component {
    static propTypes = {
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

    _handleChangeLocation(){
        const {history, locations} = this.props
        const locationItem = {
            pathname: history.location.pathname
        }
        this
            .props
            .onChangeLocation(locationItem);
    }

    componentWillMount() {
        const {history, locations} = this.props
        if(locations.length <= 0){
            this._handleChangeLocation();
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
        onChangeLocation: (locationItem) => {
            dispatch(changeLocation(locationItem))
        }
    }
}

Router = connect(mapStateToProps, mapDispatchToProps)(Router)

export default Router;