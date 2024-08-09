// Configuration for the interstitial ad
top.window.VD_CONFIG = {
    divId: 'interstitial-ad-container',
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

// Function to show the ad with a blur effect
function showAdWithBlur() {
    let adContainer = document.getElementById('interstitial-ad-container');
    adContainer.style.display = 'block';
    
    // Create and show the blurry overlay
    let blurryOverlay = document.createElement('div');
    blurryOverlay.id = 'blurry-overlay';
    blurryOverlay.style.position = 'fixed';
    blurryOverlay.style.top = '0';
    blurryOverlay.style.left = '0';
    blurryOverlay.style.width = '100%';
    blurryOverlay.style.height = '100%';
    blurryOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    blurryOverlay.style.backdropFilter = 'blur(5px)';
    blurryOverlay.style.zIndex = '9998';
    blurryOverlay.style.display = 'block'; // Show the blurry overlay
    document.body.appendChild(blurryOverlay);
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
                showAdWithBlur(); // Show the ad with blur effect
                observer.disconnect(); // Stop observing after the ad is displayed
            }
        }, { threshold: [0.1] }); // Trigger when at least 10% of the element is visible

        observer.observe(targetElement);
    } else {
        console.error('Interstitial trigger element not found.');
    }

    // Close button functionality
    document.getElementById('close-ad').addEventListener('click', function() {
        hideAdWithBlur(); // Hide the ad and remove blur
    });
});
