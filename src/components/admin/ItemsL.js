import React, { Component } from 'react'
import * as firebase from 'firebase'


class ItemL extends Component {
  render(){
    return (
        
          <tr>
              <td><i className={"fa fa-check-circle-o fa-2x" }></i></td>
              <td>{this.props.key_}</td>
              <td className="show-for-large">{this.props.name}</td>
              <td className="show-for-large">{this.props.catagory}</td>
              <td className="show-for-large">Time</td>
              <td className="show-for-large">Time</td>
              <td><button onClick={()=> this.props.hell(this.props.dbkey)} ><i className="fa fa-trash"></i></button></td>
          </tr>
        
    );
  }
}

class ItemsL extends Component {
  constructor () {
    super();
    this.state = {
      items: [],
    };
    this.dbItems = firebase.database().ref().child('items');
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.dbItems.on('value', dataSnapshot => {
      let items = [];
        dataSnapshot.forEach( childSnapshot => {
        let category = childSnapshot.val();
        category['key'] = childSnapshot.key;
        items.push(category);
      });

      this.setState({
        items: items
      });
    });
  }

  componentWillUnmount() {
    this.dbItems.off();
  }

  removeItem(key){
    if (window.confirm("Do you want to remove this?") === true) {
      this.dbItems.child(key).remove();
    } 
  }

  render() {
    return (
      <div className="row">
          <div className="row auct-from-warp admin-table">
              <table className="hover">
                <tbody>
                <tr>
                    <td width="40"></td>
                    <td width="210">ID</td>
                    <td className="show-for-large" width="210">Name</td>
                    <td className="show-for-large" width="150">Categories</td>
                    <td className="show-for-large" width="150">Start</td>
                    <td className="show-for-large" width="150">End</td>
                    <td>Delete</td>
                </tr>
                {this.state.items.map((items,i) => {
                  return ( 
                    <ItemL key={items['key']} dbkey={items['key']} hell={this.removeItem} {...items} />
                    );})}
                </tbody>
              </table>
            </div>
       </div>
    );
  }
}

 
export default ItemsL