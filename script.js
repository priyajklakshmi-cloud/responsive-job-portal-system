document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       LOGIN
    ========================= */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const message = document.getElementById("loginMessage");

            if (!email || !password) {
                message.textContent = "Please enter email and password.";
                message.style.color = "#d9534f";
                return;
            }

            if (!email.includes("@")) {
                message.textContent = "Please enter a valid email address.";
                message.style.color = "#d9534f";
                return;
            }

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userEmail", email);

            message.textContent = "Login successful! Opening dashboard...";
            message.style.color = "#2f9e72";

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 500);
        });
    }


    /* =========================
       JOB DATA
    ========================= */

    const jobs = [
        {
            id: 1,
            title: "Software Developer",
            company: "TechNova Solutions",
            location: "Chennai",
            type: "Full Time",
            mode: "Hybrid",
            salary: "₹6L – ₹10L / year",
            skills: "Java, Python, SQL"
        },
        {
            id: 2,
            title: "Frontend Developer",
            company: "PixelWorks",
            location: "Remote",
            type: "Full Time",
            mode: "Remote",
            salary: "₹5L – ₹8L / year",
            skills: "HTML, CSS, JavaScript"
        },
        {
            id: 3,
            title: "Java Developer",
            company: "CloudMatrix",
            location: "Bangalore",
            type: "Full Time",
            mode: "Hybrid",
            salary: "₹7L – ₹12L / year",
            skills: "Java, Spring Boot, MySQL"
        },
        {
            id: 4,
            title: "Data Analyst",
            company: "Insight Labs",
            location: "Hyderabad",
            type: "Full Time",
            mode: "Office",
            salary: "₹5L – ₹9L / year",
            skills: "Python, Excel, SQL"
        },
        {
            id: 5,
            title: "Web Developer Intern",
            company: "InnovateHub",
            location: "Chennai",
            type: "Internship",
            mode: "Hybrid",
            salary: "₹15K – ₹25K / month",
            skills: "HTML, CSS, JavaScript"
        },
        {
            id: 6,
            title: "Python Developer",
            company: "NextGen Technologies",
            location: "Remote",
            type: "Full Time",
            mode: "Remote",
            salary: "₹6L – ₹11L / year",
            skills: "Python, Django, SQL"
        }
    ];


    /* =========================
       SEARCH JOBS
    ========================= */

    const jobList = document.getElementById("jobList");

    if (jobList) {
        displayJobs(jobs);
    }


    /* =========================
       APPLY PAGE
    ========================= */

    const applyJob = document.getElementById("applyJob");

    if (applyJob) {

        jobs.forEach(function (job) {

            const option = document.createElement("option");

            option.value = job.id;
            option.textContent =
                job.title + " - " + job.company;

            applyJob.appendChild(option);
        });


        const selectedJob = localStorage.getItem("selectedJob");

        if (selectedJob) {
            applyJob.value = selectedJob;
        }


        const email = localStorage.getItem("userEmail");

        if (email) {
            document.getElementById("candidateEmail").value = email;
        }
    }


    /* =========================
       APPLY FORM
    ========================= */

    const applyForm = document.getElementById("applyForm");

    if (applyForm) {

        applyForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const jobId = Number(
                document.getElementById("applyJob").value
            );

            const job = jobs.find(function (item) {
                return item.id === jobId;
            });

            if (!job) {
                return;
            }

            const application = {
                id: Date.now(),
                jobId: job.id,
                title: job.title,
                company: job.company,
                location: job.location,
                name: document.getElementById("candidateName").value,
                email: document.getElementById("candidateEmail").value,
                phone: document.getElementById("candidatePhone").value,
                qualification: document.getElementById("qualification").value,
                skills: document.getElementById("skills").value,
                status: "Application Sent",
                date: new Date().toLocaleDateString()
            };


            let applications =
                JSON.parse(localStorage.getItem("applications")) || [];

            applications.push(application);

            localStorage.setItem(
                "applications",
                JSON.stringify(applications)
            );


            const message =
                document.getElementById("applyMessage");

            message.textContent =
                "✓ Application submitted successfully to " +
                job.company + "!";

            message.style.color = "#2f9e72";

            applyForm.reset();

            document.getElementById("candidateEmail").value =
                localStorage.getItem("userEmail") || "";
        });
    }


    /* =========================
       SAVED JOBS
    ========================= */

    const savedJobsContainer =
        document.getElementById("savedJobs");

    if (savedJobsContainer) {
        displaySavedJobs();
    }


    /* =========================
       MY REQUESTS
    ========================= */

    const applicationsList =
        document.getElementById("applicationsList");

    if (applicationsList) {
        displayApplications();
    }


    /* =========================
       DASHBOARD
    ========================= */

    const userInitial =
        document.getElementById("userInitial");

    if (userInitial) {

        const email =
            localStorage.getItem("userEmail") || "User";

        userInitial.textContent =
            email.charAt(0).toUpperCase();

        const avatar =
            document.getElementById("dashboardAvatar");

        if (avatar) {
            avatar.textContent =
                email.charAt(0).toUpperCase();
        }
    }


    const dashboardApplications =
        document.getElementById("dashboardApplications");

    if (dashboardApplications) {

        const applications =
            JSON.parse(localStorage.getItem("applications")) || [];

        if (applications.length > 0) {

            dashboardApplications.innerHTML =
                applications.slice(-3).reverse().map(function (app) {

                    return `
                        <div class="request-card">
                            <div class="request-company">
                                <div class="company-logo">
                                    ${app.company.charAt(0)}
                                </div>

                                <div>
                                    <h3>${app.title}</h3>
                                    <p>${app.company} · ${app.date}</p>
                                </div>
                            </div>

                            <span class="status viewed">
                                ${app.status}
                            </span>
                        </div>
                    `;

                }).join("");
        }
    }

});


