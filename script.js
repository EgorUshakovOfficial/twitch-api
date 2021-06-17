const twitchView = document.getElementById('twitch-view');

const all = document.getElementById('all'); 

const online = document.getElementById('online '); 

const offline = document.getElementById('offline');

let createQuery = (arr, key) => {
	
	let query = '?'; 

	// Concatenate all elements in array to form a query string 
	for (let i=0; i<arr.length; i++){
		if (i===arr.length-1){
			query += (`${key}=${arr[i]}`);
		}
		else{
			query += (`${key}=${arr[i]}&`);
		}
	}

	console.log(query);

	return query; 
}
let updateTwitchView = data => {
	let updatedData = data.data.map(streamer => {
		const {login, id, profile_image_url, offline_image_url} = streamer; 
		let streamUrl = `https://twitch-proxy.freecodecamp.rocks/helix/streams?user_id=${id}`; 
		
		// Fetch data from stream URL 
		fetch(streamUrl)
		.then(response => response.json())
		.then(streamInfo => {
			let newElement = document.createElement('div');
			
			let off_image = document.createElement('img'); 
			
			let user_name = document.createElement('a'); 

			let status = document.createElement('p');

			off_image.src = profile_image_url; 

			user_name.innerHTML = login; 

			user_name.href = `https://www.twitch.tv/${login}`;

			// Checks if user is streaming 
			if (streamInfo.data.length === 0){
				status.innerHTML = 'Offline'
				newElement.classList.add('stream-on'); 
			}

			else{
				status.innerHTML = streamInfo.data[0].title;
				newElement.classList.add('stream-off'); 
			} 
			
			newElement.append(...[off_image, user_name, status]);

			newElement.classList.add('stream');  

			twitchView.append(newElement);

			
		}) 
	})
}

// Names of users who regularly stream on Twitch 
const users = ["ESL_SC2", "OgamingSC2", "cretetion", 
				"freecodecamp", "storbeck", "habathcx", 
"RobotCaleb", "noobs2ninjas"];

// Main function 
let main = () => {
	const usersUrl = `https://twitch-proxy.freecodecamp.rocks/helix/users${createQuery(users, 'login')}`;

 	// Fetch user data 
	fetch(usersUrl)
	.then(response => response.json())
	.then(data => updateTwitchView(data)); 
}

main();
