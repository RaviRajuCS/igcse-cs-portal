/* =========================================================
   DR-01 — INTRODUCTION TO DATA REPRESENTATION
   Independent lesson JavaScript
========================================================= */


/* =========================================================
   STUDIO PROGRESS
========================================================= */

const studioStages = {
    explore: false,
    discover: false,
    practise: false,
    sort: false,
    think: false,
    quick: false
};


function updateStudioProgress() {

    const completed =
        Object.values(studioStages)
              .filter(Boolean)
              .length;

    const percent =
        Math.round((completed / 6) * 100);

    document.getElementById("studioPercent")
        .textContent = percent + "%";

    Object.keys(studioStages).forEach(stage => {

        const element =
            document.getElementById(
                "stage" +
                stage.charAt(0).toUpperCase() +
                stage.slice(1)
            );

        if (!element) return;

        if (studioStages[stage]) {
            element.classList.add("complete");
        }

    });
}


/* =========================================================
   STUDIO TABS
========================================================= */

document.querySelectorAll(".studio-tab")
    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".studio-tab")
                .forEach(b =>
                    b.classList.remove("active")
                );

            document.querySelectorAll(".studio-panel")
                .forEach(panel =>
                    panel.classList.remove("active")
                );

            button.classList.add("active");

            const panel =
                document.getElementById(
                    button.dataset.panel
                );

            panel.classList.add("active");

        });

    });


/* =========================================================
   EXPLORE INFORMATION
========================================================= */

const exploreInformation = {

    number: `
        <h3>🔢 Numbers</h3>
        <p>
        Numbers can represent quantities, measurements, scores,
        addresses and many other forms of information.
        </p>
        <p>
        Computers represent numerical information using binary patterns.
        </p>
    `,

    text: `
        <h3>🔤 Text</h3>
        <p>
        Letters and symbols are represented using agreed character
        encoding systems.
        </p>
        <p>
        Each character is associated with a numerical code which can
        ultimately be represented using bits.
        </p>
    `,

    image: `
        <h3>🖼️ Images</h3>
        <p>
        Digital images are represented as collections of pixels.
        Each pixel needs binary information describing its colour.
        </p>
    `,

    sound: `
        <h3>🎵 Sound</h3>
        <p>
        Digital sound is represented by taking measurements of a
        sound wave at regular intervals and storing those measurements
        digitally.
        </p>
    `,

    video: `
        <h3>🎬 Video</h3>
        <p>
        Digital video contains a sequence of images, often combined
        with sound. Both components require digital representation.
        </p>
    `,

    program: `
        <h3>💻 Programs</h3>
        <p>
        Programs are instructions. They are stored as binary information
        so that the computer can fetch, decode and execute them.
        </p>
    `
};


document.querySelectorAll(".explore-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const type = card.dataset.info;

            document.getElementById("exploreInfo")
                .innerHTML =
                exploreInformation[type];

            studioStages.explore = true;

            updateStudioProgress();

        });

    });


/* =========================================================
   INTERACTIVE BITS
========================================================= */

const bits = [0,0,0,0,0,0,0,0];

const bitContainer =
    document.getElementById("interactiveBits");


function renderBits() {

    bitContainer.innerHTML = "";

    bits.forEach((value, index) => {

        const button =
            document.createElement("button");

        button.className = "bit-button";

        if (value === 1) {
            button.classList.add("active");
        }

        button.innerHTML =
            `<strong>${value}</strong><br>
             <small>bit ${index + 1}</small>`;

        button.addEventListener("click", () => {

            bits[index] =
                bits[index] === 0 ? 1 : 0;

            renderBits();

            document.getElementById("bitPattern")
                .textContent =
                bits.join("");

            studioStages.explore = true;

            updateStudioProgress();

        });

        bitContainer.appendChild(button);

    });

}


document.getElementById("resetBits")
    .addEventListener("click", () => {

        bits.fill(0);

        renderBits();

        document.getElementById("bitPattern")
            .textContent = "00000000";

    });


renderBits();


/* =========================================================
   DISCOVER HINT
========================================================= */

document.getElementById("showDiscoverHint")
    .addEventListener("click", () => {

        document.getElementById("discoverHint")
            .textContent =
            "Look at 1, 2, 4, 8, 16, 32, 64, 128. Each value is twice the previous value.";

        studioStages.discover = true;

        updateStudioProgress();

    });


document.getElementById("discoverAnswer")
    .addEventListener("input", () => {

        if (
            document.getElementById("discoverAnswer")
                .value.trim().length > 5
        ) {

            studioStages.discover = true;

            updateStudioProgress();

        }

    });


/* =========================================================
   PRACTISE
========================================================= */

