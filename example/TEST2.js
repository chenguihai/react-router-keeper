import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TEST2 extends Component {

    static propTypes = {
        isactive: PropTypes.bool
    }

    render() {

        const {isactive, match} = this.props;

        const classes = (isactive
            ? "container"
            : "container d-none")

        return (
            <div className={classes}>
                <h1>TEST2</h1>
                <h3>Params：{match.params.params}</h3>
            </div>
        );
    }
}

export default TEST2;