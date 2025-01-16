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

      // Reset position when the panel is collapsed
      $(panel).on("hidden.bs.collapse", () => {
        heading.style.top = "0px";
      });
    });

    // Function to update the position of a specific heading
    function updateHeadingPosition(heading, {initialOffset}) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const scrollDifference = scrollPosition - initialOffset;

    // Update the heading's top position
    heading.style.top = Math.max(scrollDifference, 0) + "px";
    }

    // Function to update all headings on scroll
    function updateAllHeadingPositions() {
        headings.forEach((heading) => {
            const { initialOffset, panel } = headingOffsets.get(heading);

            // Update only if the panel is expanded
            if (panel.classList.contains("in")) {
                updateHeadingPosition(heading, { initialOffset });
            }
        });
    }

    // Listen for scroll events
    window.addEventListener("scroll", updateAllHeadingPositions);

    // Update offsets and position when panels are expanded
    headings.forEach((heading) => {
      const panelId = heading.getAttribute("id");
    const panel = document.querySelector(`#${panelId}`).nextElementSibling;

      $(panel).on("shown.bs.collapse", () => {
        headingOffsets.set(heading, {
            initialOffset: heading.getBoundingClientRect().top + window.scrollY,
            panel,
        });

    // Update positions immediately
    updateAllHeadingPositions();
      });
    });
  }

    // Initialize sticky behavior on DOM ready
    document.addEventListener("DOMContentLoaded", initializeStickyHeadings);
