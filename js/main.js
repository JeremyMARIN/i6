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
			}
		} else {
			document.getElementById(container).innerHTML = "Error " + xhr.status + "<br />Page <em>" + loadingPage + ".html</em> " + xhr.statusText + "<br />";
		}
	}, false);
	xhr.send(null);
}

function nav() {
	var buttons = document.getElementById("navigation");
	console.log(buttons);
	buttons = buttons.getElementsByTagName("li");
	console.log(buttons);

	for (var i = 0, max = buttons.length; i < max; i++) {
		buttons[i].addEventListener("mouseover", function() {
			this.style.backgroundImage = "url('img/button.gif')";
			this.style.opacity = 1;
		});
		buttons[i].addEventListener("mouseout", function() {
			this.style.backgroundImage = "url('img/button.png')";
			this.style.opacity = 0.9;
		});
		buttons[i].addEventListener("click", function(event) {
			event.preventDefault(); // avoid from redirecting

			var url = this.getElementsByTagName("a")[0].getAttribute("href");
			if (url.indexOf("http") == 0) {
				window.location = url; // redirect to the absolute url
			} else {
				load("content", url); // change the page's content
			}
			this.style.backgroundImage = "url('img/button_clicked.png')";
		});
	}
}