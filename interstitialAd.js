// Configuration for the interstitial ad
top.window.VD_CONFIG = {
    divId: 'interstitial-ad-container',
    tagId: '/22243774984/Ernesto_InterstitialTest',
    sizes: [[300, 250]], // Interstitial ad size
    extraMarginBottom: 0,
    position: 'center', // Center the ad for an interstitial effect
    closeText: 'CLOSE AD',
    adjustHeightIfAnchorBannerIsDetected: false,
    ovelapAnchorBanner: false,
    attemps: 1,
    interstitial: true // Ensure it's treated as an interstitial
};

// Load the GPT library
var gptScript = document.createElement('script');
gptScript.async = true;
gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
document.head.appendChild(gptScript);

// Define and display the interstitial ad
gptScript.onload = function() {
    window.googletag = window.googletag || {cmd: []};

    googletag.cmd.push(function() {
        // Define the interstitial ad slot
        googletag.defineSlot('/22243774984/Ernesto_InterstitialTest', [300, 250], 'interstitial-ad-container')
                 .addService(googletag.pubads());

        // Add event listener to show the ad when it's ready
        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if (event.slot.getSlotElementId() === 'interstitial-ad-container') {
                document.getElementById('interstitial-ad-container').style.display = 'block';
            }
        });

        // Enable single request mode and start serving ads
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });

    // Display the ad
    googletag.cmd.push(function() { 
        googletag.display('interstitial-ad-container'); 
    });
};

// Add the HTML structure for the interstitial ad container
document.write(`
    <div id="interstitial-ad-container" style="display:none; position:fixed; top:50%; left:50%; width:300px; height:250px; transform:translate(-50%, -50%); z-index:9999; background-color:white; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
        <button id="close-ad" style="position:absolute; top:5px; right:5px; background-color:red; color:white; border:none; padding:5px; cursor:pointer;">CLOSE AD</button>
    </div>
`);

// Close button functionality
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('close-ad').addEventListener('click', function() {
        document.getElementById('interstitial-ad-container').style.display = 'none';
    });
});
