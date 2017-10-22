import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

const Title = () => {
    return (<div className="container-fluid" style={{marginTop: '80px', textAlign: 'center'}}>
            <h2 className="label label-info" style={{fontSize: '34px'}}>WP2 - ReactApp</h2>
        </div>
    );
}

const InfoText = () => {
    return (
        <div style={{textAlign: 'center', marginTop: '15px'}}>
            <p className="label label-info">Click on the side drawer to choose what you want to do.</p>
        </div>
    );
}

class DashboardPage extends Component {
    render() {
        return (
            <div>
                <Title/>
                <InfoText/>
                <form>
                    <div className={'form-group'} style={{textAlign: 'center', marginTop: '50px'}}>
                        <Link to={'/locaties'}>
                            <button className={'btn btn-default'}>LOCATIES</button>
                        </Link>
                        <Link to={'/problemen'}>
                            <button className={'btn btn-default'}>PROBLEMEN</button>
                        </Link>
                    </div>
                </form>
            </div>

        )
    }

    componentDidMount() {
        this.props.setTitle('Dashboard');
    }
}

export default connect(undefined, mapDispatchToProps)(DashboardPage)