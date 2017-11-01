import React from 'react';
import mapDispatchToPropsTitle from '../common/title-dispatch-to-props';
import {connect} from 'react-redux';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';
import DatePicker from 'material-ui/DatePicker';

let fetched = false;

class LocatieStatusAdd extends React.Component {


    constructor() {
        super();
        this.state = {showMessage: false};
    }

    componentWillMount() {
        const locatieId = this.props.match.params.locatieid;
        if (!fetched) {
            HttpService.getLocatieById(locatieId).then(fetchedEntry => this.props.setLocatie(fetchedEntry));
            fetched = true;
        }
    }

    render() {
        const message = (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <span>Status toegevoegd</span>
            </div>
        );
        const locatie = this.props.locatieEntry;
        console.log(locatie);
        fetched = false;
        return (
            <div style={{marginTop: '50px'}}>
                <form onSubmit={this.save} style={{textAlign: 'center'}}>
                    <h4>Add status for: {locatie.naam}</h4>
                    <div className="form-group">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="sample3" name={'status'}/>
                            <label class="mdl-textfield__label" for="sample3">Status</label>
                        </div>
                    </div>
                    <div style={{margin: '20px'}}>
                        <DatePicker hintText="Datum" name="datum"
                                    required/>
                    </div>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">
                        Add status
                    </button>
                    <Link style={{color: 'black'}} to={'/locaties/details/' + this.props.match.params.locatieid}>
                        <button className="mdl-button mdl-js-button mdl-js-ripple-effect">Back
                        </button>
                    </Link>
                </form>
                {this.state.showMessage ? message : null}
            </div>
        );
    }

    save = (ev) => {
        ev.preventDefault();
        const locatieid = this.props.match.params.locatieid;
        const newStatus = ev.target['status'].value;
        const datum = ev.target['datum'].value;
        HttpService.addStatusMelding(locatieid, newStatus, datum).then(() => {
            this.props.addStatus({
                "locatieid": locatieid,
                "status": newStatus,
                "datum": datum,
            });
            this.setState({showMessage: true})
        });
        ev.target['status'].value = '';
    }

    componentDidMount() {
        this.props.setTitle('Status add')
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locatieEntry: state.locatieEntry,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchToPropsTitle(dispatch, ownProps),
        addStatus: (status) => {
            dispatch({type: 'ADD_STATUS_ENTRY', payload: status});
        },
        setLocatie: (locatie) => {
            dispatch({type: 'ADD_LOCATIE_ENTRY', payload: locatie});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatieStatusAdd)