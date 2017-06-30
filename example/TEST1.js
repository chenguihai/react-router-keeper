import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TEST1 extends Component {

    static propTypes = {
        isactive: PropTypes.bool
    }

    render() {
        const {isactive} = this.props;

        const classes = (isactive
            ? "container"
            : "container d-none")

        return (
            <div className={classes}>
                <h1>TEST1</h1>
            </div>
        );
    }
}

export default TEST1;