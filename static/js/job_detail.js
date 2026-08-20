// Get the job ID from the current page URL.
const pathParts = window.location.pathname.split("/");

const jobId = pathParts[pathParts.length - 2];

const jobDetails = document.getElementById("job-details");


// Load the selected job from the Django API.
async function loadJobDetails() {
    try {
        const response = await fetch(`/jobs/${jobId}/`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const job = await response.json();

        displayJobDetails(job);

    } catch (error) {
        console.error("Error loading job:", error);

        jobDetails.innerHTML = `
            <h2>Unable to load this job</h2>
            <p>Please return to the job listings and try again.</p>
        `;
    }
}


// Display the job information.
function displayJobDetails(job) {
    const postedDate = job.created_at
        ? new Date(job.created_at).toLocaleDateString()
        : "Unknown";

    jobDetails.innerHTML = `
        <h2>${job.title}</h2>

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
            ${postedDate}
        </p>

        <a
            href="${job.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="apply-button"
        >
            Apply for this job
        </a>
    `;
}


// Load the job when the page opens.
loadJobDetails();