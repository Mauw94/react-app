import React from 'react';
import { connect } from "react-redux";
import mapDispatchToPropsTitle from '../common/title-dispatch-to-props';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import HttpService from '../common/http-service';
import { Link } from 'react-router-dom';

class LocatieAddPage extends React.Component {
    constructor(){
        super();
        this.state = {showMessage : false};
    }
    render(){
        const message = (
            <div>
                <span>Entry toegevoegd, klik <Link to="/locaties">Hier</Link> om terug te gaan.</span>
            </div>
        );
        return (
            <div>
                <form onSubmit={this.save}>
                    <TextField hintText="Naam" name="naam" type="text"/>
                    <FlatButton label="Add new locatie" type="submit"/>
                </form>
                {this.state.showMessage ? message : null}
            </div>
        );
    }
    save = (ev) => {
        ev.preventDefault();
        const naam = ev.target['naam'].value;
        HttpService.addLocatie(naam).then(()=>{
            this.props.addEntry({
                "naam": naam
            });
            this.setState({showMessage:true})
        });
    }
    componentDidMount(){
        this.props.setTitle('Add Locatie');
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchToPropsTitle(dispatch, ownProps),
        addEntry: (entry) => {
            dispatch({type: 'ADD_LOCATIEENTRY', payload:entry});
        }
    }
}

export default connect (undefined, mapDispatchToProps)(LocatieAddPage)