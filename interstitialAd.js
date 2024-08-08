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
                startCountdown();
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
    let adContainer = document.getElementById('interstitial-ad-container');
    adContainer.style.position = 'fixed';
    adContainer.style.top = '0';
    adContainer.style.left = '0';
    adContainer.style.width = '100%';
    adContainer.style.height = '100%';
    adContainer.style.zIndex = '9999'; // Ensure it is on top
    adContainer.style.display = 'block';

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

    // Create countdown timer
    let countdownTimer = document.createElement('div');
    countdownTimer.id = 'countdown-timer';
    countdownTimer.style.position = 'absolute';
    countdownTimer.style.top = '10px';
    countdownTimer.style.right = '10px';
    countdownTimer.style.color = 'white'; // White text
    countdownTimer.style.fontSize = '24px'; // Font size for visibility
    countdownTimer.style.zIndex = '9999'; // Ensure countdown is on top

    // Create close button
    let closeButton = document.createElement('div');
    closeButton.id = 'close-ad';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.width = '40px';
    closeButton.style.height = '40px';
    closeButton.style.display = 'none'; // Hidden initially
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'white'; // White X
    closeButton.style.fontSize = '24px'; // Font size for the close icon
    closeButton.style.zIndex = '9999'; // Ensure close button is on top

    // Add close icon to button
    let closeIcon = document.createElement('span');
    closeIcon.textContent = '×';
    closeButton.appendChild(closeIcon);

    // Add elements to the body
    document.body.appendChild(blurryOverlay);
    document.body.appendChild(countdownTimer);
    document.body.appendChild(closeButton);

    // Start countdown
    let timeLeft = 5;
    countdownTimer.textContent = timeLeft;

    let countdownInterval = setInterval(function() {
        timeLeft--;
        countdownTimer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownTimer.style.display = 'none'; // Hide countdown timer
            closeButton.style.display = 'flex'; // Show the close button
        }
    }, 1000);

    // Add event listener for the close button
    closeButton.addEventListener('click', function() {
        hideAdWithBlur(); // Hide the ad and remove blur
    });
}

// Function to hide the ad and remove the blur effect
function hideAdWithBlur() {
    let adContainer = document.getElementById('interstitial-ad-container');
    adContainer.style.display = 'none';

    // Remove the blurry overlay
    let blurryOverlay = document.getElementById('blurry-overlay');
    if (blurryOverlay) {
        blurryOverlay.style.display = 'none';
        document.body.removeChild(blurryOverlay);
    }

    // Remove the close button
    let closeButton = document.getElementById('close-ad');
    if (closeButton) {
        closeButton.style.display = 'none';
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
