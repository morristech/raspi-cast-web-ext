function setTogglePauseIcon(state) {
	browser.storage.local.set({"state": state});
	switch (state) {
		case "play":
			document.getElementById("togglePause").src = "/icons/play_icon.png";
			break;
		case "pause":
			document.getElementById("togglePause").src = "/icons/pause_icon.png";
			break;
	}
}

function getTogglePauseIcon() {
	return browser.storage.local.get("state");
}

function flipTogglePauseIcon() {
	getTogglePauseIcon().then(
		(storedData) => {
			switch (storedData.state) {
				case "play":
					setTogglePauseIcon("pause");
					break;
				case "pause":
					setTogglePauseIcon("play");
					break;
			}
		}
	);
}

document.addEventListener("DOMContentLoaded", () => {
	getTogglePauseIcon().then(
		(storedData) => {
			setTogglePauseIcon(storedData.state);
		}
	);
});

document.addEventListener("click", (e) => {
	switch (e.target.id) {
		case "cast":
			setTogglePauseIcon("pause");
			let currentTab = browser.tabs.query(
				{
					active: true,
					windowId: browser.windows.WINDOW_ID_CURRENT
				}
			).then(
				(tabInfo) => {
					let tabURL = escape(tabInfo[0].url);
					let request = new XMLHttpRequest();

					request.onreadystatechange = () => {
						if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
							browser.storage.local.set(JSON.parse(request.responseText));
					};

					request.open(
						"GET",
						"http://127.0.0.1:8080/?command=cast&video=" + tabURL,
						true
					);
					request.send();

				},
				(error) => {
					console.log(error);
				});
			break;
		case "togglePause":
			browser.storage.local.get("castID").then(
				(storedData) => {
					const castID = storedData.castID;
					if (castID !== null) {
						let request = new XMLHttpRequest();

						request.onreadystatechange = () => {
							if (request.readyState = XMLHttpRequest.DONE && request.status == 200) {
								if (JSON.parse(request.responseText).success)
									flipTogglePauseIcon();
							}
						};
				

						request.open(
							"GET",
							"http://127.0.0.1:8080/?command=" + e.target.id + "&id=" + escape(castID),
							true
						);
						request.send();
					}
				}
			);
			break;
		case "skipForward":
		case "skipBackwards":
			browser.storage.local.get("castID").then(
				(storedData) => {
					const castID = storedData.castID;
					if (castID !== null) {
						let request = new XMLHttpRequest();

						request.open(
							"GET",
							"http://127.0.0.1:8080/?command=" + e.target.id + "&id=" + escape(castID),
							true
						);
						request.send();
					}
				}
			);
			break;

	}
});
