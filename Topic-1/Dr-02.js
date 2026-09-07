/* =========================================================
   DR-02 — Denary and Binary Number Systems
   Interactive Lesson Script
   ========================================================= */


/* =========================
   STUDENT STUDIO TABS
   ========================= */

const studioTabs = document.querySelectorAll(".studio-tab");
const studioContents = document.querySelectorAll(".studio-content");

studioTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        studioTabs.forEach(item => {
            item.classList.remove("active");
        });

        studioContents.forEach(content => {
            content.classList.remove("active");
        });

        tab.classList.add("active");

        const target = document.getElementById(tab.dataset.tab);

        if (target) {
            target.classList.add("active");
        }
    });

});


/* =========================
   8-BIT BUILDER
   ========================= */

const bitButtons = document.querySelectorAll(".builder-bit");
const binaryDisplay = document.getElementById("binaryDisplay");
const denaryDisplay = document.getElementById("denaryDisplay");
const resetBuilder = document.getElementById("resetBuilder");

function updateBuilder() {

    let binary = "";
    let total = 0;

    bitButtons.forEach(button => {

        const value = Number(button.dataset.value);

        if (button.textContent === "1") {
            binary += "1";
            total += value;
        } else {
            binary += "0";
        }
    });

    binaryDisplay.textContent = binary;
    denaryDisplay.textContent = total;
}


bitButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "0") {
            button.textContent = "1";
            button.classList.add("active");
        } else {
            button.textContent = "0";
            button.classList.remove("active");
        }

        updateBuilder();
    });

});


resetBuilder.addEventListener("click", () => {

    bitButtons.forEach(button => {
        button.textContent = "0";
        button.classList.remove("active");
    });

    updateBuilder();

});


/* =========================
   ASSESSMENT
   ========================= */

const assessmentForm = document.getElementById("assessmentForm");
const assessmentResult = document.getElementById("assessmentResult");
const nextStep = document.getElementById("nextStep");

const answers = {
    q1: "c",
    q2: "a",
    q3: "c",
    q4: "b",
    q5: "c",
    q6: "b",
    q7: "c",
    q8: "b",
    q9: "c",
    q10: "d"
};

assessmentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let score = 0;
    let unanswered = 0;

    Object.keys(answers).forEach(question => {

        const selected = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (!selected) {
            unanswered++;
        } else if (selected.value === answers[question]) {
            score++;
        }
    });

    if (unanswered > 0) {

        assessmentResult.className = "assessment-result retry";

        assessmentResult.innerHTML = `
            <strong>Please complete all ten questions.</strong>
            <p>
                You still have ${unanswered} unanswered question(s).
                Go back and make your best attempt at every question.
            </p>
        `;

        nextStep.className = "next-step";
        nextStep.innerHTML = `
            <strong>Your next step:</strong>
            Complete the assessment before moving to the mastery decision.
        `;

        assessmentResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;
    }


    const percentage = score * 10;

    localStorage.setItem(
        "DR-02-assessment",
        JSON.stringify({
            score: score,
            percentage: percentage,
            completed: true,
            date: new Date().toISOString()
        })
    );


    if (percentage >= 70) {

        assessmentResult.className = "assessment-result pass";

        assessmentResult.innerHTML = `
            <strong>Well done! ${score}/10 (${percentage}%)</strong>
            <p>
                You have demonstrated a secure understanding of denary,
                binary and binary place value.
            </p>
        `;

        nextStep.className = "next-step";

        nextStep.innerHTML = `
            <h3>Mastery Pathway</h3>
            <p>
                Your result meets the 70% mastery threshold.
                You are ready to continue to the next lesson.
            </p>
            <p>
                You may also enjoy the 5-minute genuine Blockly Games break below.
            </p>
            <a href="DR-03.html" class="primary-btn">
                Continue to DR-03 →
            </a>
        `;

    } else {

        assessmentResult.className = "assessment-result retry";

        assessmentResult.innerHTML = `
            <strong>${score}/10 (${percentage}%)</strong>
            <p>
                You are not quite at the mastery threshold yet — and that is
                completely fine. Your result tells us where more practice is needed.
            </p>
        `;

        nextStep.className = "next-step";

        nextStep.innerHTML = `
            <h3>Targeted Remediation</h3>

            <p>
                Return to the <strong>Explore</strong> and
                <strong>Discover</strong> sections and review:
            </p>

            <ul>
                <li>Denary as base 10</li>
                <li>Binary as base 2</li>
                <li>Powers of 2</li>
                <li>8-bit place values</li>
                <li>Adding the place values represented by 1s</li>
            </ul>

            <p>
                Then use the <strong>Practise</strong> section before attempting
                the assessment again.
            </p>

            <button class="secondary-btn" id="retryAssessment">
                Retake Assessment
            </button>
        `;

        const retryButton =
            document.getElementById("retryAssessment");

        retryButton.addEventListener("click", () => {

            assessmentForm.reset();

            assessmentResult.className =
                "assessment-result hidden";

            nextStep.className =
                "next-step hidden";

            window.scrollTo({
                top: assessmentForm.offsetTop - 100,
                behavior: "smooth"
            });

        });
    }


    assessmentResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================
   GAME BREAK
   ========================= */

const gameSelect = document.getElementById("gameSelect");
const startGame = document.getElementById("startGame");
const gameTimer = document.getElementById("gameTimer");
const timerDisplay = document.getElementById("timerDisplay");
const gameMessage = document.getElementById("gameMessage");

let timerInterval = null;
let remainingSeconds = 300;


startGame.addEventListener("click", () => {

    const gameURL = gameSelect.value;

    window.open(gameURL, "_blank");

    remainingSeconds = 300;

    gameTimer.classList.remove("hidden");

    gameMessage.textContent =
        "The game has opened in a new tab. Enjoy your 5-minute break, then return here.";

    updateTimer();

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        remainingSeconds--;

        updateTimer();

        if (remainingSeconds <= 0) {

            clearInterval(timerInterval);

            timerDisplay.textContent = "00:00";

            gameMessage.textContent =
                "Your 5-minute game break is finished. Please close the game and return to your lesson.";

        }

    }, 1000);

});


function updateTimer() {

    const minutes =
        Math.floor(remainingSeconds / 60)
            .toString()
            .padStart(2, "0");

    const seconds =
        (remainingSeconds % 60)
            .toString()
            .padStart(2, "0");

    timerDisplay.textContent =
        `${minutes}:${seconds}`;
}


/* =========================
   EXIT TICKET
   ========================= */

const learned = document.getElementById("learned");
const unclear = document.getElementById("unclear");
const saveExit = document.getElementById("saveExit");
const exitSaved = document.getElementById("exitSaved");


/* Restore previous entry */

const savedExit =
    localStorage.getItem("DR-02-exit-ticket");

if (savedExit) {

    try {

        const data = JSON.parse(savedExit);

        learned.value = data.learned || "";
        unclear.value = data.unclear || "";

    } catch (error) {

        console.log("Exit ticket data could not be restored.");

    }
}


saveExit.addEventListener("click", () => {

    const data = {

        learned: learned.value.trim(),

        unclear: unclear.value.trim(),

        date: new Date().toISOString()

    };

    localStorage.setItem(
        "DR-02-exit-ticket",
        JSON.stringify(data)
    );

    exitSaved.textContent =
        "✓ Your exit ticket has been saved on this computer.";

});


/* =========================
   PAGE PROGRESS
   ========================= */

localStorage.setItem(
    "DR-02-visited",
    "true"
);


/* =========================
   INITIALISE
   ========================= */

updateBuilder();