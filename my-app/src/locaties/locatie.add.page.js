import React from 'react';
import {connect} from "react-redux";
import mapDispatchToPropsTitle from '../common/title-dispatch-to-props';
import TextField from 'material-ui/TextField';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';

const style = {
    margin: '10px'
};

class LocatieAddPage extends React.Component {
    constructor() {
        super();
        this.state = {showMessage: false};
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
                    <h3 style={{marginBottom: '50px'}}>Nieuwe locatie naam: </h3>
                    <div className="form-group">
                        <TextField hintText="Naam" name="naam" type="text" required style={style}/>
                    </div>
                    <button className="btn btn-default" type="submit">Add new locatie</button>
                    <button className="btn btn-primary" style={style}><Link style={{color: 'white'}}
                                                                                       to="/locaties">Back</Link>
                    </button>

                </form>

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