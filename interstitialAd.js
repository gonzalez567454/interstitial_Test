document.addEventListener('DOMContentLoaded', function() {
    var adContainer = document.getElementById('interstitial-ad-container');
    var closeButton = document.getElementById('close-ad');
    var countdownTimer = document.getElementById('countdown-timer');
    var blurryOverlay = document.createElement('div');
    var countdownValue = 5;
    var countdownInterval;

    // Create the blurry overlay
    blurryOverlay.id = 'blurry-overlay';
    blurryOverlay.style.position = 'fixed';
    blurryOverlay.style.top = '0';
    blurryOverlay.style.left = '0';
    blurryOverlay.style.width = '100%';
    blurryOverlay.style.height = '100%';
    blurryOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    blurryOverlay.style.backdropFilter = 'blur(5px)';
    blurryOverlay.style.zIndex = '9998';
    blurryOverlay.style.display = 'none'; // Initially hidden
    document.body.appendChild(blurryOverlay);

    // Function to start the countdown
    function startCountdown() {
        countdownValue = 5;
        countdownTimer.textContent = countdownValue;
        closeButton.disabled = true; // Disable close button initially

        countdownInterval = setInterval(function() {
            countdownValue--;
            countdownTimer.textContent = countdownValue;
            if (countdownValue <= 0) {
                clearInterval(countdownInterval);
                closeButton.disabled = false; // Enable close button
                countdownTimer.style.display = 'none'; // Hide the timer
            }
        }, 1000);
    }

    // Function to show the interstitial ad
    function showInterstitial() {
        adContainer.style.display = 'block';
        blurryOverlay.style.display = 'block'; // Show the blurry overlay
        startCountdown();
    }

    // Function to hide the interstitial ad
    function hideInterstitial() {
        adContainer.style.display = 'none';
        blurryOverlay.style.display = 'none'; // Hide the blurry overlay
    }

    // Show interstitial ad when the trigger element is in view
    function handleIntersection(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                showInterstitial();
            }
        });
    }

    var observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1
    });

    var triggerElement = document.getElementById('interstitial-trigger');
    if (triggerElement) {
        observer.observe(triggerElement);
    }

    // Close the ad when the close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            hideInterstitial();
        });
    }
});
