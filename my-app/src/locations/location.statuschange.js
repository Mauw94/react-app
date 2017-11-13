import React from 'react';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';

let fetched = false;

class LocatiePageStatus extends React.Component {

    constructor() {
        super();
        this.state = {showMessage: false};
    }

    componentWillMount() {
        const locatieId = this.props.match.params.locatieid;
        if (!fetched) {
            HttpService.getStatusByLocatie(locatieId).then(fetchedEntry => this.props.setStatus(fetchedEntry));
            fetched = true;
        }
    }

    render() {
        const message = (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <span>Status gewijzigd</span>
            </div>
        );
        fetched = false;
        return (
            <div style={{marginTop: '50px'}}>
                <form onSubmit={this.save} style={{textAlign: 'center'}}>
                    <div className="form-group">
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="sample3" name={'status'}/>
                            <label class="mdl-textfield__label" for="sample3">Status</label>
                        </div>
                    </div>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">
                        Update status
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
        const newStatus = ev.target['status'].value;
        HttpService.updateStatusMelding(this.props.match.params.locatieid, this.props.match.params.statusid, newStatus).then(() => {
            this.props.updateStatus({
                "status": newStatus
            });
            this.setState({showMessage: true})
        });
        ev.target['status'].value = '';
    }

    componentDidMount() {
        this.props.setTitle('Status Change')
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        statusEntry: state.statusEntry,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchTitleToProps(dispatch, ownProps),
        setStatus: (statusMelding) => {
            dispatch({type: 'SET_STATUSMELDING_ENTRY', payload: statusMelding});
        },
        updateStatus: (status) => {
            dispatch({type: 'UPDATE_STATUS_ENTRY', payload: status});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatiePageStatus)
