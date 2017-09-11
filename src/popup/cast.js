document.addEventListener("click", (e) => {
	switch (e.target.id) {
		case "cast":
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

						request.open(
							"GET",
							"http://127.0.0.1:8080/?command=togglePause&id=" + escape(castID),
							true
						);
						request.send();
					}
				}
			);
			break;
	}
});
