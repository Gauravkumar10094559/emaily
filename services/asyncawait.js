// function to retrieve a blob of json


//make an ajax request | use the 'fetch ' funciton(inbuilt in js)


function fetchAlbums() {
	fetch(`http://rallycoding.herokuapp.com/api/music_albums`) //fetch returns a promise
		.then(res=> {
			res.json()	//it will return another promise
		})
		.then(json => console.log(json));	//for res.json
}

//2017 new syntax

async function fetchAlbums() {	//put async in front of  block of code that is making any ajax request
	//then find all the promises or places where the promise is returned and put await there
	const res = await fetch(`http://rallycoding.herokuapp.com/api/music_albums`)
		 
	const json = await res.json()	 
		 
	console.log(json); 
}

//with arrow function

const fetchAlbums = async () => {	

	const res = await fetch(`http://rallycoding.herokuapp.com/api/music_albums`)
		 
	const json = await res.json()	 
		 
	console.log(json); 
}

fetchAlbums();