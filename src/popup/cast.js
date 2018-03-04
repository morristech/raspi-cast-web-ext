const COMMAND_PORT = 8080;
const LEGACY_UPDATE_PORT = 1337;
const UPDATE_PORT = 1338;

const CAST_SERVER_RANGE_SUPPORT_VERSION = "0.11.0";
const PAUSE_ICON_PATH = "/icons/ic_pause_3x.png";
const PLAY_ICON_PATH = "/icons/ic_play_arrow_3x.png";

document.addEventListener("DOMContentLoaded", () => {
  browser.storage.local.get("interface").then((storedData) => {
    if (storedData.interface == "legacy") {
      document.getElementById("interface").style.display = "none";
      document.getElementById("interfaceLegacy").style.display = "block";
    }
  });

  restoreIPAddress();
  setTogglePlaybackIcon();
  setTogglePauseIconLegacy();
  getDuration();
  document.getElementById("togglePlaybackStatus").addEventListener("click", togglePlaybackStatus);
  document.getElementById("scrubberBar").addEventListener("change", setPosition);
  document.getElementById("ipAddress").addEventListener("input", storeIPAddress);
  document.getElementById("cast").addEventListener("click", cast);
  document.getElementById("togglePauseLegacy").addEventListener("click", togglePauseLegacy);
  document.getElementById("skipForwardLegacy").addEventListener("click", skipForwardLegacy);
  document.getElementById("skipBackwardsLegacy").addEventListener("click", skipBackwardsLegacy);
  document.getElementById("volumeDownLegacy").addEventListener("click", volumeDownLegacy);
  document.getElementById("volumeUpLegacy").addEventListener("click", volumeUpLegacy);
  document.getElementById("toggleSubtitlesLegacy").addEventListener("click", toggleSubtitlesLegacy);
});

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
          if (request.readyState == XMLHttpRequest.DONE && request.status >= 400) {
            clearIPAddress();
            alert("Incorrect IP Address: " + request.status);
          } else if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            const res = JSON.parse(request.responseText);
            if ("version" in res && res.version >= CAST_SERVER_RANGE_SUPPORT_VERSION) {
              browser.storage.local.set({ "interface" : "new", "duration": res.duration });
              showNewInterface();
              setTogglePlaybackIcon();
            } else {
              browser.storage.local.set({ "interface" : "legacy" });
              showLegacyInterface();
              setTogglePauseIconLegacy();
            }
          } 
        }

        /* TODO: Update to use POST in future version */
        request.open("GET",
          "http://" + ipAddress + ":" + COMMAND_PORT + "/cast?video=" + tabURL,
          true
        );
        request.send();

      },
      (error) => {
        alert(error);
      });

    /* Attempt to connect to new update port */
    const connection = new WebSocket("ws://" + ipAddress + ":" + UPDATE_PORT);
    connection.onopen = () => {
      browser.storage.local.set({ "interface" : "new" });
      showNewInterface();
    };

    connection.onmessage = (message) => {
      const data = JSON.parse(message.data);
      switch (data.messageType) {
        case "playbackStatus":
          const playing = data.playbackStatus === "Playing";
          document.getElementById("togglePlaybackStatus").src = (playing) ? PAUSE_ICON_PATH : PLAY_ICON_PATH;
          break;
      }
    };

    /* If unsuccessful, connect to old update port */
    connection.onclose = (e) => {
      if (e.code === 1006) {
        const connectionLegacy = new WebSocket("ws://" + ipAddress + ":" + LEGACY_UPDATE_PORT);
        connectionLegacy.onopen = () => {
          browser.storage.local.set({ "interface" : "legacy" });
          showLegacyInterface();
        };

        connectionLegacy.onmessage = (e) => {
          const playing = JSON.parse(e.data).isPlaying;
          document.getElementById("togglePauseLegacy").src = (playing) ? PAUSE_ICON_PATH : PLAY_ICON_PATH;
        };
      }
    }
  });
}

function setTogglePlaybackIcon() {
  browser.storage.local.get("ipAddress").then((storedData) => {
    const ipAddress = storedData.ipAddress;
    if (ipAddress)
      sendSimpleCommand("getPlaybackStatus", (request) => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) { 
          const playing = JSON.parse(request.responseText).playbackStatus == "Playing";
          document.getElementById("togglePlaybackStatus").src = (playing) ? PAUSE_ICON_PATH : PLAY_ICON_PATH;
        }
      });
  });
}

