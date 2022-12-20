var element = document.querySelector("#container");

// make the element go to full-screen mode
element.requestFullscreen()
	.then(function() {
		// element has entered fullscreen mode successfully
	})
	.catch(function(error) {
		// element could not enter fullscreen mode
	});