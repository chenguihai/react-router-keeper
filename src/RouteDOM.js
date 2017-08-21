import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class RouteDOM extends Component {

    static propTypes = {
        locations: PropTypes.array
    }

    static contextTypes = {
        router: PropTypes.shape({history: PropTypes.object.isRequired})
    }

    componentWillMount() {
        const {history} = this.context.router
        this.unlisten = history.listen(() => {
            this.setState({locations: this.props.locations})
        })
    }

    render() {
        const {locations} = this.props;
        const {history} = this.context.router;
        let props = {
            locations,
            history
        };

        return (
            <section>
                {locations.map((item, index) => {
                    props = {
                        ...props,
                        isactive: item.isactive,
                        pathname: item.pathname,
                        match: item.match
                    }
                    return (
                        <div key={index}>{React.createElement(item.component, props)}</div>
                    )
                })}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {locations: state.router.locations}
}

RouteDOM = connect(mapStateToProps)(RouteDOM)

export default RouteDOM;