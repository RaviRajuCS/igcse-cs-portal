document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------
       VISITED FLAG
    -------------------------------- */

    localStorage.setItem("DR-13-visited", "true");


    /* --------------------------------
       STUDENT STUDIO TABS
    -------------------------------- */

    const tabButtons =
        document.querySelectorAll(".tabs button");

    const tabContents =
        document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target = button.dataset.tab;

            tabContents.forEach(tab => {
                tab.classList.remove("active");
            });

            const selected =
                document.getElementById(target);

            if (selected) {
                selected.classList.add("active");
            }
        });

    });


    /* --------------------------------
       NUMBER FORMATTER
    -------------------------------- */

    function formatNumber(value) {

        if (!Number.isFinite(value)) {
            return "Invalid value";
        }

        if (Number.isInteger(value)) {
            return value.toLocaleString();
        }

        return value.toLocaleString(undefined, {
            maximumFractionDigits: 6
        });
    }


    /* --------------------------------
       COMPRESSION RATIO
    -------------------------------- */

    document.getElementById("ratioBtn")
        .addEventListener("click", () => {

            const original =
                Number(
                    document.getElementById(
                        "ratioOriginal"
                    ).value
                );

            const compressed =
                Number(
                    document.getElementById(
                        "ratioCompressed"
                    ).value
                );

            const result =
                document.getElementById("ratioResult");

            if (
                original <= 0 ||
                compressed <= 0 ||
                compressed > original
            ) {

                result.innerHTML =
                    "Please enter valid sizes. The compressed size should not be greater than the original size.";

                return;
            }

            const ratio =
                original / compressed;

            result.innerHTML =
                `<strong>Compression ratio = ${formatNumber(ratio)} : 1</strong><br>
                 The original file is ${formatNumber(ratio)} times the size of the compressed file.`;
        });


    /* --------------------------------
       PERCENTAGE REDUCTION
    -------------------------------- */

    document.getElementById("percentBtn")
        .addEventListener("click", () => {

            const original =
                Number(
                    document.getElementById(
                        "percentOriginal"
                    ).value
                );

            const compressed =
                Number(
                    document.getElementById(
                        "percentCompressed"
                    ).value
                );

            const result =
                document.getElementById("percentResult");

            if (
                original <= 0 ||
                compressed < 0 ||
                compressed > original
            ) {

                result.innerHTML =
                    "Please enter valid file sizes.";

                return;
            }

            const reduction =
                original - compressed;

            const percentage =
                (reduction / original) * 100;

            result.innerHTML =
                `<strong>Reduction = ${formatNumber(reduction)}</strong><br>
                 <strong>Percentage reduction = ${formatNumber(percentage)}%</strong>`;
        });


    /* --------------------------------
       REVERSE COMPRESSION
    -------------------------------- */

    document.getElementById("reverseBtn")
        .addEventListener("click", () => {

            const original =
                Number(
                    document.getElementById(
                        "reverseOriginal"
                    ).value
                );

            const percentage =
                Number(
                    document.getElementById(
                        "reversePercent"
                    ).value
                );

            const result =
                document.getElementById("reverseResult");

            if (
                original <= 0 ||
                percentage < 0 ||
                percentage > 100
            ) {

                result.innerHTML =
                    "Enter a valid original size and percentage.";

                return;
            }

            const removed =
                original * percentage / 100;

            const compressed =
                original - removed;

            result.innerHTML =
                `<strong>Amount removed:</strong>
                 ${formatNumber(removed)}<br>
                 <strong>Compressed size:</strong>
                 ${formatNumber(compressed)}`;
        });


    /* --------------------------------
       COMPARE TWO FILES
    -------------------------------- */

    document.getElementById("compareBtn")
        .addEventListener("click", () => {

            const a =
                Number(
                    document.getElementById(
                        "compareA"
                    ).value
                );

            const ac =
                Number(
                    document.getElementById(
                        "compareAC"
                    ).value
                );

            const b =
                Number(
                    document.getElementById(
                        "compareB"
                    ).value
                );

            const bc =
                Number(
                    document.getElementById(
                        "compareBC"
                    ).value
                );

            const result =
                document.getElementById(
                    "compareResult"
                );

            if (
                a <= 0 ||
                b <= 0 ||
                ac <= 0 ||
                bc <= 0 ||
                ac > a ||
                bc > b
            ) {

                result.innerHTML =
                    "Please enter valid file sizes.";

                return;
            }

            const ratioA = a / ac;
            const ratioB = b / bc;

            const reductionA =
                ((a - ac) / a) * 100;

            const reductionB =
                ((b - bc) / b) * 100;

            let better;

            if (reductionA > reductionB) {
                better = "File A has the greater percentage reduction.";
            } else if (reductionB > reductionA) {
                better = "File B has the greater percentage reduction.";
            } else {
                better = "Both files have the same percentage reduction.";
            }

            result.innerHTML =
                `<strong>File A</strong><br>
                 Ratio: ${formatNumber(ratioA)} : 1<br>
                 Reduction: ${formatNumber(reductionA)}%<br><br>

                 <strong>File B</strong><br>
                 Ratio: ${formatNumber(ratioB)} : 1<br>
                 Reduction: ${formatNumber(reductionB)}%<br><br>

                 <strong>${better}</strong>`;
        });


    /* --------------------------------
       THINKING
    -------------------------------- */

    const savedThinking =
        localStorage.getItem("DR-13-thinking");

    if (savedThinking) {

        document.getElementById(
            "thinkAnswer"
        ).value = savedThinking;
    }

    document.getElementById("saveThink")
        .addEventListener("click", () => {

            const text =
                document.getElementById(
                    "thinkAnswer"
                ).value.trim();

            localStorage.setItem(
                "DR-13-thinking",
                text
            );

            document.getElementById(
                "thinkSaved"
            ).textContent =
                "Your thinking has been saved on this device.";
        });


    /* --------------------------------
       FORMATIVE ASSESSMENT
    -------------------------------- */

    const answers = {

        q1: "b",
        q2: "b",
        q3: "c",
        q4: "c",
        q5: "b",
        q6: "a",
        q7: "c",
        q8: "b",
        q9: "b",
        q10: "c"

    };


    document.getElementById("assessmentForm")
        .addEventListener("submit", event => {

            event.preventDefault();

            let score = 0;

            Object.keys(answers).forEach(question => {

                const selected =
                    document.querySelector(
                        `input[name="${question}"]:checked`
                    );

                if (
                    selected &&
                    selected.value === answers[question]
                ) {
                    score++;
                }

            });

            const percentage =
                score * 10;

            localStorage.setItem(
                "DR-13-assessment",
                JSON.stringify({
                    score: score,
                    percentage: percentage,
                    date: new Date().toISOString()
                })
            );


            document.getElementById(
                "assessmentResult"
            ).innerHTML =
                `<strong>Score: ${score}/10 (${percentage}%)</strong>`;


            if (percentage >= 70) {

                document.getElementById(
                    "pathway"
                ).innerHTML =
                    `🎉 <strong>Mastery achieved!</strong><br>
                     You are ready for
                     <a href="DR-14.html">
                     DR-14 — Topic Review + Integrated Assessment
                     </a>.`;

            } else {

                document.getElementById(
                    "pathway"
                ).innerHTML =
                    `📘 <strong>More practice needed.</strong><br>
                     Revisit Lossless vs Lossy, Percentage Lab,
                     Ratio Lab and Fix the Mistake.
                     Then retake the assessment.`;

            }


            document.getElementById(
                "assessmentResult"
            ).scrollIntoView({
                behavior: "smooth"
            });

        });


    /* --------------------------------
       EXIT TICKET
    -------------------------------- */

    const savedExit =
        localStorage.getItem(
            "DR-13-exit-ticket"
        );

    if (savedExit) {

        const data =
            JSON.parse(savedExit);

        document.getElementById(
            "learned"
        ).value = data.learned || "";

        document.getElementById(
            "unclear"
        ).value = data.unclear || "";
    }


    document.getElementById("saveExit")
        .addEventListener("click", () => {

            const data = {

                learned:
                    document.getElementById(
                        "learned"
                    ).value,

                unclear:
                    document.getElementById(
                        "unclear"
                    ).value,

                date:
                    new Date().toISOString()

            };

            localStorage.setItem(
                "DR-13-exit-ticket",
                JSON.stringify(data)
            );

            document.getElementById(
                "exitSaved"
            ).innerHTML =
                `<div class="result">
                    Exit ticket saved successfully.
                 </div>`;
        });


    /* --------------------------------
       5-MINUTE GAME TIMER
    -------------------------------- */

    let timerSeconds = 300;
    let timerRunning = false;
    let timerInterval;

    const timerDisplay =
        document.getElementById("timer");

    const timerMessage =
        document.getElementById("timerMessage");


    function updateTimer() {

        const minutes =
            Math.floor(timerSeconds / 60);

        const seconds =
            timerSeconds % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }


    document.getElementById("startTimer")
        .addEventListener("click", () => {

            if (timerRunning) {
                return;
            }

            timerRunning = true;

            timerMessage.textContent =
                "Enjoy your 5-minute game break. Return when the timer finishes.";

            timerInterval =
                setInterval(() => {

                    timerSeconds--;

                    updateTimer();

                    if (timerSeconds <= 0) {

                        clearInterval(timerInterval);

                        timerRunning = false;

                        timerMessage.textContent =
                            "⏰ Time is up! Close the game and return to DR-13.";

                    }

                }, 1000);

        });


    updateTimer();

});


/* --------------------------------
   GLOBAL REVEAL FUNCTION
-------------------------------- */

function reveal(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    if (
        element.style.display === "none" ||
        element.style.display === ""
    ) {

        element.style.display = "block";

    } else {

        element.style.display = "none";

    }
}


/* --------------------------------
   SCENARIO FEEDBACK
-------------------------------- */

function scenarioAnswer(button, correct) {

    const container =
        button.parentElement;

    const feedback =
        container.querySelector(
            ".scenario-feedback"
        );

    if (correct) {

        feedback.textContent =
            "✓ Correct — good reasoning.";

    } else {

        feedback.textContent =
            "✗ Think again. Ask whether exact reconstruction is required.";

    }

}


/* --------------------------------
   QUICK CHECK
-------------------------------- */

function quick(button, correct) {

    const container =
        button.parentElement;

    const feedback =
        container.querySelector(".feedback");

    if (correct) {

        feedback.textContent =
            "✓ Correct!";

    } else {

        feedback.textContent =
            "✗ Try again.";

    }

}