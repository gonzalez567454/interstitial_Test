// Configuration for the interstitial ad
top.window.VD_CONFIG = {
    divId: 'interstitial-ad-container', // Interstitial ad container
    tagId: '/22243774984/Ernesto_InterstitialTest',
    sizes: [[300, 250]], // Interstitial ad size
    extraMarginBottom: 0,
    position: 'center', // Center the interstitial ad
    closeText: 'CLOSE AD',
    adjustHeightIfAnchorBannerIsDetected: false,
    ovelapAnchorBanner: false,
    attemps: 1,
    interstitial: true, // Custom parameter to indicate this is an interstitial
    fullscreen: true // Ensure the ad covers the entire screen
};

// Load the GPT library
var gptScript = document.createElement('script');
gptScript.async = true;
gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
gptScript.onload = function() {
    console.log('GPT script loaded successfully.');
    initializeAd();
};
gptScript.onerror = function() {
    console.error('Error loading GPT script.');
};
document.head.appendChild(gptScript);

function initializeAd() {
    window.googletag = window.googletag || {cmd: []};

    googletag.cmd.push(function() {
        // Define the interstitial ad slot
        googletag.defineSlot('/22243774984/Ernesto_InterstitialTest', [300, 250], 'interstitial-ad-container')
            .addService(googletag.pubads());

        // Add event listener to show the ad when it's ready
        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if (event.slot.getSlotElementId() === 'interstitial-ad-container') {
                console.log('Interstitial ad rendered.');
                showAdWithBlur();
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
}

// Function to show the ad with a darker blur effect
function showAdWithBlur() {
    let interstitialAdContainer = document.getElementById('interstitial-ad-container');
    interstitialAdContainer.style.position = 'fixed';
    interstitialAdContainer.style.top = '0';
    interstitialAdContainer.style.left = '0';
    interstitialAdContainer.style.width = '100%';
    interstitialAdContainer.style.height = '100%';
    interstitialAdContainer.style.zIndex = '9999'; // Ensure it is on top
    interstitialAdContainer.style.display = 'block';

    // Create and show the blurry overlay
    let blurryOverlay = document.createElement('div');
    blurryOverlay.id = 'blurry-overlay';
    blurryOverlay.style.position = 'fixed';
    blurryOverlay.style.top = '0';
    blurryOverlay.style.left = '0';
    blurryOverlay.style.width = '100%';
    blurryOverlay.style.height = '100%';
    blurryOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Darker blur
    blurryOverlay.style.backdropFilter = 'blur(8px)'; // More intense blur
    blurryOverlay.style.zIndex = '9998'; // Ensure overlay is on top

    // Create close button
    let closeButton = document.createElement('div');
    closeButton.id = 'close-ad';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '9999'; // Ensure close button is on top
    closeButton.style.color = 'white'; // White X

    // Add close icon to button
    let closeIcon = document.createElement('span');
    closeIcon.textContent = '×';
    closeIcon.style.fontSize = '24px';
    closeButton.appendChild(closeIcon);

    // Add close button and blurry overlay to the body
    document.body.appendChild(blurryOverlay);
    document.body.appendChild(closeButton);

    // Add event listener for the close button
    closeButton.addEventListener('click', function() {
        hideAdWithBlur(); // Hide the ad and remove blur
    });
}

// Function to hide the ad and remove the blur effect
function hideAdWithBlur() {
    let interstitialAdContainer = document.getElementById('interstitial-ad-container');
    interstitialAdContainer.style.display = 'none';

    // Remove the blurry overlay
    let blurryOverlay = document.getElementById('blurry-overlay');
    if (blurryOverlay) {
        blurryOverlay.style.display = 'none';
        document.body.removeChild(blurryOverlay);
    }

    // Remove the close button
    let closeButton = document.getElementById('close-ad');
    if (closeButton) {
        document.body.removeChild(closeButton);
    }
}

// Intersection Observer to show ad when the target div is in the viewport
document.addEventListener('DOMContentLoaded', function() {
    let targetElement = document.getElementById('interstitial-trigger');

    if (targetElement) {
        let observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting === true) {
                console.log('Interstitial trigger element is in the viewport.');
                showAdWithBlur(); // Show the ad with blur effect
                observer.disconnect(); // Stop observing after the ad is displayed
            }
        }, { threshold: [0.1] }); // Trigger when at least 10% of the element is visible

        observer.observe(targetElement);
    } else {
        console.error('Interstitial trigger element not found.');
    }
});
