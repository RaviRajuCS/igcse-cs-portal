document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       VISITED FLAG
       ===================================================== */

    localStorage.setItem("DR-07-visited", "true");


    /* =====================================================
       STUDIO TABS
       ===================================================== */

    const tabs = document.querySelectorAll(".studio-tab");
    const panels = document.querySelectorAll(".studio-panel");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            tabs.forEach(item =>
                item.classList.remove("active")
            );

            panels.forEach(panel =>
                panel.classList.remove("active")
            );

            tab.classList.add("active");

            const targetPanel =
                document.getElementById(target);

            if (targetPanel) {
                targetPanel.classList.add("active");
            }

        });

    });


    /* =====================================================
       CHARACTER EXPLORER
       ===================================================== */

    const characterBtn =
        document.getElementById("characterBtn");

    if (characterBtn) {

        characterBtn.addEventListener("click", () => {

            const input =
                document.getElementById("characterInput")
                    .value;

            const output =
                document.getElementById("characterResult");

            if (input.length !== 1) {

                output.textContent =
                    "Please enter exactly one character.";

                return;
            }

            const code =
                input.charCodeAt(0);

            if (code > 127) {

                output.textContent =
                    "This character is outside the original ASCII range.";

                return;
            }

            const binary =
                code.toString(2).padStart(7, "0");

            const binary8 =
                binary.padStart(8, "0");

            output.innerHTML =
                `Character:
                 <strong>${input}</strong>

                 ASCII denary:
                 <code>${code}</code>

                 7-bit binary:
                 <code>${binary}</code>

                 8-bit padded form:
                 <code>${binary8}</code>`;

        });

    }


    /* =====================================================
       ASCII DECODER
       ===================================================== */

    const asciiBtn =
        document.getElementById("asciiBtn");

    if (asciiBtn) {

        asciiBtn.addEventListener("click", () => {

            const value =
                parseInt(
                    document.getElementById("asciiInput").value,
                    10
                );

            const output =
                document.getElementById("asciiResult");

            if (
                Number.isNaN(value) ||
                value < 0 ||
                value > 127
            ) {

                output.textContent =
                    "Enter an ASCII value from 0 to 127.";

                return;
            }

            const character =
                String.fromCharCode(value);

            const binary =
                value.toString(2).padStart(7, "0");

            output.innerHTML =
                `ASCII code:
                 <code>${value}</code>

                 7-bit binary:
                 <code>${binary}</code>

                 Character:
                 <strong>${character}</strong>`;

        });

    }


    /* =====================================================
       BINARY CHARACTER DECODER
       ===================================================== */

    const binaryCharBtn =
        document.getElementById("binaryCharBtn");

    if (binaryCharBtn) {

        binaryCharBtn.addEventListener("click", () => {

            const binary =
                document.getElementById("binaryCharInput")
                    .value
                    .trim();

            const output =
                document.getElementById("binaryCharResult");

            if (!/^[01]{7}$/.test(binary)) {

                output.textContent =
                    "Please enter exactly 7 binary digits.";

                return;
            }

            const decimal =
                parseInt(binary, 2);

            const character =
                String.fromCharCode(decimal);

            output.innerHTML =
                `Binary:
                 <code>${binary}</code>

                 Denary:
                 <strong>${decimal}</strong>

                 Character:
                 <strong>${character}</strong>`;

        });

    }


    /* =====================================================
       HIDDEN ANSWERS
       ===================================================== */

    document.querySelectorAll(".answer-button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id =
                    button.dataset.answer;

                const answer =
                    document.getElementById(id);

                if (!answer) return;

                answer.classList.toggle("show");

                button.textContent =
                    answer.classList.contains("show")
                        ? "Hide Answer"
                        : "Show Answer";

            });

        });


    /* =====================================================
       QUICK CHECK
       ===================================================== */

    document.querySelectorAll(".quick-option")
        .forEach(option => {

            option.addEventListener("click", () => {

                const question =
                    option.dataset.q;

                const feedback =
                    document.getElementById(
                        `feedback${question}`
                    );

                if (option.dataset.correct === "true") {

                    feedback.textContent =
                        "✓ Correct!";

                    feedback.style.color =
                        "#176b39";

                } else {

                    feedback.textContent =
                        "✗ Not quite. Try again.";

                    feedback.style.color =
                        "#9d2727";

                }

            });

        });


    /* =====================================================
       THINKING RESPONSES
       ===================================================== */

    function setupThinking(
        textareaId,
        buttonId,
        outputId,
        storageKey
    ) {

        const textarea =
            document.getElementById(textareaId);

        const button =
            document.getElementById(buttonId);

        const output =
            document.getElementById(outputId);

        if (!textarea || !button || !output) {
            return;
        }

        const saved =
            localStorage.getItem(storageKey);

        if (saved) {
            textarea.value = saved;
        }

        button.addEventListener("click", () => {

            localStorage.setItem(
                storageKey,
                textarea.value
            );

            output.textContent =
                "✓ Your thinking has been saved on this device.";

        });

    }


    setupThinking(
        "thinkAnswer",
        "saveThink",
        "thinkSaved",
        "DR-07-thinking-1"
    );

    setupThinking(
        "thinkAnswer2",
        "saveThink2",
        "thinkSaved2",
        "DR-07-thinking-2"
    );


    /* =====================================================
       ASSESSMENT
       ===================================================== */

    const assessmentForm =
        document.getElementById("assessmentForm");

    const assessmentResult =
        document.getElementById("assessmentResult");

    const masteryMessage =
        document.getElementById("masteryMessage");

    const remediationArea =
        document.getElementById("remediationArea");


    const correctAnswers = {

        q1: "b",
        q2: "b",
        q3: "b",
        q4: "b",
        q5: "b",
        q6: "a",
        q7: "b",
        q8: "b",
        q9: "b",
        q10: "b"

    };


    if (assessmentForm) {

        assessmentForm.addEventListener("submit", event => {

            event.preventDefault();

            let score = 0;

            Object.keys(correctAnswers)
                .forEach(question => {

                    const selected =
                        assessmentForm.querySelector(
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
                "DR-07-assessment",
                percentage
            );


            assessmentResult.textContent =
                `You scored ${score}/10 (${percentage}%).`;


            if (percentage >= 70) {

                assessmentResult.style.background =
                    "rgba(22,107,57,0.16)";

                assessmentResult.style.color =
                    "#176b39";


                masteryMessage.innerHTML =
                    `🎉 <strong>Mastery achieved!</strong>
                     You scored ${percentage}%.
                     You are ready for
                     <strong>DR-08 — Image Representation.</strong>
                     <br><br>

                     <a href="DR-08.html"
                        class="nav-button">
                        Continue to DR-08 →
                     </a>`;


                remediationArea.classList.add(
                    "hidden"
                );

            } else {

                assessmentResult.style.background =
                    "rgba(157,39,39,0.12)";

                assessmentResult.style.color =
                    "#9d2727";


                masteryMessage.innerHTML =
                    `You scored ${percentage}%.
                     <strong>Let's strengthen your understanding
                     before moving on.</strong>`;


                remediationArea.classList.remove(
                    "hidden"
                );

            }


            document.getElementById(
                "masteryPanel"
            ).scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       RETAKE
       ===================================================== */

    const retakeBtn =
        document.getElementById("retakeBtn");

    if (retakeBtn) {

        retakeBtn.addEventListener("click", () => {

            assessmentForm.reset();

            assessmentResult.textContent = "";

            masteryMessage.textContent =
                "Assessment reset. Have another try.";

            remediationArea.classList.add(
                "hidden"
            );

            assessmentForm.scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       GAME TIMER
       ===================================================== */

    const timerDisplay =
        document.getElementById("gameTimer");

    const startTimer =
        document.getElementById("startTimer");

    const stopTimer =
        document.getElementById("stopTimer");

    const timerMessage =
        document.getElementById("timerMessage");

    let timerInterval = null;
    let secondsRemaining = 300;


    function updateTimer() {

        const minutes =
            Math.floor(secondsRemaining / 60);

        const seconds =
            secondsRemaining % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    }


    if (startTimer) {

        startTimer.addEventListener("click", () => {

            if (timerInterval) return;

            timerMessage.textContent =
                "Enjoy your five-minute break!";

            timerInterval =
                setInterval(() => {

                    secondsRemaining--;

                    updateTimer();

                    if (secondsRemaining <= 0) {

                        clearInterval(timerInterval);

                        timerInterval = null;

                        timerMessage.textContent =
                            "⏰ Five minutes are up. Close the game and return to your lesson.";

                    }

                }, 1000);

        });

    }


    if (stopTimer) {

        stopTimer.addEventListener("click", () => {

            clearInterval(timerInterval);

            timerInterval = null;

            timerMessage.textContent =
                "Timer stopped.";

        });

    }


    updateTimer();


    /* =====================================================
       EXIT TICKET
       ===================================================== */

    const exitLearned =
        document.getElementById("exitLearned");

    const exitUnclear =
        document.getElementById("exitUnclear");

    const saveExit =
        document.getElementById("saveExit");

    const exitSaved =
        document.getElementById("exitSaved");


    const previousExit =
        JSON.parse(
            localStorage.getItem(
                "DR-07-exit-ticket"
            ) || "{}"
        );


    if (exitLearned) {
        exitLearned.value =
            previousExit.learned || "";
    }


    if (exitUnclear) {
        exitUnclear.value =
            previousExit.unclear || "";
    }


    if (saveExit) {

        saveExit.addEventListener("click", () => {

            const data = {

                learned:
                    exitLearned.value.trim(),

                unclear:
                    exitUnclear.value.trim(),

                savedAt:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "DR-07-exit-ticket",
                JSON.stringify(data)
            );


            exitSaved.textContent =
                "✓ Exit ticket saved on this device.";

        });

    }

});