document.querySelectorAll(".practice-choice")
    .forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".practice-card");

            const feedback =
                card.querySelector(
                    ".practice-feedback"
                );

            const correct =
                button.dataset.correct === "true";

            card.querySelectorAll("button")
                .forEach(b =>
                    b.disabled = true
                );

            if (correct) {

                feedback.textContent =
                    "✓ Correct. Good recognition of the allowed binary digits.";

                feedback.style.color = "#16734f";

            } else {

                feedback.textContent =
                    "✗ Not quite. Binary can contain only 0 and 1.";

                feedback.style.color = "#9b3030";

            }

            studioStages.practise = true;

            updateStudioProgress();

        });

    });


/* =========================================================
   CLASSIFICATION
========================================================= */

document.querySelectorAll(".classification")
    .forEach(button => {

        button.addEventListener("click", () => {

            const answer =
                button.dataset.answer;

            const feedback =
                document.getElementById(
                    "classificationFeedback"
                );

            if (answer === "binary") {

                feedback.textContent =
                    "✓ Correct. Binary uses only 0 and 1.";

            }

            if (answer === "denary") {

                feedback.textContent =
                    "✓ Correct. Denary uses ten digits, 0–9.";

            }

            if (answer === "hex") {

                feedback.textContent =
                    "✓ Correct. Hexadecimal uses 0–9 and A–F.";

            }

            studioStages.practise = true;

            updateStudioProgress();

        });

    });


/* =========================================================
   SORTING ACTIVITY
========================================================= */

document.querySelectorAll(".sorting-activity")
    .forEach(activity => {

        const correctAnswer =
            activity.querySelector(
                ".sort-statement"
            ).dataset.answer;

        const feedback =
            activity.querySelector(
                ".sort-feedback"
            );

        activity.querySelectorAll(
            ".sort-buttons button"
        ).forEach(button => {

            button.addEventListener("click", () => {

                if (
                    button.dataset.sort ===
                    correctAnswer
                ) {

                    feedback.textContent =
                        "✓ Correct classification.";

                    feedback.style.color =
                        "#16734f";

                } else {

                    feedback.textContent =
                        "✗ Try again. Read the statement carefully.";

                    feedback.style.color =
                        "#9b3030";

                }

                studioStages.sort = true;

                updateStudioProgress();

            });

        });

    });


/* =========================================================
   THINKING
========================================================= */

document.getElementById("saveThinking")
    .addEventListener("click", () => {

        const responses = {

            thinkOne:
                document.getElementById("thinkOne").value,

            thinkTwo:
                document.getElementById("thinkTwo").value,

            thinkThree:
                document.getElementById("thinkThree").value

        };

        localStorage.setItem(
            "DR01-thinking",
            JSON.stringify(responses)
        );

        document.getElementById("thinkingSaved")
            .textContent =
            "✓ Your thinking has been saved on this computer. Discuss your ideas with your teacher.";

        studioStages.think = true;

        updateStudioProgress();

    });


/* =========================================================
   QUICK CHECK
========================================================= */

document.getElementById("markQuick")
    .addEventListener("click", () => {

        const answers = {

            q1: "2",
            q2: "01",
            q3: "10",
            q4: "bit",
            q5: "hex",
            q6: "two",
            q7: "correct",
            q8: "101101"

        };

        let score = 0;

        Object.keys(answers)
            .forEach(question => {

                const selected =
                    document.querySelector(
                        `input[name="${question}"]:checked`
                    );

                if (
                    selected &&
                    selected.value ===
                    answers[question]
                ) {

                    score++;

                }

            });

        const result =
            document.getElementById(
                "quickResult"
            );

        if (score >= 6) {

            result.innerHTML =
                `<strong>✓ ${score}/8 — Quick Check passed.</strong>
                 <p>You are ready for the formative assessment.</p>`;

            studioStages.quick = true;

        } else {

            result.innerHTML =
                `<strong>${score}/8</strong>
                 <p>
                 Review the Explore, Discover and Practise
                 sections before trying the Quick Check again.
                 </p>`;

        }

        updateStudioProgress();

    });


/* =========================================================
   FORMATIVE ASSESSMENT
========================================================= */

