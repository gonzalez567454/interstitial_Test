// Configuration for the interstitial ad
top.window.VD_CONFIG = {
    divId: 'googletag-slider-ad',
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
                showOverlayAndAd();
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

// Function to show the ad and blurry overlay
function showOverlayAndAd() {
    // Create and style the blurry overlay
    let overlay = document.createElement('div');
    overlay.id = 'blurry-skin';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
    overlay.style.backdropFilter = 'blur(10px)'; // Blurry effect
    overlay.style.zIndex = '9998'; // Behind the ad container
    document.body.appendChild(overlay);

    // Show the ad container
    document.getElementById('interstitial-ad-container').style.display = 'block';
}

// Countdown timer for the close button
function startCountdown() {
    let countdownTimer = document.getElementById('countdown-timer');
    let closeButton = document.getElementById('close-ad');
    let timeLeft = 5;

    // Update countdown every second
    let countdownInterval = setInterval(function() {
        timeLeft--;
        countdownTimer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            closeButton.disabled = false; // Enable the close button
        }
    }, 1000);
}

// Intersection Observer to show ad when the target div is in the viewport
document.addEventListener('DOMContentLoaded', function() {
    let targetElement = document.getElementById('interstitial-trigger');

    if (targetElement) {
        let observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting === true) {
                console.log('Interstitial trigger element is in the viewport.');
                showOverlayAndAd(); // Show the overlay and ad
                observer.disconnect(); // Stop observing after the ad is displayed
            }
        }, { threshold: [0.1] }); // Trigger when at least 10% of the element is visible

        observer.observe(targetElement);
    } else {
        console.error('Interstitial trigger element not found.');
    }

    // Close button functionality
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'close-ad') {
            document.getElementById('interstitial-ad-container').style.display = 'none';
            let overlay = document.getElementById('blurry-skin');
            if (overlay) {
                overlay.style.display = 'none'; // Hide the blurry skin
                document.body.removeChild(overlay); // Remove the blurry skin from the DOM
            }
        }
    });
});
