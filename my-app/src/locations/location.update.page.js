import React from 'react';
import HttpService from '../common/http-service';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

let fetched = false;


class LocatieUpdatePage extends React.Component {

    constructor() {
        super();
        this.state = {showMessage:false}
    }
    componentWillMount() {
        const id = this.props.match.params.id;
        if (!fetched) {
            HttpService.getLocatieById(id).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
            fetched = true;
        }
    }

    render() {
        const locatieEntry = this.props.locationEntry;
        fetched = false;
        const message = (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <span>Location updated.</span>
            </div>
        );
        return (
            <div style={{marginTop: '70px'}}>
                <form onSubmit={this.update} style={{textAlign: 'center'}}>
                    <div className={'form-group'}>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="sample3" name={'naam'}/>
                            <label className="mdl-textfield__label">{locatieEntry.naam}</label>
                        </div>
                    </div>
                    <div className={'form-group'}>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                type="submit" style={{margin: '15px'}}>
                            Update locatie
                        </button>
                        <Link to={'/locaties'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>Back
                            </button>
                        </Link>
                    </div>
                </form>
                {this.state.showMessage ? message : null}
            </div>
        );
    }

    update = (ev) => {
        ev.preventDefault();
        const naam = ev.target['naam'].value;
        const id = this.props.match.params.id;
        HttpService.updateLocatieById(id, naam).then(() => {
            this.props.updateLocatie({
                "id": id,
                "naam": naam
            });
            this.setState({showMessage: true})
        });
        ev.target['naam'].value = "";
    }

    componentDidMount() {
        this.props.setTitle('Update Location');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locationEntry: state.locationEntry
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchTitleToProps(dispatch, ownProps),
        setLocatie: (locatie) => {
            dispatch({type: 'SET_LOCATIE_ENTRY', payload: locatie})
        },
        updateLocatie: (updatedLocatie) => {
            dispatch({type: 'UPDATE_LOCATIE_ENTRY', payload: updatedLocatie})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocatieUpdatePage);