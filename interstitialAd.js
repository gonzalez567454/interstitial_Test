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
};

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
                document.getElementById('interstitial-ad-container').style.display = 'block';
                observer.disconnect(); // Stop observing after the ad is displayed
            }
        }, { threshold: [0.1] }); // Trigger when at least 10% of the element is visible

        observer.observe(targetElement);
    }

    // Close button functionality
    document.getElementById('close-ad').addEventListener('click', function() {
        document.getElementById('interstitial-ad-container').style.display = 'none';
    });
});
