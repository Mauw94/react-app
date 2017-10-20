import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../common/title-dispatch-to-props';

const Title = () => {
    return (<div className="container-fluid" style={{marginTop: '80px', textAlign: 'center'}}>
            <h2 className="label label-default" style={{fontSize: '34px'}}>WP2 - ReactApp</h2>
        </div>
    );
}

const InfoText = () => {
    return (
        <div style={{textAlign: 'center', marginTop:'15px'}}>
            <p className="label label-default">Click on the side to choose what you want to do.</p>
        </div>
    );
}

class DashboardPage extends Component {
    render() {
        return (
            <div>
                <Title/>
                <InfoText/>
            </div>

        )
    }

    componentDidMount() {
        this.props.setTitle('Dashboard');
    }
}

export default connect(undefined, mapDispatchToProps)(DashboardPage)