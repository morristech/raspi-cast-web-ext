const COMMAND_PORT = 8080;
const UPDATE_PORT = 1337;

document.addEventListener("DOMContentLoaded", () => {
  restoreIPAddress();
  setTogglePauseIcon();
  document.getElementById("ipAddress").addEventListener("input", storeIPAddress);
  document.getElementById("cast").addEventListener("click", cast);
  document.getElementById("togglePause").addEventListener("click", togglePause);
  document.getElementById("skipForward").addEventListener("click", skipForward);
  document.getElementById("skipBackwards").addEventListener("click", skipBackwards);
  document.getElementById("volumeDown").addEventListener("click", volumeDown);
  document.getElementById("volumeUp").addEventListener("click", volumeUp);
  document.getElementById("toggleSubtitles").addEventListener("click", toggleSubtitles);
});


function setTogglePauseIcon() {
  browser.storage.local.get("ipAddress").then((storedData) => {
    const ipAddress = storedData.ipAddress;
    if (ipAddress)
      sendSimpleCommand("isPlaying", (request) => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) { 
          const playing = JSON.parse(request.responseText).isPlaying;
          document.getElementById("togglePause").src = "/icons/" + ((playing) ? "ic_pause_3x.png": "ic_play_arrow_3x.png");
        }
      });
  });
}

function sendSimpleCommand(command, callback) {
  browser.storage.local.get("ipAddress").then((storedData) => {
    const ipAddress = storedData.ipAddress;
    if (ipAddress === "") {
      alert("Please enter the cast IP address.");
      return;
    }

    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState = XMLHttpRequest.DONE && request.status >= 400) {
        clearIPAddress();
        alert("Incorrect IP Address: " + request.status);
      } else if (callback)
        callback(request);
    };

    request.open("GET",
      "http://" + ipAddress + ":" + COMMAND_PORT + "/" + command,
      true
    );

    request.send();
  });
}

function cast() {
  browser.storage.local.get("ipAddress").then((storedData) => {
    const ipAddress = storedData.ipAddress;
    if (ipAddress === "") {
      alert("Please enter the cast IP address.");
      return;
    }

    let currentTab = browser.tabs.query({
      active: true,
      windowId: browser.windows.WINDOW_ID_CURRENT
    }).then(
      (tabInfo) => {
        let tabURL = escape(tabInfo[0].url);
        let request = new XMLHttpRequest();

        request.onreadystatechange = () => {
          if (request.readyState = XMLHttpRequest.DONE && request.status >= 400) {
            clearIPAddress();
            alert("Incorrect IP Address: " + request.status);
          } else if (request.readyState == XMLHttpRequest.DONE && request.status == 200) 
            setTogglePauseIcon();
        };

        request.open("GET",
          "http://" + ipAddress + ":" + COMMAND_PORT + "/cast?video=" + tabURL,
          true
        );
        request.send();

      },
      (error) => {
        alert(error);
      });

    const connection = new WebSocket("ws://" + ipAddress + ":" + UPDATE_PORT);
    connection.onmessage = (e) => {
      const playing = JSON.parse(e.data).isPlaying;
      document.getElementById("togglePause").src = "/icons/" + ((playing) ? "ic_pause_3x.png": "ic_play_arrow_3x.png");
    };
  });
}

function togglePause() {
  sendSimpleCommand("togglePause");
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

function volumeUp() {
  sendSimpleCommand("volumeUp");
}

function toggleSubtitles() {
  sendSimpleCommand("toggleSubtitles");
}

function storeIPAddress() {
  browser.storage.local.set({ ipAddress: document.getElementById("ipAddress").value });
}

function clearIPAddress() {
  browser.storage.local.set({ ipAddress: "" });
  document.getElementById("ipAddress").value = "";
}

function restoreIPAddress() {
  browser.storage.local.get("ipAddress").then((storedData) => {
    const ipAddress = storedData.ipAddress;
    if (ipAddress) {
      document.getElementById("ipAddress").value = ipAddress;

      const connection = new WebSocket("ws://" + ipAddress + ":" + UPDATE_PORT);
      connection.onmessage = (e) => {
        const playing = JSON.parse(e.data).isPlaying;
        document.getElementById("togglePause").src = "/icons/" + ((playing) ? "ic_pause_3x.png": "ic_play_arrow_3x.png");
      };
    }
  });
}
