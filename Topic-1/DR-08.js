document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       VISITED
       ===================================================== */

    localStorage.setItem("DR-08-visited", "true");


    /* =====================================================
       STUDIO TABS
       ===================================================== */

    const tabs =
        document.querySelectorAll(".studio-tab");

    const panels =
        document.querySelectorAll(".studio-panel");


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.tab;

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
       RESOLUTION CALCULATOR
       ===================================================== */

    const resolutionBtn =
        document.getElementById("resolutionBtn");

    if (resolutionBtn) {

        resolutionBtn.addEventListener("click", () => {

            const width =
                parseInt(
                    document.getElementById("imageWidth").value,
                    10
                );

            const height =
                parseInt(
                    document.getElementById("imageHeight").value,
                    10
                );

            const output =
                document.getElementById("resolutionResult");


            if (
                Number.isNaN(width) ||
                Number.isNaN(height) ||
                width < 1 ||
                height < 1
            ) {

                output.textContent =
                    "Please enter valid positive dimensions.";

                return;
            }


            const pixels =
                width * height;


            output.innerHTML =
                `Width: <code>${width}</code> pixels

                 Height: <code>${height}</code> pixels

                 Total pixels:
                 <strong>${pixels.toLocaleString()}</strong>`;

        });

    }


    /* =====================================================
       COLOUR DEPTH CALCULATOR
       ===================================================== */

    const depthBtn =
        document.getElementById("depthBtn");

    if (depthBtn) {

        depthBtn.addEventListener("click", () => {

            const depth =
                parseInt(
                    document.getElementById("depthInput").value,
                    10
                );

            const output =
                document.getElementById("depthResult");


            if (
                Number.isNaN(depth) ||
                depth < 1 ||
                depth > 32
            ) {

                output.textContent =
                    "Enter a colour depth between 1 and 32 bits.";

                return;
            }


            const colours =
                Math.pow(2, depth);


            output.innerHTML =
                `Colour depth:
                 <code>${depth}</code> bits

                 Possible colours:
                 <strong>${colours.toLocaleString()}</strong>

                 Rule:
                 <code>2^${depth}</code>`;

        });

    }


    /* =====================================================
       COMPARE IMAGES
       ===================================================== */

    const compareBtn =
        document.getElementById("compareBtn");

    if (compareBtn) {

        compareBtn.addEventListener("click", () => {

            const imageA =
                800 * 600 * 8;

            const imageB =
                1600 * 1200 * 24;

            const ratio =
                imageB / imageA;


            const output =
                document.getElementById("compareResult");


            output.innerHTML =
                `Image A pixel data:
                 <code>${imageA.toLocaleString()} bits</code>

                 Image B pixel data:
                 <code>${imageB.toLocaleString()} bits</code>

                 Image B requires approximately
                 <strong>${ratio}×</strong>
                 as much pixel data as Image A
                 before other file information and compression are considered.`;

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
                        : "Reveal Answer";

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


                if (
                    option.dataset.correct === "true"
                ) {

                    feedback.textContent =
                        "✓ Correct!";

                    feedback.style.color =
                        "#176b39";

                } else {

                    feedback.textContent =
                        "✗ Not quite. Think about the definition and try again.";

                    feedback.style.color =
                        "#9d2727";

                }

            });

        });


    /* =====================================================
       THINKING
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


        const previous =
            localStorage.getItem(storageKey);

        if (previous) {
            textarea.value = previous;
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
        "DR-08-thinking-1"
    );


    setupThinking(
        "thinkAnswer2",
        "saveThink2",
        "thinkSaved2",
        "DR-08-thinking-2"
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
        q3: "c",
        q4: "a",
        q5: "c",
        q6: "a",
        q7: "b",
        q8: "a",
        q9: "b",
        q10: "c"

    };


    if (assessmentForm) {

        assessmentForm.addEventListener(
            "submit",
            event => {

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
                    "DR-08-assessment",
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
                         <strong>DR-09 — Image Representation:
                         Calculations & File Size.</strong>

                         <br><br>

                         <a href="DR-09.html"
                            class="nav-button">

                            Continue to DR-09 →

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

                         <strong>
                         Do not rush ahead.
                         Strengthen the concepts first.
                         </strong>`;


                    remediationArea.classList.remove(
                        "hidden"
                    );

                }


                document.getElementById(
                    "masteryPanel"
                ).scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

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
                "Assessment reset. Work through the questions again.";

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
            `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

    }


    if (startTimer) {

        startTimer.addEventListener("click", () => {

            if (timerInterval) return;


            timerMessage.textContent =
                "Enjoy your five-minute computational-thinking break!";


            timerInterval =
                setInterval(() => {

                    secondsRemaining--;

                    updateTimer();


                    if (secondsRemaining <= 0) {

                        clearInterval(timerInterval);

                        timerInterval = null;


                        timerMessage.textContent =
                            "⏰ Five minutes are up. Close the game and return to DR-08.";

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
                "DR-08-exit-ticket"
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
                "DR-08-exit-ticket",
                JSON.stringify(data)
            );


            exitSaved.textContent =
                "✓ Exit ticket saved on this device.";

        });

    }

});