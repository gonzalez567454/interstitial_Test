document.addEventListener('DOMContentLoaded', function() {
    var adContainer = document.getElementById('interstitial-ad-container');
    var closeButton;
    var countdownTimer;
    var countdownValue = 5;
    var countdownInterval;

    // Function to create and show the interstitial ad
    function showInterstitial() {
        // Set up the ad container
        adContainer.innerHTML = `
            <div id="interstitial-content" style="position:relative; width:100%; height:100%; background-color:white; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                <span id="countdown-timer" style="position:absolute; top:10px; left:10px; color:black;">${countdownValue}</span>
                <button id="close-ad" style="position:absolute; top:10px; right:10px; background-color:red; color:white; border:none; padding:5px; cursor:pointer;">&times;</button>
            </div>
        `;

        closeButton = document.getElementById('close-ad');
        countdownTimer = document.getElementById('countdown-timer');

        // Function to start the countdown
        function startCountdown() {
            countdownValue = 5;
            countdownTimer.textContent = countdownValue;
            countdownTimer.style.display = 'block'; // Show the countdown timer
            closeButton.style.display = 'none'; // Hide the close button initially

            countdownInterval = setInterval(function() {
                countdownValue--;
                countdownTimer.textContent = countdownValue;
                if (countdownValue <= 0) {
                    clearInterval(countdownInterval);
                    countdownTimer.style.display = 'none'; // Hide the countdown timer
                    closeButton.style.display = 'block'; // Show the close button
                }
            }, 1000);
        }

        // Show the ad container
        adContainer.style.display = 'block';
        startCountdown(); // Start the countdown timer

        // Add event listener for the close button
        closeButton.addEventListener('click', function() {
            hideInterstitial(); // Hide the ad when the close button is clicked
        });

        // Create and append the blurry overlay
        var blurryOverlay = document.createElement('div');
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

        // Setup and display the interstitial ad
        setupAdSlot();
    }

    // Function to hide the interstitial ad and blurry overlay
    function hideInterstitial() {
        adContainer.style.display = 'none'; // Hide the ad container

        // Remove the blurry overlay
        var blurryOverlay = document.getElementById('blurry-overlay');
        if (blurryOverlay) {
            blurryOverlay.style.display = 'none';
            document.body.removeChild(blurryOverlay);
        }
    }

    // Function to set up the ad slot
    function setupAdSlot() {
        // Define ad parameters
        var adParams = {
            divId: 'interstitial-ad-container', 
            tagId: '/22243774984/Ernesto_InterstitialTest', // Your specific ad tag ID
            sizes: [[300, 250]], // Assuming your ad size is 300x250
            position: 'center', // Center the ad
            closeText: 'CLOSE AD',
            fullscreen: true // Ensure the ad covers the entire screen
        };

        // Load the ad (mock example)
        console.log('Setting up ad with parameters:', adParams);

        // Here you would typically call the ad service with the adParams
        // e.g., adService.loadAd(adParams);
    }

    // Show the interstitial ad when the page loads (or use an appropriate trigger)
    showInterstitial();
});
