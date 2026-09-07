/* =========================================================
   DR-03
   Binary ↔ Denary Conversion
   ========================================================= */


/* =========================================================
   STUDENT STUDIO TABS
   ========================================================= */

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

        const target =
            document.getElementById(tab.dataset.tab);

        if (target) {
            target.classList.add("active");
        }

    });

});


/* =========================================================
   BINARY → DENARY CONVERTER
   ========================================================= */

const binaryInput =
    document.getElementById("binaryInput");

const binaryConvert =
    document.getElementById("binaryConvert");

const binaryResult =
    document.getElementById("binaryResult");


binaryConvert.addEventListener("click", () => {

    const value =
        binaryInput.value.trim();

    if (!/^[01]{1,8}$/.test(value)) {

        binaryResult.innerHTML = `
            <strong>Invalid binary number.</strong>
            <p>
                Enter between 1 and 8 digits using only 0 and 1.
            </p>
        `;

        return;
    }


    const padded =
        value.padStart(8, "0");

    const placeValues =
        [128, 64, 32, 16, 8, 4, 2, 1];

    let total = 0;

    let working = [];

    for (let i = 0; i < 8; i++) {

        if (padded[i] === "1") {

            total += placeValues[i];

            working.push(placeValues[i]);

        }

    }


    binaryResult.innerHTML = `
        <strong>${padded}₂ = ${total}₁₀</strong>
        <p>
            ${working.length > 0
                ? working.join(" + ") + " = " + total
                : "All bits are 0, so the value is 0."
            }
        </p>
    `;

});


/* =========================================================
   DENARY → BINARY CONVERTER
   ========================================================= */

const denaryInput =
    document.getElementById("denaryInput");

const denaryConvert =
    document.getElementById("denaryConvert");

const denaryResult =
    document.getElementById("denaryResult");


denaryConvert.addEventListener("click", () => {

    const value =
        Number(denaryInput.value);


    if (
        denaryInput.value.trim() === "" ||
        !Number.isInteger(value) ||
        value < 0 ||
        value > 255
    ) {

        denaryResult.innerHTML = `
            <strong>Invalid denary value.</strong>
            <p>
                Enter a whole number from 0 to 255.
            </p>
        `;

        return;
    }


    const binary =
        value.toString(2).padStart(8, "0");


    const placeValues =
        [128, 64, 32, 16, 8, 4, 2, 1];

    let remaining = value;

    let working = [];

    for (let place of placeValues) {

        if (place <= remaining) {

            working.push(place);

            remaining -= place;

        }

    }


    denaryResult.innerHTML = `
        <strong>${value}₁₀ = ${binary}₂</strong>
        <p>
            ${working.length > 0
                ? working.join(" + ") + " = " + value
                : "0 = 00000000"
            }
        </p>
    `;

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
    q2: "c",
    q3: "c",
    q4: "b",
    q5: "a",
    q6: "b",
    q7: "c",
    q8: "a",
    q9: "c",
    q10: "c"

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
                You still have ${unanswered}
                unanswered question(s).
            </p>
        `;

        nextStep.className =
            "next-step";

        nextStep.innerHTML = `
            <strong>Your next step:</strong>
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
        "DR-03-assessment",
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
                Well done! ${score}/10 (${percentage}%)
            </strong>

            <p>
                You have reached the mastery threshold for
                binary ↔ denary conversion.
            </p>
        `;


        nextStep.className =
            "next-step";

        nextStep.innerHTML = `
            <h3>Mastery Pathway</h3>

            <p>
                Your result indicates that you are ready
                to continue to the next lesson.
            </p>

            <p>
                You may also take the 5-minute genuine
                Blockly Games break below.
            </p>

            <a href="DR-04.html"
               class="primary-btn">
                Continue to DR-04 →
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
                You are not at the 70% mastery threshold yet.
                This is useful information — it tells us that
                some parts of the conversion process need more practice.
            </p>
        `;


        nextStep.className =
            "next-step";

        nextStep.innerHTML = `

            <h3>Targeted Remediation</h3>

            <p>
                Return to the Student Studio and concentrate on:
            </p>

            <ul>
                <li>
                    <strong>Explore</strong> —
                    understand the relationship between the two representations.
                </li>

                <li>
                    <strong>Learn the Method</strong> —
                    review both conversion methods.
                </li>

                <li>
                    <strong>Practise</strong> —
                    complete the worked examples again.
                </li>

                <li>
                    <strong>Fix the Mistake</strong> —
                    learn from common conversion errors.
                </li>
            </ul>

            <p>
                Then attempt the assessment again.
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
        "DR-03-exit-ticket"
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
        "DR-03-exit-ticket",
        JSON.stringify(data)
    );


    exitSaved.textContent =
        "✓ Your exit ticket has been saved on this computer.";

});


/* =========================================================
   VISIT TRACKING
   ========================================================= */

localStorage.setItem(
    "DR-03-visited",
    "true"
);