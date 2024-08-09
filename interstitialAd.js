// Load the GPT script dynamically
(function() {
  var gptScript = document.createElement("script");
  gptScript.async = true;
  gptScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
  gptScript.crossOrigin = "anonymous";
  document.head.appendChild(gptScript);

  gptScript.onload = function() {
    window.googletag = window.googletag || { cmd: [] };

    let interstitialSlot;

    googletag.cmd.push(() => {
      // Define a web interstitial ad slot.
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
      }

      // Define static ad slots.
      googletag
        .defineSlot("/6355419/Travel/Europe", [100, 100], "static-ad-1")
        .addService(googletag.pubads());

      // Enable SRA and services.
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });
  };
})();
