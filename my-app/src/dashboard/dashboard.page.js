import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapDispatchToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

const Title = () => {
    return (<div className="container-fluid" style={{marginTop: '80px', textAlign: 'center'}}>
            <h2 className="" style={{fontSize: '34px'}}>WP2 - ReactApp</h2>
        </div>
    );
}

class DashboardPage extends Component {
    render() {
        return (
            <div>
                <Title/>
                <form>
                    <div className={'form-group'} style={{textAlign: 'center', marginTop: '50px'}}>
                        <Link to={'/locaties'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-ripple-effect mdl-button--colored'}>LOCATIES</button>
                        </Link>
                        <Link to={'/problemen'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-ripple-effect mdl-button--colored'}>PROBLEMEN</button>
                        </Link>
                        <Link to={'/statussen'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-ripple-effect mdl-button--colored'}>STATUSSEN</button>
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