document.getElementById("submitAssessment")
    .addEventListener("click", () => {

        const correctAnswers = {

            a1: "a",
            a2: "b",
            a3: "a",
            a4: "b",
            a5: "b",
            a6: "a",
            a7: "c",
            a8: "a",
            a9: "b",
            a10: "a"

        };

        let score = 0;

        Object.keys(correctAnswers)
            .forEach(question => {

                const selected =
                    document.querySelector(
                        `input[name="${question}"]:checked`
                    );

                if (
                    selected &&
                    selected.value ===
                    correctAnswers[question]
                ) {

                    score++;

                }

            });

        const percentage =
            score * 10;

        localStorage.setItem(
            "DR01-score",
            percentage
        );

        const result =
            document.getElementById(
                "assessmentResult"
            );

        result.innerHTML =
            `<h3>Assessment Result</h3>
             <p>
             You scored <strong>${score}/10
             (${percentage}%)</strong>.
             </p>`;

        const adaptive =
            document.getElementById(
                "adaptivePane"
            );

        adaptive.classList.remove("hidden");

        const adaptiveContent =
            document.getElementById(
                "adaptiveContent"
            );

        if (percentage >= 70) {

            adaptiveContent.innerHTML = `

                <div class="adaptive-grid">

                    <div class="adaptive-card">

                        <h3>🎯 Mastery Achieved</h3>

                        <p>
                            Excellent. You have reached the
                            70% mastery threshold.
                        </p>

                    </div>

                    <div class="adaptive-card">

                        <h3>➡️ Your Next Lesson</h3>

                        <p>
                            Continue to
                            <strong>
                            DR-02 — Denary & Binary
                            Number Systems
                            </strong>.
                        </p>

                    </div>

                </div>

            `;

        } else {

            adaptiveContent.innerHTML = `

                <div class="adaptive-grid">

                    <div class="adaptive-card">

                        <h3>🔄 Review Binary</h3>

                        <p>
                            Return to the Explore section.
                            Work with the interactive bits and
                            explain what 0 and 1 represent.
                        </p>

                    </div>

                    <div class="adaptive-card">

                        <h3>🔄 Review Number Systems</h3>

                        <p>
                            Revisit the Discover section and
                            compare denary, binary and hexadecimal.
                        </p>

                    </div>

                    <div class="adaptive-card">

                        <h3>🧑‍🏫 Teacher Discussion</h3>

                        <p>
                            Explain one concept aloud to your
                            teacher before attempting the
                            assessment again.
                        </p>

                    </div>

                    <div class="adaptive-card">

                        <h3>🔁 Retest</h3>

                        <p>
                            Reattempt the formative assessment.
                            Your target is 70% or above.
                        </p>

                    </div>

                </div>

            `;

        }

        adaptive.scrollIntoView({
            behavior: "smooth"
        });

    });


/* =========================================================
   BLOCKLY GAME BREAK
========================================================= */

const games = [

    [
        "Maze",
        "https://blockly.games/maze?lang=en"
    ],

    [
        "Turtle",
        "https://blockly.games/turtle?lang=en"
    ],

    [
        "Bird",
        "https://blockly.games/bird?lang=en"
    ],

    [
        "Puzzle",
        "https://blockly.games/puzzle?lang=en"
    ],

    [
        "Music",
        "https://blockly.games/music?lang=en"
    ],

    [
        "Movie",
        "https://blockly.games/movie?lang=en"
    ]

];


let timer;
let secondsRemaining = 300;


document.getElementById("gameButton")
    .addEventListener("click", () => {

        const selected =
            games[
                Math.floor(
                    Math.random() *
                    games.length
                )
            ];

        window.open(
            selected[1],
            "_blank",
            "noopener"
        );

        secondsRemaining = 300;

        clearInterval(timer);

        const timerDisplay =
            document.getElementById(
                "gameTimer"
            );

        const message =
            document.getElementById(
                "gameMessage"
            );

        timerDisplay.style.display =
            "inline-block";

        message.textContent =
            "Game: " + selected[0];

        function updateTimer() {

            const minutes =
                Math.floor(
                    secondsRemaining / 60
                );

            const seconds =
                secondsRemaining % 60;

            timerDisplay.textContent =
                String(minutes).padStart(2,"0") +
                ":" +
                String(seconds).padStart(2,"0");

        }

        updateTimer();

        timer = setInterval(() => {

            secondsRemaining--;

            updateTimer();

            if (secondsRemaining <= 0) {

                clearInterval(timer);

                message.textContent =
                    "⏰ Five minutes are complete. Close the game tab and return to the lesson.";

            }

        }, 1000);

    });


/* =========================================================
   EXIT TICKET
========================================================= */

document.getElementById("saveExit")
    .addEventListener("click", () => {

        const exitData = {

            explanation:
                document.getElementById(
                    "exitOne"
                ).value,

            binary:
                document.getElementById(
                    "exitTwo"
                ).value,

            reflection:
                document.getElementById(
                    "exitThree"
                ).value,

            saved:
                new Date().toISOString()

        };

        localStorage.setItem(
            "DR01-exit-ticket",
            JSON.stringify(exitData)
        );

        document.getElementById("exitSaved")
            .textContent =
            "✓ Exit Ticket saved on this computer.";

    });


/* =========================================================
   INITIALISE
========================================================= */

updateStudioProgress();