function togglePlaybackStatus() {
  const playing = document.getElementById("togglePlaybackStatus").src.indexOf(PAUSE_ICON_PATH) >= 0;
  sendSimpleCommand(playing ? "pause" : "play");
}

function getDuration() {
  browser.storage.local.get("ipAddress").then((storedData) => {
    const ipAddress = storedData.ipAddress;
    if (ipAddress)
      sendSimpleCommand("getDuration", (request) => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) { 
          const duration = JSON.parse(request.responseText).duration;
          browser.storage.local.set({ duration: duration });
        }
      });
  });
}

function setPosition() {
  browser.storage.local.get(["ipAddress", "duration"]).then((storedData) => {
    const duration = storedData.duration;
    const ipAddress = storedData.ipAddress;
    if (ipAddress && duration) {
      let request = new XMLHttpRequest();

      /* TODO: add checking for errors such as EXPIRED_CAST, etc
       * Also prevent getPosition from changing input bar until response received
       */
      const slider = document.getElementById("scrubberBar");
      const position = Math.floor(slider.value/(slider.max - slider.min) * duration);
      request.open("POST",
        "http://" + ipAddress + ":" + COMMAND_PORT + "/setPosition?position=" + position,
        true
      );
      request.send();
    }
  });
}

function showNewInterface() {
  document.getElementById("interface").style.display = "block";
  document.getElementById("interfaceLegacy").style.display = "none";
}

function showLegacyInterface() {
  document.getElementById("interface").style.display = "none";
  document.getElementById("interfaceLegacy").style.display = "block";
}

/* Legacy Support Functions */
function setTogglePauseIconLegacy() {
  browser.storage.local.get("ipAddress").then((storedData) => {
    const ipAddress = storedData.ipAddress;
    if (ipAddress)
      sendSimpleCommand("isPlaying", (request) => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) { 
          const playing = JSON.parse(request.responseText).isPlaying;
          document.getElementById("togglePauseLegacy").src = "/icons/" + ((playing) ? "ic_pause_3x.png": "ic_play_arrow_3x.png");
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
      if (request.readyState == XMLHttpRequest.DONE && request.status >= 400) {
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


function togglePauseLegacy() {
  sendSimpleCommand("togglePause");
}

function skipForwardLegacy() {
  sendSimpleCommand("skipForward");
}

function skipBackwardsLegacy() {
  sendSimpleCommand("skipBackwards");
}

function volumeDownLegacy() {
  sendSimpleCommand("volumeDown");
}

function volumeUpLegacy() {
  sendSimpleCommand("volumeUp");
}

function volumeUpLegacy() {
  sendSimpleCommand("volumeUp");
}

function toggleSubtitlesLegacy() {
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

      /* Attempt to connect to new update port */
      const connection = new WebSocket("ws://" + ipAddress + ":" + UPDATE_PORT);
      connection.onmessage = (message) => {
        const data = JSON.parse(message.data);
        switch (data.messageType) {
          case "playbackStatus":
            const playing = data.playbackStatus === "Playing";
            document.getElementById("togglePlaybackStatus").src = (playing) ? PAUSE_ICON_PATH : PLAY_ICON_PATH;
            break;
        }
      };
      connection.onopen = () => {
        browser.storage.local.set({ "interface" : "new" });
        showNewInterface();
      };

      /* If unsuccessful, connect to old update port */
      connection.onclose = (e) => {
        if (e.code === 1006) {
          const connectionLegacy = new WebSocket("ws://" + ipAddress + ":" + LEGACY_UPDATE_PORT);
          connectionLegacy.onopen = () => {
            browser.storage.local.set({ "interface" : "legacy" });
            showLegacyInterface();
          };

          connectionLegacy.onmessage = (e) => {
            const playing = JSON.parse(e.data).isPlaying;
            document.getElementById("togglePauseLegacy").src = (playing) ? PAUSE_ICON_PATH : PLAY_ICON_PATH;
          };
        }
      }
    }
  });
}
