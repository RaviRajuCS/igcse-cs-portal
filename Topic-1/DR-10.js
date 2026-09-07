/* =========================================================
   DR-10 — Sound Representation
   Design and Content by Ravi Raju
   Offline-first JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       TAB SYSTEM
       ===================================================== */

    const tabs = document.querySelectorAll(".studio-tab");
    const panels = document.querySelectorAll(".studio-panel");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            panels.forEach(panel => {
                panel.classList.remove("active");
            });

            tab.classList.add("active");

            const targetPanel =
                document.getElementById(target);

            if (targetPanel) {
                targetPanel.classList.add("active");
            }

        });

    });


    /* =====================================================
       SOUND REFLECTION
       ===================================================== */

    const soundReflection =
        document.getElementById("soundReflection");

    const saveSoundReflection =
        document.getElementById("saveSoundReflection");

    const soundSaved =
        document.getElementById("soundSaved");

    const storedReflection =
        localStorage.getItem("DR-10-sound-reflection");

    if (storedReflection && soundReflection) {
        soundReflection.value = storedReflection;
    }

    if (saveSoundReflection) {

        saveSoundReflection.addEventListener("click", () => {

            localStorage.setItem(
                "DR-10-sound-reflection",
                soundReflection.value
            );

            soundSaved.textContent =
                "✓ Explanation saved on this device.";

        });

    }


    /* =====================================================
       SAMPLING CANVAS
       ===================================================== */

    const canvas =
        document.getElementById("samplingCanvas");

    const sampleSlider =
        document.getElementById("sampleSlider");

    const sampleCountLabel =
        document.getElementById("sampleCountLabel");

    const samplingExplanation =
        document.getElementById("samplingExplanation");


    function drawSamplingWave() {

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");

        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        /*
         * Draw the continuous wave.
         */

        ctx.beginPath();

        for (let x = 0; x <= width; x++) {

            const y =
                height / 2 +
                Math.sin(x * 0.025) * 75;

            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

        }

        ctx.strokeStyle = "#14532d";
        ctx.lineWidth = 4;
        ctx.stroke();


        /*
         * Draw the sample points.
         */

        const count =
            Number(sampleSlider.value);

        for (let i = 0; i < count; i++) {

            const x =
                (i / (count - 1)) * width;

            const y =
                height / 2 +
                Math.sin(x * 0.025) * 75;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                7,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = "#d9a800";
            ctx.fill();

        }


        sampleCountLabel.textContent = count;

        if (count <= 8) {

            samplingExplanation.textContent =
                `${count} samples are shown. There are relatively few measurements of the changing signal.`;

        } else if (count <= 18) {

            samplingExplanation.textContent =
                `${count} samples are shown. More measurements capture more detail about changes in the signal.`;

        } else {

            samplingExplanation.textContent =
                `${count} samples are shown. The signal is being measured much more frequently.`;

        }

    }


    if (sampleSlider) {

        sampleSlider.addEventListener(
            "input",
            drawSamplingWave
        );

        drawSamplingWave();

    }


    /* =====================================================
       SAMPLE RATE LAB
       ===================================================== */

    const rateExplain =
        document.getElementById("rateExplain");

    if (rateExplain) {

        rateExplain.addEventListener("click", () => {

            const rate =
                Number(
                    document.getElementById(
                        "sampleRateInput"
                    ).value
                );

            const result =
                document.getElementById("rateResult");

            if (
                !Number.isFinite(rate) ||
                rate <= 0
            ) {

                result.innerHTML = `
                    <h3>Check the value</h3>
                    <p>Enter a positive sample rate.</p>
                `;

                return;

            }

            result.innerHTML = `
                <h3>Sample Rate Analysis</h3>

                <div class="result-line">
                    Sample rate:
                    <strong>${rate.toLocaleString()} samples/second</strong>
                </div>

                <div class="result-line">
                    Meaning:
                    <strong>${rate.toLocaleString()} measurements are taken
                    every second.</strong>
                </div>

                <p>
                    A higher sample rate means measurements are taken more
                    frequently, providing more information about how the
                    signal changes over time.
                </p>
            `;

        });

    }


    /* =====================================================
       SAMPLE RESOLUTION LAB
       ===================================================== */

    const bitOptions =
        document.querySelectorAll(".bit-option");

    const resolutionResult =
        document.getElementById("resolutionResult");

    bitOptions.forEach(button => {

        button.addEventListener("click", () => {

            const bits =
                Number(button.dataset.bits);

            const levels =
                Math.pow(2, bits);

            resolutionResult.innerHTML = `
                <strong>${bits}-bit sample resolution</strong>
                gives

                <strong>${levels.toLocaleString()}</strong>

                possible digital values for each sample.

                <br><br>

                Formula:

                <strong>2<sup>${bits}</sup>
                = ${levels.toLocaleString()}</strong>
            `;

        });

    });


    /* =====================================================
       QUANTISATION
       ===================================================== */

    const quantButtons =
        document.querySelectorAll(
            ".quant-choice-button"
        );

    const quantFeedback =
        document.getElementById("quantFeedback");

    quantButtons.forEach(button => {

        button.addEventListener("click", () => {

            const choice =
                button.dataset.choice;

            if (choice === "low") {

                quantFeedback.innerHTML = `
                    <strong>Lower level selected.</strong><br>
                    The measured analogue value is being represented by the
                    lower available digital level. This illustrates the idea
                    that a continuous value must be mapped to a discrete value.
                `;

            } else {

                quantFeedback.innerHTML = `
                    <strong>Higher level selected.</strong><br>
                    The measured analogue value is being represented by the
                    higher available digital level. The important idea is
                    that the digital system has a finite set of possible
                    levels.
                `;

            }

        });

    });


    /* =====================================================
       AUDIO COMPARISON
       ===================================================== */

    const compareAudio =
        document.getElementById("compareAudio");

    if (compareAudio) {

        compareAudio.addEventListener("click", () => {

            const aRate =
                Number(
                    document.getElementById(
                        "audioARate"
                    ).value
                );

            const aDepth =
                Number(
                    document.getElementById(
                        "audioADepth"
                    ).value
                );

            const bRate =
                Number(
                    document.getElementById(
                        "audioBRate"
                    ).value
                );

            const bDepth =
                Number(
                    document.getElementById(
                        "audioBDepth"
                    ).value
                );

            /*
             * Relative raw-data requirement for equal-duration
             * recordings is proportional to:
             *
             * sample rate × bits per sample
             */

            const aData =
                aRate * aDepth;

            const bData =
                bRate * bDepth;

            const result =
                document.getElementById(
                    "audioComparison"
                );

            let comparison;

            if (aData > bData) {

                comparison = `
                    <strong>Audio A requires more raw data
                    for the same duration.</strong><br><br>

                    A relative data rate:
                    ${aRate.toLocaleString()} × ${aDepth}
                    = ${aData.toLocaleString()}<br>

                    B relative data rate:
                    ${bRate.toLocaleString()} × ${bDepth}
                    = ${bData.toLocaleString()}<br><br>

                    A requires approximately
                    <strong>${(aData / bData).toFixed(2)}×</strong>
                    as much raw sample data as B.
                `;

            } else if (bData > aData) {

                comparison = `
                    <strong>Audio B requires more raw data
                    for the same duration.</strong><br><br>

                    A relative data rate:
                    ${aData.toLocaleString()}<br>

                    B relative data rate:
                    ${bData.toLocaleString()}<br><br>

                    B requires approximately
                    <strong>${(bData / aData).toFixed(2)}×</strong>
                    as much raw sample data as A.
                `;

            } else {

                comparison = `
                    <strong>Both settings require the same amount
                    of raw sample data per second.</strong>
                `;

            }

            result.innerHTML = comparison;

        });

    }


    /* =====================================================
       REASONING PRACTICE
       ===================================================== */

    document.querySelectorAll(
        ".reveal-button"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const answer =
                button.dataset.answer;

            const answerBox =
                button.nextElementSibling;

            answerBox.textContent = answer;

            button.textContent =
                "Answer Revealed";

            button.disabled = true;

        });

    });


    /* =====================================================
       MISTAKE DIAGNOSIS
       ===================================================== */

    const mistakeButtons =
        document.querySelectorAll(
            "[data-mistake]"
        );

    mistakeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const number =
                button.dataset.mistake;

            const diagnosis =
                document.getElementById(
                    `diagnosis${number}`
                );

            const explanations = {

                "1": `
                    <strong>Incorrect.</strong><br><br>
                    Sampling is part of converting an analogue signal into
                    digital data. It involves taking measurements from the
                    analogue signal. Converting digital data back into sound
                    is a different process.
                `,

                "2": `
                    <strong>Incorrect.</strong><br><br>
                    Sample rate is the number of samples taken per second.
                    The number of bits used for each sample is the sample
                    resolution or bit depth.
                `,

                "3": `
                    <strong>Incorrect.</strong><br><br>
                    Increasing sample resolution means more bits are available
                    for each sample. Therefore there are MORE possible digital
                    values, not fewer.
                `,

                "4": `
                    <strong>Not quite.</strong><br><br>
                    The original sound is continuous, while the digital
                    representation consists of discrete sampled values.
                    The goal is to make the digital representation an accurate
                    representation of the original signal.
                `

            };

            diagnosis.innerHTML =
                explanations[number];

            button.textContent =
                "Diagnosis Shown";

            button.disabled = true;

        });

    });


    /* =====================================================
       THINK DEEPER
       ===================================================== */

    const deepThinking =
        document.getElementById("deepThinking");

    const saveDeepThinking =
        document.getElementById("saveDeepThinking");

    const deepSaved =
        document.getElementById("deepSaved");

    const storedDeep =
        localStorage.getItem("DR-10-deep-thinking");

    if (storedDeep && deepThinking) {
        deepThinking.value = storedDeep;
    }

    if (saveDeepThinking) {

        saveDeepThinking.addEventListener("click", () => {

            localStorage.setItem(
                "DR-10-deep-thinking",
                deepThinking.value
            );

            deepSaved.textContent =
                "✓ Thinking saved on this device.";

        });

    }


    /* =====================================================
       QUICK CHECK
       ===================================================== */

    document.querySelectorAll(
        ".quick-item button"
    ).forEach(button => {

        button.addEventListener("click", () => {

            const answer =
                button.dataset.answer;

            const target =
                button.nextElementSibling;

            target.textContent = answer;

            button.textContent = "✓";

            button.disabled = true;

        });

    });


    /* =====================================================
       FORMATIVE ASSESSMENT
       ===================================================== */

    const assessmentForm =
        document.getElementById(
            "assessmentForm"
        );

    const answers = {

        q1: "b",
        q2: "b",
        q3: "b",
        q4: "b",
        q5: "b",
        q6: "a",
        q7: "b",
        q8: "b",
        q9: "b",
        q10: "c"

    };


    if (assessmentForm) {

        assessmentForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                let score = 0;

                const total =
                    Object.keys(answers).length;

                Object.keys(answers).forEach(
                    question => {

                        const selected =
                            assessmentForm.querySelector(
                                `input[name="${question}"]:checked`
                            );

                        if (
                            selected &&
                            selected.value ===
                            answers[question]
                        ) {

                            score++;

                        }

                    }
                );

                const percentage =
                    Math.round(
                        (score / total) * 100
                    );


                localStorage.setItem(
                    "DR-10-assessment",
                    JSON.stringify({
                        score: score,
                        total: total,
                        percentage: percentage,
                        date:
                            new Date().toISOString()
                    })
                );


                const result =
                    document.getElementById(
                        "assessmentResult"
                    );

                const remediation =
                    document.getElementById(
                        "remediation"
                    );

                const mastery =
                    document.getElementById(
                        "mastery"
                    );


                result.innerHTML = `
                    <h3>Assessment Result</h3>

                    <p>
                        You scored
                        <strong>
                            ${score} / ${total}
                        </strong>
                        (${percentage}%).
                    </p>
                `;


                remediation.classList.add(
                    "hidden"
                );

                mastery.classList.add(
                    "hidden"
                );


                if (percentage >= 70) {

                    result.innerHTML += `
                        <p>
                            <strong>
                                Mastery threshold achieved.
                            </strong>
                            You are ready for the calculation work
                            in DR-11.
                        </p>
                    `;

                    mastery.classList.remove(
                        "hidden"
                    );

                } else {

                    result.innerHTML += `
                        <p>
                            Review the core concepts and then retake
                            the assessment.
                        </p>
                    `;

                    remediation.classList.remove(
                        "hidden"
                    );

                }


                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }


    /* =====================================================
       RETAKE
       ===================================================== */

    const retakeButton =
        document.getElementById(
            "retakeButton"
        );

    if (retakeButton) {

        retakeButton.addEventListener(
            "click",
            () => {

                assessmentForm.reset();

                document.getElementById(
                    "assessmentResult"
                ).innerHTML = "";

                document.getElementById(
                    "remediation"
                ).classList.add("hidden");

                document.getElementById(
                    "mastery"
                ).classList.add("hidden");

                assessmentForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =====================================================
       EXIT TICKET
       ===================================================== */

    const exitSampling =
        document.getElementById(
            "exitSampling"
        );

    const exitDifference =
        document.getElementById(
            "exitDifference"
        );

    const exitPractice =
        document.getElementById(
            "exitPractice"
        );

    const saveExit =
        document.getElementById(
            "saveExit"
        );

    const exitSaved =
        document.getElementById(
            "exitSaved"
        );


    const storedExit =
        localStorage.getItem(
            "DR-10-exit-ticket"
        );


    if (storedExit) {

        try {

            const data =
                JSON.parse(storedExit);

            exitSampling.value =
                data.sampling || "";

            exitDifference.value =
                data.difference || "";

            exitPractice.value =
                data.practice || "";

        } catch (error) {

            console.log(
                "Previous exit ticket could not be loaded."
            );

        }

    }


    if (saveExit) {

        saveExit.addEventListener(
            "click",
            () => {

                const data = {

                    sampling:
                        exitSampling.value,

                    difference:
                        exitDifference.value,

                    practice:
                        exitPractice.value,

                    date:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "DR-10-exit-ticket",
                    JSON.stringify(data)
                );


                exitSaved.textContent =
                    "✓ Exit ticket saved on this device.";

            }
        );

    }


    /* =====================================================
       BLOCKLY GAME — FIVE MINUTES
       ===================================================== */

    const startGame =
        document.getElementById(
            "startGame"
        );

    const gameTimer =
        document.getElementById(
            "gameTimer"
        );

    const gameMessage =
        document.getElementById(
            "gameMessage"
        );


    let gameSeconds = 300;
    let gameInterval = null;


    function updateTimer() {

        const minutes =
            Math.floor(
                gameSeconds / 60
            )
            .toString()
            .padStart(2, "0");

        const seconds =
            (gameSeconds % 60)
            .toString()
            .padStart(2, "0");

        gameTimer.textContent =
            `${minutes}:${seconds}`;

    }


    if (startGame) {

        startGame.addEventListener(
            "click",
            () => {

                if (gameInterval) {
                    return;
                }

                gameSeconds = 300;

                updateTimer();

                startGame.textContent =
                    "Break Running";

                startGame.disabled = true;

                gameMessage.textContent =
                    "Your 5-minute programming break has started.";

                gameInterval =
                    setInterval(() => {

                        gameSeconds--;

                        updateTimer();


                        if (gameSeconds <= 0) {

                            clearInterval(
                                gameInterval
                            );

                            gameInterval = null;

                            gameTimer.textContent =
                                "00:00";

                            gameMessage.textContent =
                                "⏰ Break finished. Close Blockly Music and return to DR-10.";

                            startGame.textContent =
                                "Break Completed";

                        }

                    }, 1000);

            }
        );

    }


    /* =====================================================
       VISITED FLAG
       ===================================================== */

    localStorage.setItem(
        "DR-10-visited",
        new Date().toISOString()
    );


    /* =====================================================
       CONSOLE CONFIRMATION
       ===================================================== */

    console.log(
        "DR-10 Sound Representation loaded successfully."
    );

});