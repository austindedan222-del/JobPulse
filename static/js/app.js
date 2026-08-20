// JobPulse frontend JavaScript

// Base API endpoint for jobs.
const JOBS_API_URL = "/jobs/";

// Get references to the page elements.
const jobsContainer = document.getElementById("jobs-container");
const searchInput = document.getElementById("search-input");
const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const pageInfo = document.getElementById("page-info");

// Keep track of the current API request and page.
let currentPage = 1;
let currentSearch = "";
let currentLocation = "";

// Load jobs from the Django API.
async function loadJobs(page = 1) {
    try {
        jobsContainer.innerHTML = "<p>Loading jobs...</p>";

        // Build the API URL with the current filters.
        const url = new URL(JOBS_API_URL, window.location.origin);

        url.searchParams.set("page", page);

        if (currentSearch) {
            url.searchParams.set("search", currentSearch);
        }

        if (currentLocation) {
            url.searchParams.set("location", currentLocation);
        }

        // Request the jobs from Django.
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        // Remember the page we successfully loaded.
        currentPage = page;

        // Display the jobs.
        displayJobs(data);

        // Update the pagination controls.
        updatePagination(data);

    } catch (error) {
        console.error("Error loading jobs:", error);

        jobsContainer.innerHTML =
            "<p>Unable to load jobs. Please try again later.</p>";

        // Disable pagination if the request failed.
        previousButton.disabled = true;
        nextButton.disabled = true;
    }
}


// Display jobs returned by the API.
function displayJobs(data) {
    const jobs = data.results || data;

    // Handle an empty result.
    if (!jobs || jobs.length === 0) {
        jobsContainer.innerHTML = "<p>No jobs found.</p>";
        return;
    }

    // Clear the existing jobs.
    jobsContainer.innerHTML = "";

    // Create a card for each job.
    jobs.forEach(job => {
        const jobCard = document.createElement("article");

        jobCard.classList.add("job-card");

        jobCard.innerHTML = `
            <h3>${job.title}</h3>

            <p>
                <strong>Company:</strong>
                ${job.company}
            </p>

            <p>
                <strong>Location:</strong>
                ${job.location}
            </p>

            <p>
                <strong>Posted:</strong>
                ${formatDate(job.created_at)}
            </p>

            <a href="/job/${job.id}/" class="details-button">
                View Details
            </a>
        `;

        jobsContainer.appendChild(jobCard);
    });
}


// Update the Previous and Next buttons.
function updatePagination(data) {
    // Disable Previous on the first page.
    previousButton.disabled = !data.previous;

    // Disable Next when there is no next page.
    nextButton.disabled = !data.next;

    // Display the current page number.
    pageInfo.textContent = `Page ${currentPage}`;
}


// Format the job's creation date for display.
function formatDate(dateString) {
    if (!dateString) {
        return "Unknown";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString();
}


// Start a new search.
function performSearch() {
    currentSearch = searchInput.value.trim();
    currentLocation = locationInput.value.trim();

    // New searches always start from page 1.
    loadJobs(1);
}


// Search when the button is clicked.
searchButton.addEventListener("click", performSearch);


// Allow Enter to start the search.
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        performSearch();
    }
});


// Also allow Enter in the location field.
locationInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        performSearch();
    }
});


// Load the previous page.
previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
        loadJobs(currentPage - 1);
    }
});


// Load the next page.
nextButton.addEventListener("click", () => {
    loadJobs(currentPage + 1);
});


// Load the first page when the website opens.
loadJobs(1);