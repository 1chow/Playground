import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as firebase from 'firebase'
import Additem from './AddItem'

class ItemsL extends Component {
  constructor () {
    super();
    this.state = {
      items: [],
      activeKey: null,
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
      })
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

  handleEdit = index => {
    this.state.activeKey === null ? (
      this.setState({activeKey:index})
    ) : (
      this.setState({activeKey:null})
    )
  }

  render() {
    return this.state.items ? (
      <div className="row">
          <div className="small-12 columns">
              <h1>Selling Items</h1>
              <p>Manage your products.</p>
              <div className="hr-text-center"><hr/></div>
          </div>
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
                    <td>Edit</td>
                </tr>
                {this.state.items.map((item,i) => {
                    return ([
                      <tr key={i}>
                          <td><i className={"fa fa-check-circle-o fa-2x" }></i></td>
                          <td>{item.key}</td>
                          <td className="show-for-large">{item.name}</td>
                          <td className="show-for-large">{item.catagory}</td>
                          <td className="show-for-large">{this.props.convertTimeM(item.bid.startTime)}</td>
                          <td className="show-for-large">{this.props.convertTimeM(item.bid.endTime)}</td>
                          <td><button onClick={() => this.removeItem(item.key)} ><i className="fa fa-trash"></i></button></td>
                          <td><button onClick={() => this.handleEdit(i)} ><i className="fa fa-edit"></i></button></td>
                      </tr>,
                      <tr className={"admin-iteml-editable "+(this.state.activeKey === i ? null : 'none')}>
                        <td colSpan="8">
                        {this.state.activeKey === i &&
                          <Additem 
                            triggler={this.props.triggler}
                            name={item.name}
                            desc={item.desc.fullDesc}
                            firstBid={item.bid.openBid}
                            bidStep={item.bid.bidStep}
                            timeStart={item.bid.startTime}
                            timeEnd={item.bid.endTime}
                            catagory={item.catagory}
                            image={item.img_}
                          />
                        }
                        </td>
                      </tr>
                    ])
                    })
                  }
                </tbody>
              </table>
            </div>
       </div>
    ) : <div className="row">
        <div className="small-12 columns">
                  <h1>Selling Items</h1>
                  <p>Manage your products.</p>
                  <div className="hr-text-center"><hr/></div>
        </div>
        <div className="page-404-chart page-404-container fade-animate">
          <div className="page-404">
            <p className="quote">Your auction history was empty list !!</p>
            <Link to="/" onClick={this.props.close} className="button success">Just Auction</Link>
          </div>
        </div>
      </div>
  }
}

 
export default ItemsL