/* =========================
   DISPLAY JOBS
========================= */

function displayJobs(jobArray) {

    const container =
        document.getElementById("jobList");

    const count =
        document.getElementById("jobCount");

    if (!container) return;

    if (count) {
        count.textContent =
            jobArray.length + " opportunities";
    }

    if (jobArray.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>No jobs found</h3>
                <p>Try another job title, skill or location.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        jobArray.map(function (job) {

            return `
                <div class="job-card">

                    <div class="job-main">

                        <h3>${job.title}</h3>

                        <p class="company">
                            ${job.company}
                        </p>

                        <div class="job-meta">
                            <span>📍 ${job.location}</span>
                            <span>${job.type}</span>
                            <span>${job.mode}</span>
                        </div>

                        <p class="salary">
                            ${job.salary}
                        </p>

                        <p style="color:#727b86;font-size:12px;margin-top:5px;">
                            Skills: ${job.skills}
                        </p>

                    </div>


                    <div class="job-actions">

                        <button
                            class="view-btn"
                            onclick="applyToJob(${job.id})">
                            Apply
                        </button>

                        <button
                            class="save-btn"
                            onclick="saveJob(${job.id})">
                            ♡ Save
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================
   FILTER JOBS
========================= */

function filterJobs() {

    const search =
        document.getElementById("jobSearch")
            .value
            .toLowerCase()
            .trim();

    const location =
        document.getElementById("locationFilter").value;


    const filtered =
        jobs.filter(function (job) {

            const text =
                (
                    job.title +
                    " " +
                    job.company +
                    " " +
                    job.skills +
                    " " +
                    job.location
                ).toLowerCase();

            const matchesSearch =
                text.includes(search);

            const matchesLocation =
                location === "all" ||
                job.location === location;

            return matchesSearch && matchesLocation;
        });


    displayJobs(filtered);
}


/* =========================
   APPLY TO SELECTED JOB
========================= */

function applyToJob(jobId) {

    localStorage.setItem(
        "selectedJob",
        jobId
    );

    window.location.href = "apply.html";
}


/* =========================
   SAVE JOB
========================= */

function saveJob(jobId) {

    let saved =
        JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (!saved.includes(jobId)) {

        saved.push(jobId);

        localStorage.setItem(
            "savedJobs",
            JSON.stringify(saved)
        );

        alert("✓ Job saved successfully!");
    } else {

        alert("This job is already saved.");
    }
}


/* =========================
   DISPLAY SAVED JOBS
========================= */

function displaySavedJobs() {

    const container =
        document.getElementById("savedJobs");

    if (!container) return;

    const saved =
        JSON.parse(localStorage.getItem("savedJobs")) || [];


    const savedJobObjects =
        jobs.filter(function (job) {

            return saved.includes(job.id);

        });


    if (savedJobObjects.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>No saved jobs yet</h3>
                <p>Search jobs and click ♡ Save to keep opportunities here.</p>
                <br>
                <a href="search-jobs.html"
                   class="btn primary">
                   Search Jobs
                </a>
            </div>
        `;

        return;
    }


    container.innerHTML =
        savedJobObjects.map(function (job) {

            return `
                <div class="job-card">

                    <div class="job-main">

                        <h3>${job.title}</h3>

                        <p class="company">
                            ${job.company}
                        </p>

                        <div class="job-meta">
                            <span>📍 ${job.location}</span>
                            <span>${job.type}</span>
                            <span>${job.mode}</span>
                        </div>

                        <p class="salary">
                            ${job.salary}
                        </p>

                    </div>

                    <div class="job-actions">

                        <button
                            class="view-btn"
                            onclick="applyToJob(${job.id})">
                            Apply Now
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================
   DISPLAY APPLICATIONS
========================= */

function displayApplications() {

    const container =
        document.getElementById("applicationsList");

    if (!container) return;


    const applications =
        JSON.parse(localStorage.getItem("applications")) || [];


    if (applications.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h3>No applications submitted</h3>
                <p>Once you apply for a job, the company request will appear here.</p>
                <br>
                <a href="search-jobs.html"
                   class="btn primary">
                   Search Jobs
                </a>
            </div>
        `;

        return;
    }


    container.innerHTML =
        applications.slice().reverse().map(function (app) {

            return `
                <div class="request-card">

                    <div class="request-company">

                        <div class="company-logo">
                            ${app.company.charAt(0)}
                        </div>

                        <div>
                            <h3>${app.company}</h3>

                            <p>
                                ${app.title}
                                · Applied on ${app.date}
                            </p>

                            <p>
                                📍 ${app.location}
                            </p>
                        </div>

                    </div>


                    <span class="status viewed">
                        ${app.status}
                    </span>

                </div>
            `;

        }).join("");
}