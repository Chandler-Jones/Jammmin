import React, { Component } from 'react';

import "./Track.css";

class Track extends Component {
	constructor(props){
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}

	renderAction() {
		return this.props.isRemoval ?
				<button className="Track-action" onClick={this.removeTrack}>-</button> :
				<button className="Track-action" onClick={this.addTrack}>+</button>
		// if(this.props.isRemoval) {
		// 	return <button className={ "Track-action" }>-</button>;
		// } else {
		// 	return <button className={ "Track-action" }>+</button>;
		// }
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	render () {
		return (
			<div className="Track">
				<div className="track-cover-art">
					<img src={this.props.track.coverArt} height="48" width="48" alt="Album Cover Art" />
				</div>
				<div className="Track-information">
					<h3>{this.props.track.name}</h3>
					<p>{this.props.track.artist} | {this.props.track.album}</p>
				</div>
				{this.renderAction()}
			</div>
		);
	}
}

export default Track;
