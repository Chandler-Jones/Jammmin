import React, { Component } from "react";

import "./Playlist.css";
import TrackList from '../TrackList/TrackList'

class Playlist extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	handleNameChange(e) {
		this.props.onNameChange(e.target.value);
	}

	render () {
		return (
			<div className="Playlist">
				<input defaultValue={"New Playlist"}
				       onChange={this.handleNameChange}
				/>
				<TrackList tracks={this.props.playlistTracks}
				           onRemove={this.props.onRemove}
				           isRemoval={true}
				/>
				<button className="Playlist-save"
								onClick={this.props.onSave}>SAVE TO SPOTIFY
				</button>
			</div>
		);
	}
}

export default Playlist;
