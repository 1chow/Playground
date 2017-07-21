import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.isLogin === nextProps.isLogin) {
				return false
			} else { return true }
	}
	render() {
		return (
		<header>
				<div data-sticky-container>
					<div className="title-bar" data-sticky data-options="marginTop:0;" style={{width:100+'%'}}>
						<div className="row">
							<NavLink exact to="/">
								<div className="title-bar-left nav-left">
									<h1><i className="fa fa-gavel fa-1x"></i> AUCT</h1>
									<div className="nav-toggle-btn"></div>
								</div>
							</NavLink>
							<NavLink exact to="/checkout-info">checkout-info</NavLink>
							<NavLink exact to="/checkout">checkout</NavLink>

							<div className="title-bar-right nav-right">
								<button onClick={ () => this.props.triggler("checkout")} className="profile-botton">
									<span className="has-tip bottom" tabIndex="2" title="Your Cart!">
										<i className="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
									</span>
								</button>
								<b className="alert-top-btn" id="b-cart">1</b>
								{ this.props.isLogin === true ?
								<button className="profile-botton" onClick={this.props.logout}>
									<span className="has-tip bottom" data-disable-hover="false">
										<img src="https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p160x160/10590625_870609506283335_1688425455264656623_n.jpg?oh=29b4ec66619473227bed4d94f03a55e4&oe=59A32BD3" alt=""></img>
									</span>
								</button> :
								<button className="button success" onClick={() => this.props.triggler("login")}>
									Join Now
								</button>
								}
							</div>
						</div>
					</div>
				</div>
			</header>
		)
	}
}

export default Header
