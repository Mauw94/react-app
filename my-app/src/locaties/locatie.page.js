import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../common/title-dispatch-to-props';

class LocatiePage extends Component {
    render() {
        return (
            <h2>Locatie page</h2>
        )
    }

    componentDidMount() {
        this.props.setTitle('Locaties');
    }
}

export default connect(undefined, mapDispatchToProps)(LocatiePage)