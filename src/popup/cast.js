const BASE = "http://192.168.0.24:8080/";
const WEBSOCKET_BASE = "ws://192.168.0.24";
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cast").addEventListener("click", cast);
  document.getElementById("togglePause").addEventListener("click", togglePause);
  document.getElementById("skipForward").addEventListener("click", skipForward);
  document.getElementById("skipBackwards").addEventListener("click", skipBackwards);
  document.getElementById("volumeDown").addEventListener("click", volumeDown);
  document.getElementById("volumeUp").addEventListener("click", volumeUp);
  setInterval(setTogglePauseIcon, 250);

  const connection = new WebSocket(WEBSOCKET_BASE);
  connection.onmessagae = (e) => {
    const playing = JSON.parse(e.data).playing;
    document.getElementById("togglePause").src = "/icons/" + ((playing) ? "ic_pause_3x.png": "ic_play_arrow_3x.png");
  };
});


function setTogglePauseIcon() {
  sendSimpleCommand("isPlaying", (request) => {
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) { 
      const playing = JSON.parse(request.responseText).isPlaying;
      document.getElementById("togglePause").src = "/icons/" + ((playing) ? "ic_pause_3x.png": "ic_play_arrow_3x.png");
    }
  });
}

function sendSimpleCommand(command, callback) {
  let request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    callback(request);
  };

  request.open("GET",
    BASE +  command,
    true
  );

  request.send();
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
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200)
          setTogglePauseIcon();
      };

      request.open("GET",
        BASE + "cast?video=" + tabURL,
        true
      );
      request.send();

    },
    (error) => {
      console.log(error);
    });
}

function togglePause() {
  sendSimpleCommand("togglePause",  (request) => {
    if (request.readyState = XMLHttpRequest.DONE && request.status == 200) {
      if (JSON.parse(request.responseText).success)
        setTogglePauseIcon();
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
