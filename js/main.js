function init() {
	load("header");
	load("navigation");
	load("footer");
	load("content", "home.html");
}

function load(container, page) {
	var loadingPage;
	if (page) {
		loadingPage = "include/" + page;
	} else {
		loadingPage = "include/" + container + ".html";
	}

	var xhr = new XMLHttpRequest();
	xhr.open("GET", loadingPage);
	xhr.addEventListener("readystatechange", function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById(container).innerHTML = xhr.responseText;
			if (container == "navigation") {
				nav();
			} else if (container == "content") {
				updateBackground();
			}
		} else {
			document.getElementById(container).innerHTML = "Error " + xhr.status + "<br />Page <em>" + loadingPage + ".html</em> " + xhr.statusText + "<br />";
		}
	}, false);
	xhr.send(null);
}

function nav() {
	var buttons = document.getElementById("navigation");
	buttons = buttons.getElementsByTagName("li");

	for (var i = 0, max = buttons.length; i < max; i++) {
		setupRollover(buttons[i]);
	}
}

function setupRollover(button) {
	button.outImage = new Image();
	button.outImage.src = "img/button.png";
	button.onmouseout = function() {
		this.style.backgroundImage = "url(" + this.outImage.src + ")";
		this.style.opacity = 0.9;
	};

	button.overImage = new Image();
	button.overImage.src = "img/button.gif";
	button.onmouseover = function() {
		this.style.backgroundImage = "url(" + this.overImage.src + ")";
		this.style.opacity = 1;
	};

	button.clickImage = new Image();
	button.clickImage.src = "img/button_clicked.png";
	button.onclick = function(event) {
		event.preventDefault(); // avoid from redirecting

		var url = this.getElementsByTagName("a")[0].getAttribute("href");
		if (url.indexOf("http") == 0 || url.indexOf("..") == 0) {
			window.location = url; // redirect to the absolute url
		} else {
			load("content", url); // change the page's content
		}
		this.style.backgroundImage = "url(" + this.clickImage.src + ")";
	};
}

function updateBackground() {
	var backgroundImageName = document.getElementById("content").children[0].getAttribute("data-background-image");
	console.log(backgroundImageName);
	if (backgroundImageName) {
		document.body.style.backgroundImage = "url(" + backgroundImageName + ")";
	}
}
