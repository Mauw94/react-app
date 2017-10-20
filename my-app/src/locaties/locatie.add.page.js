import React from 'react';
import {connect} from "react-redux";
import mapDispatchToPropsTitle from '../common/title-dispatch-to-props';
import TextField from 'material-ui/TextField';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';

class LocatieAddPage extends React.Component {
    constructor() {
        super();
        this.state = {showMessage: false};
    }

    render() {
        const message = (
            <div style={{margin: '10px'}}>
                <span>Entry toegevoegd!</span>
            </div>
        );
        return (
            <div style={{marginTop: '50px'}}>
                <form onSubmit={this.save}>
                    <TextField hintText="Naam" name="naam" type="text" style={{margin: '10px'}}/>
                    <button className="btn btn-default" type="submit">Add new locatie</button>
                </form>
                <button className="btn btn-primary" style={{margin: '10px'}}><Link style={{color: 'white'}}
                                                                                   to="/locaties">Back</Link></button>
                {this.state.showMessage ? message : null}
            </div>
        );
    }

    save = (ev) => {
        ev.preventDefault();
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