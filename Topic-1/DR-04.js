/* =========================================================
   DR-04
   Hexadecimal Number System
   ========================================================= */


/* =========================================================
   STUDENT STUDIO TABS
   ========================================================= */

const studioTabs =
    document.querySelectorAll(".studio-tab");

const studioContents =
    document.querySelectorAll(".studio-content");


studioTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        studioTabs.forEach(item => {
            item.classList.remove("active");
        });

        studioContents.forEach(content => {
            content.classList.remove("active");
        });

        tab.classList.add("active");

        const target =
            document.getElementById(tab.dataset.tab);

        if (target) {
            target.classList.add("active");
        }

    });

});


/* =========================================================
   ASSESSMENT
   ========================================================= */

const assessmentForm =
    document.getElementById("assessmentForm");

const assessmentResult =
    document.getElementById("assessmentResult");

const nextStep =
    document.getElementById("nextStep");


const answers = {

    q1: "c",
    q2: "b",
    q3: "b",
    q4: "c",
    q5: "d",
    q6: "c",
    q7: "c",
    q8: "c",
    q9: "b",
    q10: "b"

};


assessmentForm.addEventListener("submit", event => {

    event.preventDefault();

    let score = 0;
    let unanswered = 0;


    Object.keys(answers).forEach(question => {

        const selected =
            document.querySelector(
                `input[name="${question}"]:checked`
            );

        if (!selected) {

            unanswered++;

        }
        else if (
            selected.value === answers[question]
        ) {

            score++;

        }

    });


    if (unanswered > 0) {

        assessmentResult.className =
            "assessment-result retry";

        assessmentResult.innerHTML = `
            <strong>Please complete the assessment.</strong>
            <p>
                ${unanswered} question(s) have not been answered.
            </p>
        `;

        nextStep.className =
            "next-step";

        nextStep.innerHTML = `
            <strong>Next step:</strong>
            Return to the assessment and answer every question.
        `;

        assessmentResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;

    }


    const percentage =
        score * 10;


    localStorage.setItem(
        "DR-04-assessment",
        JSON.stringify({
            score: score,
            percentage: percentage,
            completed: true,
            date: new Date().toISOString()
        })
    );


    if (percentage >= 70) {

        assessmentResult.className =
            "assessment-result pass";

        assessmentResult.innerHTML = `
            <strong>
                Excellent! ${score}/10 (${percentage}%)
            </strong>

            <p>
                You have reached the mastery threshold for
                the hexadecimal number system.
            </p>
        `;


        nextStep.className =
            "next-step";

        nextStep.innerHTML = `
            <h3>Mastery Pathway</h3>

            <p>
                You are ready to continue to the next lesson.
            </p>

            <p>
                You may also enjoy the genuine Blockly Games
                break below.
            </p>

            <a href="DR-05.html"
               class="primary-btn">
                Continue to DR-05 →
            </a>
        `;

    }
    else {

        assessmentResult.className =
            "assessment-result retry";

        assessmentResult.innerHTML = `
            <strong>
                ${score}/10 (${percentage}%)
            </strong>

            <p>
                You have not reached the 70% mastery threshold yet.
                This tells you exactly where more learning is needed.
            </p>
        `;


        nextStep.className =
            "next-step";

        nextStep.innerHTML = `

            <h3>Targeted Remediation</h3>

            <p>
                Return to the Student Studio and review:
            </p>

            <ul>

                <li>
                    <strong>Explore</strong> —
                    understand base 16.
                </li>

                <li>
                    <strong>Symbol Lab</strong> —
                    master A–F.
                </li>

                <li>
                    <strong>Place Values</strong> —
                    understand powers of 16.
                </li>

                <li>
                    <strong>Practise</strong> —
                    work through hexadecimal values.
                </li>

                <li>
                    <strong>Fix the Mistake</strong> —
                    examine common errors.
                </li>

            </ul>

            <p>
                Then retake the assessment.
            </p>

            <button
                id="retryAssessment"
                class="secondary-btn">
                Retake Assessment
            </button>
        `;


        const retryButton =
            document.getElementById(
                "retryAssessment"
            );


        retryButton.addEventListener("click", () => {

            assessmentForm.reset();

            assessmentResult.className =
                "assessment-result hidden";

            nextStep.className =
                "next-step hidden";

            window.scrollTo({
                top:
                    assessmentForm.offsetTop - 100,
                behavior: "smooth"
            });

        });

    }


    assessmentResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================================================
   GAME BREAK
   ========================================================= */

const gameSelect =
    document.getElementById("gameSelect");

const startGame =
    document.getElementById("startGame");

const gameTimer =
    document.getElementById("gameTimer");

const timerDisplay =
    document.getElementById("timerDisplay");

const gameMessage =
    document.getElementById("gameMessage");


let timerInterval = null;

let remainingSeconds = 300;


startGame.addEventListener("click", () => {

    const gameURL =
        gameSelect.value;


    window.open(
        gameURL,
        "_blank"
    );


    remainingSeconds = 300;

    gameTimer.classList.remove("hidden");


    gameMessage.textContent =
        "The game has opened in a new tab. Enjoy your 5-minute break, then return here.";


    updateTimer();


    clearInterval(timerInterval);


    timerInterval =
        setInterval(() => {

            remainingSeconds--;

            updateTimer();


            if (remainingSeconds <= 0) {

                clearInterval(timerInterval);

                timerDisplay.textContent =
                    "00:00";

                gameMessage.textContent =
                    "Your 5-minute game break is finished. Please close the game and return to your lesson.";

            }

        }, 1000);

});


function updateTimer() {

    const minutes =
        Math.floor(
            remainingSeconds / 60
        )
        .toString()
        .padStart(2, "0");


    const seconds =
        (remainingSeconds % 60)
        .toString()
        .padStart(2, "0");


    timerDisplay.textContent =
        `${minutes}:${seconds}`;

}


/* =========================================================
   EXIT TICKET
   ========================================================= */

const learned =
    document.getElementById("learned");

const unclear =
    document.getElementById("unclear");

const saveExit =
    document.getElementById("saveExit");

const exitSaved =
    document.getElementById("exitSaved");


const savedExit =
    localStorage.getItem(
        "DR-04-exit-ticket"
    );


if (savedExit) {

    try {

        const data =
            JSON.parse(savedExit);

        learned.value =
            data.learned || "";

        unclear.value =
            data.unclear || "";

    }
    catch (error) {

        console.log(
            "Previous exit-ticket data could not be restored."
        );

    }

}


saveExit.addEventListener("click", () => {

    const data = {

        learned:
            learned.value.trim(),

        unclear:
            unclear.value.trim(),

        date:
            new Date().toISOString()

    };


    localStorage.setItem(
        "DR-04-exit-ticket",
        JSON.stringify(data)
    );


    exitSaved.textContent =
        "✓ Your exit ticket has been saved on this computer.";

});


/* =========================================================
   LESSON VISIT
   ========================================================= */

localStorage.setItem(
    "DR-04-visited",
    "true"
);