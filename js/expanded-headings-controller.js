// Function to initialize sticky behavior for all headings
function initializeStickyHeadings() {
    // Get all panel-heading elements
    const headings = document.querySelectorAll(".panel-heading");
    const headingOffsets = new Map(); // To store initial offsets for each heading

    // Initialize the offsets for each heading
    headings.forEach((heading) => {
        const panelId = heading.getAttribute("id");
        const panel = document.querySelector(`#${panelId}`).nextElementSibling;

        // Store initial offset of the heading
        headingOffsets.set(heading, {
            initialOffset: heading.getBoundingClientRect().top + window.scrollY,
            panel,
        });

        // Check if the panel starts expanded and update its position
        if (panel.classList.contains("in")) {
            updateHeadingPosition(heading, headingOffsets.get(heading));
        }

        // Adjust scroll position when the panel is collapsed
        $(panel).on("hidden.bs.collapse", () => {
            const panelHeight = panel.scrollHeight; // Height of the panel when expanded
            window.scrollBy(0, -panelHeight); // Adjust scroll to compensate for collapsed panel
            heading.style.top = "0px";
        });

        // Update scroll position when the panel is expanded
        $(panel).on("shown.bs.collapse", () => {
            headingOffsets.set(heading, {
                initialOffset: heading.getBoundingClientRect().top + window.scrollY,
                panel,
            });

            // Update positions immediately
            updateAllHeadingPositions();
        });
    });

    // Function to update the position of a specific heading
    function updateHeadingPosition(heading, { initialOffset, panel }) {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const scrollDifference = scrollPosition - initialOffset;

        // Calculate panel boundaries
        const panelRect = panel.getBoundingClientRect();
        const panelTop = panelRect.top + window.scrollY;
        const panelBottom = panelRect.bottom + window.scrollY;
        const headingHeight = heading.offsetHeight;

        // Limit the heading's top position within the panel's bounds
        const topPosition = Math.min(
            Math.max(scrollDifference, 0), // Don't go above the panel
            panelBottom - panelTop + 5 // Don't go below the panel
        );

        heading.style.top = `${topPosition}px`;
    }

    // Function to update all headings on scroll
    function updateAllHeadingPositions() {
        headings.forEach((heading) => {
            const { initialOffset, panel } = headingOffsets.get(heading);

            // Update only if the panel is expanded
            if (panel.classList.contains("in")) {
                updateHeadingPosition(heading, { initialOffset, panel });
            }
        });
    }

    // Listen for scroll events
    window.addEventListener("scroll", updateAllHeadingPositions);
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
