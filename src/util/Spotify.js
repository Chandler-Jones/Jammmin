let accessToken;
const clientId = '7a61b1f0c72e4d55ba92959f9a8c4fcc';
const redirectUri='http://chanzjamz.surge.sh';

const Spotify = {
	getAccessToken () {
		if (accessToken) {
			return accessToken;
		}
		const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
		const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

		if (accessTokenMatch && expiresInMatch) {
			accessToken = accessTokenMatch[1];
			const expiresIn = Number(expiresInMatch[1]);
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			return accessToken;
		} else {
			const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
			window.location = accessUrl;
		}
	},

	async search (term) {
		const accessToken = Spotify.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {Authorization: `Bearer ${accessToken}`}
		}).then(response => {
			if(response.ok) {
				return response.json()
			} else {
				console.log('API request failed~');
			}
		}).then(jsonResponse => {
			if (!jsonResponse.tracks) return [];
			return jsonResponse.tracks.items.map(track => {
				return {
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					album: track.album.name,
					uri: track.uri,
					coverArt: track.album.images[2].url
				}
			})
		});
	},

	async savePlaylist(playlistName, trackUris) {
		if (!playlistName || !trackUris.length) return;
		const accessToken = Spotify.getAccessToken();
		let headers = { Authorization: `Bearer: ${accessToken}` };
		let userId;

		fetch('https://api.spotify.com/v1/me', { headers: headers })
			.then(response => response.json())
			.then(jsonResponse => {
				userId = jsonResponse.id;
				return fetch(`/v1/users/${userId}/playlists`,
					{
						headers: headers,
						method: 'POST',
						body: JSON.stringify({ playlistName: playlistName })
					})
					.then(response => response.json())
					.then(jsonResponse => {
						const playlistId = jsonResponse.id;
						return fetch(`/v1/users/${userId}/playlists/${playlistId}/tracks`,
							{
								headers: headers,
								method: 'POST',
								body: JSON.stringify({ uris: trackUris })
							})
					})
			});
	}
};

export default Spotify;
