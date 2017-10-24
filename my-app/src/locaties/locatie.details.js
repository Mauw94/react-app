import React from 'react';
import HttpService from '../common/http-service';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

class LocatiePageDetails extends React.Component{

    constructor(){
        super();
        this.state = {redirect:false};
    }

    componentWillMount(){
        const id = this.props.match.params.id;
        HttpService.getLocatieById(id).then(fetchedEntry => this.props.setLocatie(fetchedEntry));
    }

    render(){
        const locatieEntry = this.props.locatieEntry;
        return (

          <form>
              <div className={'form-group'} style={{textAlign: 'center'}}>
                  <h3>Details of locatie {locatieEntry.naam}</h3>
                  <p>Naam: {locatieEntry.naam}</p>
                  <p>Id: {locatieEntry.id}</p>
                  <Link to={'/locaties'}>
                      <button className={'mdl-button mdl-js-button'}>Back</button>
                  </Link>
                  dsafd
              </div>
          </form>
        );
    }

    componentDidMount(){
        this.props.setTitle('Locatie details');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locatieEntry: state.locatieEntry
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchTitleToProps(dispatch, ownProps),
        setLocatie: (locatie) => {
            dispatch({type: 'SET_LOCATIE_ENTRY', payload:locatie});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatiePageDetails)