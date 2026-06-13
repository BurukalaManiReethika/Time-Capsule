

const capsuleForm = document.getElementById("capsuleForm");
const capsuleList = document.getElementById("capsuleList");
const archiveList = document.getElementById("archiveList");
const searchInput = document.getElementById("searchInput");

const totalCapsules = document.getElementById("totalCapsules");
const lockedCapsules = document.getElementById("lockedCapsules");
const unlockedCapsules = document.getElementById("unlockedCapsules");

const themeToggle = document.getElementById("themeToggle");

let capsules =
JSON.parse(localStorage.getItem("capsules")) || [];


loadTheme();

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
    document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark);

});

function loadTheme() {

    const dark =
    localStorage.getItem("theme");

    if (dark === "true") {
        document.body.classList.add("dark");
    }

}



capsuleForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const title =
    document.getElementById("title").value;

    const category =
    document.getElementById("category").value;

    const message =
       document.getElementById("message").value;

    const unlockDate =
    document.getElementById("unlockDate").value;

    const password =
    document.getElementById("password").value;

    const capsule = {

        id: Date.now(),

        title,
        category,
        message,
        unlockDate,
        password,

        createdAt:
        new Date().toISOString()

    };

    capsules.push(capsule);

    saveCapsules();

    capsuleForm.reset();

    renderCapsules();

});

// ==========================
// Save Local Storage
// ==========================

function saveCapsules() {

    localStorage.setItem(
        "capsules",
        JSON.stringify(capsules)
    );

}
let chart;

function renderAnalytics() {

    const goals =
    capsules.filter(
        c => c.category === "Goals"
    ).length;

    const memories =
    capsules.filter(
        c => c.category === "Memories"
    ).length;

    const dreams =
    capsules.filter(
        c => c.category === "Dreams"
    ).length;

    const career =
    capsules.filter(
        c => c.category === "Career"
    ).length;

    const personal =
    capsules.filter(
        c => c.category === "Personal"
    ).length;

    const ctx =
    document
    .getElementById("capsuleChart")
    .getContext("2d");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type:"doughnut",

        data:{
            labels:[
                "Goals",
                "Memories",
                "Dreams",
                "Career",
                "Personal"
            ],

            datasets:[{
                data:[
                    goals,
                    memories,
                    dreams,
                    career,
                    personal
                ]
            }]
        },

        options:{
            responsive:true,
            plugins:{
                legend:{
                    position:"bottom"
                }
            }
        }

    });

}


function updateStats() {

    const now = new Date();

    const unlocked =
    capsules.filter(c =>
        new Date(c.unlockDate) <= now
    ).length;

    totalCapsules.textContent =
    capsules.length;

    unlockedCapsules.textContent =
    unlocked;

    locked
