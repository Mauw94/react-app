import React from 'react';
import {connect} from "react-redux";
import mapDispatchToPropsTitle from '../common/title-dispatch-to-props';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

const style = {
    margin: '10px'
};

class LocatieAddPage extends React.Component {
    constructor() {
        super();
        this.state = {showMessage: false};
        this.state = {redirect: false}
    }

    render() {
        const message = (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <span>Locatie toegevoegd!</span>
            </div>
        );
        return (
            <div style={{marginTop: '50px'}}>
                <form onSubmit={this.save} style={{textAlign: 'center'}}>
                    <div className="form-group">
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="sample3" name={'naam'}/>
                                <label className="mdl-textfield__label">Naam</label>
                        </div>
                    </div>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">
                        Add new locatie
                    </button>
                    <button className="mdl-button mdl-js-button mdl-js-ripple-effect" style={style}><Link
                        style={{color: 'black'}}
                        to="/locaties">Back</Link>
                    </button>
                </form>

                {this.state.showMessage ? message : null}
                {this.state.redirect && (<Redirect to={'/locaties'}/>)}
            </div>
        );
    }

    save = (ev) => {
        ev.preventDefault();
        this.setState({redirect: true})
        const naam = ev.target['naam'].value;
        HttpService.addLocatie(naam).then(() => {
            this.props.addEntry({
                "naam": naam
            });
            this.setState({showMessage: true})
        });
        ev.target['naam'].value = "";
    }

    componentDidMount() {
        this.props.setTitle('Add Locatie');
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchToPropsTitle(dispatch, ownProps),
        addEntry: (entry) => {
            dispatch({type: 'ADD_LOCATIEENTRY', payload: entry});
        }
    }
}

export default connect(undefined, mapDispatchToProps)(LocatieAddPage)