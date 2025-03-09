let isBackground1Visible = false;

function switchBackgrounds() {
    const background1 = document.querySelector('.background-1');
    const background2 = document.querySelector('.background-2');

    if (isBackground1Visible) {
        // Fade out background 1, fade in background 2
        background1.style.opacity = 0;
        background2.style.opacity = 0.8;
    } else {
        // Fade in background 1, fade out background 2
        background1.style.opacity = 0.8;
        background2.style.opacity = 0;
    }

    // Toggle the visibility flag
    isBackground1Visible = !isBackground1Visible;
}

// Switch backgrounds every 30 seconds (30000 ms)
setInterval(switchBackgrounds, 30000);

// Call initially to set the first background
switchBackgrounds();