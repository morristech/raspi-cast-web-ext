function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    maxVolume: document.getElementById("maxVolume").value
  });

  browser.storage.local.set({
    minVolume: document.getElementById("minVolume").value
  });
}

function restoreOptions() {
  browser.storage.local.get("maxVolume").then((result) => {
    document.getElementById("maxVolume").value = result.maxVolume || 500;
  }, (error) => {
    console.log(`Error: ${error}`);
  });

  browser.storage.local.get("minVolume").then((result) => {
    document.getElementById("minVolume").value = result.minVolume || -4000;
  }, (error) => {
    console.log(`Error: ${error}`);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
