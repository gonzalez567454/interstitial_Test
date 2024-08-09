window.googletag = window.googletag || { cmd: [] };

let interstitialSlot;

googletag.cmd.push(() => {
  // Define a web interstitial ad slot with your specified ad unit.
  interstitialSlot = googletag.defineOutOfPageSlot(
    "/22243774984/Ernesto_InterstitialTest",
    googletag.enums.OutOfPageFormat.INTERSTITIAL,
  );

  // Slot returns null if the page or device does not support interstitials.
  if (interstitialSlot) {
    // Enable optional interstitial triggers and register the slot.
    interstitialSlot.addService(googletag.pubads()).setConfig({
      interstitial: {
        triggers: {
          navBar: true,
          unhideWindow: true,
        },
      },
    });

    document.getElementById("status").textContent = "Interstitial is loading...";

    // Add event listener to enable navigation once the interstitial loads.
    googletag.pubads().addEventListener("slotOnload", (event) => {
      if (interstitialSlot === event.slot) {
        document.getElementById("link").style.display = "block";
        document.getElementById("status").textContent = "Interstitial is loaded.";
      }
    });

    // Trigger the interstitial ad to show immediately on page load.
    googletag.pubads().addEventListener('slotRenderEnded', (event) => {
      if (interstitialSlot === event.slot) {
        // Manually refresh or display the interstitial
        googletag.display(interstitialSlot);
      }
    });

    // Display the interstitial ad immediately on page load.
    googletag.pubads().refresh([interstitialSlot]);

    // By default, the detected language of the current page is used to render
    // interstitial UI elements. This behavior can be overridden by manually
    // specifying the document language:
    // googletag.pubads().set("document_language", "en");
  }

  // Enable SRA and services.
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});
