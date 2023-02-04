document.getElementById("btn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    (injectionResults) => {
      const [data] = injectionResults;
      if (data?.result) {
        const color = rgbToHex(data.result.sRGBHex);
        document.getElementById("bg").style.backgroundColor = color;
        document.getElementById("color").innerText = color;
        navigator.clipboard.writeText(color);
      }
    }
  );
});

function pickColor() {
  const eyeDropper = new EyeDropper();
  return eyeDropper.open();
}

function rgbToHex(rgb) {
  return (
    "#" +
    rgb
      .match(/[0-9|.]+/g)
      .map((x, i) =>
        i === 3
          ? parseInt(255 * parseFloat(x)).toString(16)
          : parseInt(x).toString(16)
      )
      .join("")
  );
}
