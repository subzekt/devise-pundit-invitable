import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class UsersSearchForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    var query =  event.target.value;
    this.handleSearch(query);
  };

  resetAll = () => {
    this.handleSearch('');
  }
  handleSearch =(query) =>{
    this.setState({
      value: query
    });
    if (query.length > 3 || query == '') {
      var self = this;
      self.props.handleSearch(query);
    }
  }

  render() {
    var self= this;
    return (
      <div>
        <TextField
          hintText="Type a search phrase..." value={this.state.value}
          onChange={this.handleChange} style={{paddingLeft: 10}}
        />
        <RaisedButton
          label="Reset"
          secondary={true}
          style={{margin: 6, marginLeft: 20}}
          onTouchTap={ self.resetAll }
        />

      </div>
    )
  }
}