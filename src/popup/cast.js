const BASE = "http://192.168.0.24:8080";
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cast").addEventListener("click", cast);
  document.getElementById("togglePause").addEventListener("click", togglePause);
  document.getElementById("skipForward").addEventListener("click", skipForward);
  document.getElementById("skipBackwards").addEventListener("click", skipBackwards);
  document.getElementById("volumeDown").addEventListener("click", volumeDown);
  document.getElementById("volumeUp").addEventListener("click", volumeUp);
  setInterval(setTogglePauseIcon, 250);
});

function setTogglePauseIcon() {
  browser.storage.local.get("castID").then((storedData) => {
    const castID = storedData.castID;
    if (castID !== null) {
      let request = new XMLHttpRequest();

      request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) { 
          const playing = JSON.parse(request.responseText).isPlaying;
          document.getElementById("togglePause").src = "/icons/" + ((playing) ? "ic_pause_3x.png": "ic_play_arrow_3x.png");
        }
      };

      request.open("GET",
        BASE + "?command=isPlaying&id=" + castID,
        true
      );

      request.send();
    }
  });
}

function sendSimpleCommand(command) {
  browser.storage.local.get("castID").then(
    (storedData) => {
      const castID = storedData.castID;
      if (castID !== null) {
        let request = new XMLHttpRequest();

        request.open("GET",
          BASE + "?command=" + command + "&id=" + escape(castID),
          true
        );
        request.send();
      }
    });
}

function cast() {
  let currentTab = browser.tabs.query({
    active: true,
    windowId: browser.windows.WINDOW_ID_CURRENT
  }).then(
    (tabInfo) => {
      let tabURL = escape(tabInfo[0].url);
      let request = new XMLHttpRequest();

      request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) { 
          setTogglePauseIcon();
          browser.storage.local.set(JSON.parse(request.responseText));
        }
      };

      request.open("GET",
        BASE + "?command=cast&video=" + tabURL,
        true
      );
      request.send();

    },
    (error) => {
      console.log(error);
    });
}

function togglePause() {
  browser.storage.local.get("castID").then((storedData) => {
      const castID = storedData.castID;
      if (castID !== null) {
        let request = new XMLHttpRequest();

        request.onreadystatechange = () => {
          if (request.readyState = XMLHttpRequest.DONE && request.status == 200) {
            if (JSON.parse(request.responseText).success)
              setTogglePauseIcon();
          }
        };


        request.open("GET",
          BASE + "?command=togglePause&id=" + escape(castID),
          true
        );
        request.send();
      }
    });
}

function skipForward() {
  sendSimpleCommand("skipForward");
}

function skipBackwards() {
  sendSimpleCommand("skipBackwards");
}

function volumeDown() {
  sendSimpleCommand("volumeDown");
}

function volumeUp() {
  sendSimpleCommand("volumeUp");
}
