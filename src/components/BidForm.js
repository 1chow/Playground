import React, { Component } from 'react'
import { firebaseAuth } from '../helpers/firebase'

class bidForm extends Component {

	state = {
		validates:[],
		current: ''
	}

	componentDidUpdate(prevProps, prevState) {
		this.state.validates !== prevState.validates &&
		this.Validation(this.props.item,this.props.params,this.state.current,this.props.open,this.state.validates.endTime,this.state.validates.isActive,this.props.newcurrent)
	}

    Validation = (oldItem,itemId,current,open,endTime,life,validatecurrent) => {
		var user = firebaseAuth().currentUser
		if (user) {
			let userId = user.uid
			let postBid = "https://us-central1-auctkmutt.cloudfunctions.net/bidOrder?itemId="+itemId+"&bid="+current+"&uId="+userId
			fetch(postBid)
			.then( response => {
				return response.json();
			  })
			.then( data => {
				this.props.recieve()
				this.bid.value = ''
				switch(data[0]) {
					case 'win':
						open('alert','good','Win','fa-check-circle')
						break
					case 'lost':
						open('alert','bad','Lost','fa-thumbs-down')
						break
					case 'lessThanOpenBid':
						open('alert','bad','Less Than Open Bid','fa-thumbs-down')
						break
					default:
						open('alert','bad',data[0],'fa-thumbs-down')
						break
				}
			  })
			.catch( err => err && open('alert','bad','Unfortunately Bad Request'),'fa-thumbs-down')
		} else open('alert','bad','Please LogIn','fa-thumbs-down')
	}

	isBidForm = (bid,open) => {
		if(bid.value.length >= 10 || bid.value <= 0 || bid.value === 'e' || bid.value%Math.floor(bid.value) !== 0) {
			this.props.recieve()
			this.bid.value = ''
			open('alert','bad','Enter a valid Prize','fa-thumbs-down')
		}
		else {
			this.setState({current: this.bid.value})
			let getCurrent = "https://us-central1-auctkmutt.cloudfunctions.net/getCurrent?itemId="+this.props.item._id
			fetch(getCurrent)
				.then( res => res.json())
				.then( json => this.setState({validates: json}))
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.waiting()
		this.isBidForm(this.bid,this.props.open)
	}


    render() {
        return  (
			<form className="auct-form" onSubmit={this.handleSubmit}>
				<label>
					<div className="input-group">
						<span className="input-group-label">฿</span>
						<input ref={ bid => this.bid = bid} className="input-group-field auct-form-input" id="NumberInput" type="number" required pattern="number"/>
					</div>
				</label>
				{
					this.props.wait === false ? (
						<button className="button" type="submit" value="Submit">Bid</button>
					) : (
						<button className="button gray"><img src={require("../images/Rolling.gif")} alt="Loading"></img></button>
					)
				}
			</form>
        )
    }
}

export default bidForm
