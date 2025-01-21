function initializeStickyHeadings() {
    // Get all panel-heading elements
    const headings = document.querySelectorAll(".panel-heading");

    // Function to update the position of a specific heading dynamically
    function updateHeadingPosition(heading) {
        const panelId = heading.getAttribute("id");
        const panel = document.querySelector(`#${panelId}`).nextElementSibling;

        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Calculate panel boundaries
        const panelRect = panel.getBoundingClientRect();
        const panelTop = panelRect.top + window.scrollY;
        const panelBottom = panelRect.bottom + window.scrollY;
        const headingHeight = heading.offsetHeight;

        let topPosition;

        if (scrollPosition < panelTop - headingHeight - 5) {
            // Case 1: Above the panel, reset to default
            topPosition = "0px"; // Default position at the top of the panel
        } else if (scrollPosition >= panelTop - headingHeight - 5 && scrollPosition <= panelBottom - headingHeight + 5) {
            // Case 2: Inside the panel, fix the heading at the top of the viewport
            const calculatedTop = scrollPosition - panelTop + headingHeight + 4;
            topPosition = `${Math.min(Math.floor(calculatedTop), Math.floor(panelRect.height) + 5)}px`;
        } else if (scrollPosition > panelBottom - headingHeight + 5) {
            // Case 3: Below the panel, place at the bottom of the panel
            topPosition = `${Math.floor(panelRect.height + 5)}px`;
        }

        heading.style.top = topPosition;
    }

    // Function to update all headings on scroll
    function updateAllHeadingPositions() {
        headings.forEach((heading) => {
            const panelId = heading.getAttribute("id");
            const panel = document.querySelector(`#${panelId}`).nextElementSibling;

            // Update only if the panel is expanded
            if (panel.classList.contains("in")) {
                updateHeadingPosition(heading);
            }
        });
    }

    // Listen for scroll events
    window.addEventListener("scroll", updateAllHeadingPositions);

    // Listen for resize events
    window.addEventListener("resize", () => {
        console.log("Handling resize...");
        setTimeout(() => {
            updateAllHeadingPositions();
        }, 400);
    });

    // Adjust scroll position when the panel is collapsed
    headings.forEach((heading) => {
        const panelId = heading.getAttribute("id");
        const panel = document.querySelector(`#${panelId}`).nextElementSibling;

        $(panel).on("hidden.bs.collapse", () => {
            const panelHeight = panel.scrollHeight; // Height of the panel when expanded
            window.scrollBy(0, -panelHeight); // Adjust scroll to compensate for collapsed panel
            heading.style.top = "0px";
        });

        // Update scroll position when the panel is expanded
        $(panel).on("shown.bs.collapse", () => {
            updateAllHeadingPositions();
        });
    });
}

// Initialize sticky behavior on DOM ready
document.addEventListener("DOMContentLoaded", initializeStickyHeadings);

let lastPressedButton = null; // Store the last pressed button
const scrollDelay = 200; // Duration to wait before scrolling (in milliseconds)

$('#accordion').on('show.bs.collapse', function (event) {
    // Store the last pressed button when expanding
    lastPressedButton = $(event.target).prev('.panel-heading')[0];

    // Stop any ongoing animation to prevent conflicts
    $('html, body').stop(true);

    // Wait for the specified duration before animating scroll
    setTimeout(() => {
        $('html, body').animate({
            scrollTop: $(event.target).parent().offset().top
        }, 500);
    }, scrollDelay);
});

$('#accordion').on('hide.bs.collapse', function (event) {
    // Check if the button collapsing is the last pressed
    const currentButton = $(event.target).prev('.panel-heading')[0];
    if (currentButton !== lastPressedButton) {
        return; // Do nothing if it's not the last pressed button
    }

    // Stop any ongoing animation to prevent conflicts
    $('html, body').stop(true);

    // Wait for the specified duration before animating scroll
    setTimeout(() => {
        $('html, body').animate({
            scrollTop: $(event.target).parent().offset().top
        }, 500);
    }, scrollDelay);
});
