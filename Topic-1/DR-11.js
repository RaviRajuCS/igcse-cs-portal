/* =========================================================
   DR-11 — Sound Calculations & File Size
   Design and Content by Ravi Raju
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       TAB SYSTEM
       ===================================================== */

    const tabs =
        document.querySelectorAll(".studio-tab");

    const panels =
        document.querySelectorAll(".studio-panel");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.tab;

            tabs.forEach(t =>
                t.classList.remove("active")
            );

            panels.forEach(p =>
                p.classList.remove("active")
            );

            tab.classList.add("active");

            const panel =
                document.getElementById(target);

            if (panel) {
                panel.classList.add("active");
            }

        });

    });


    /* =====================================================
       FORMULA BUILDER
       ===================================================== */

    const checkBuilder =
        document.getElementById("checkBuilder");

    if (checkBuilder) {

        checkBuilder.addEventListener(
            "click",
            () => {

                const values = [
                    document.getElementById("builder1").value,
                    document.getElementById("builder2").value,
                    document.getElementById("builder3").value,
                    document.getElementById("builder4").value
                ];

                const feedback =
                    document.getElementById(
                        "builderFeedback"
                    );

                const correct =
                    values.length === 4 &&
                    values.every(v => v !== "") &&
                    new Set(values).size === 4;

                if (correct) {

                    feedback.innerHTML = `
                        <strong>✓ Correct!</strong><br>
                        File size in bits =
                        sample rate × sample resolution ×
                        duration × channels.
                    `;

                } else {

                    feedback.innerHTML = `
                        <strong>Not quite.</strong><br>
                        The four different factors are:
                        sample rate, sample resolution,
                        duration and number of channels.
                    `;

                }

            }
        );

    }


    /* =====================================================
       GENERAL CALCULATION FUNCTION
       ===================================================== */

    function calculateBits(
        rate,
        depth,
        duration,
        channels
    ) {

        return (
            rate *
            depth *
            duration *
            channels
        );

    }


    /* =====================================================
       FULL CALCULATOR
       ===================================================== */

    const calculateSound =
        document.getElementById(
            "calculateSound"
        );

    if (calculateSound) {

        calculateSound.addEventListener(
            "click",
            () => {

                const rate =
                    Number(
                        document.getElementById(
                            "calcRate"
                        ).value
                    );

                const depth =
                    Number(
                        document.getElementById(
                            "calcDepth"
                        ).value
                    );

                const duration =
                    Number(
                        document.getElementById(
                            "calcDuration"
                        ).value
                    );

                const channels =
                    Number(
                        document.getElementById(
                            "calcChannels"
                        ).value
                    );

                const unit =
                    document.getElementById(
                        "calcUnit"
                    ).value;

                const result =
                    document.getElementById(
                        "calculatorResult"
                    );


                if (
                    !Number.isFinite(rate) ||
                    !Number.isFinite(depth) ||
                    !Number.isFinite(duration) ||
                    rate <= 0 ||
                    depth <= 0 ||
                    duration <= 0
                ) {

                    result.innerHTML = `
                        <h3>Check your values</h3>
                        <p>
                            All numerical values must be positive.
                        </p>
                    `;

                    return;

                }


                const bits =
                    calculateBits(
                        rate,
                        depth,
                        duration,
                        channels
                    );

                const bytes =
                    bits / 8;

                const kib =
                    bytes / 1024;

                const mib =
                    kib / 1024;

                const gib =
                    mib / 1024;


                const values = {
                    bits,
                    bytes,
                    KiB: kib,
                    MiB: mib,
                    GiB: gib
                };


                result.innerHTML = `

                    <h3>Calculation Breakdown</h3>

                    <div class="result-line">
                        Sample rate:
                        <strong>
                            ${rate.toLocaleString()} samples/s
                        </strong>
                    </div>

                    <div class="result-line">
                        Sample resolution:
                        <strong>
                            ${depth} bits/sample
                        </strong>
                    </div>

                    <div class="result-line">
                        Duration:
                        <strong>
                            ${duration.toLocaleString()} seconds
                        </strong>
                    </div>

                    <div class="result-line">
                        Channels:
                        <strong>
                            ${channels}
                        </strong>
                    </div>

                    <div class="result-line">
                        Raw bits:
                        <strong>
                            ${bits.toLocaleString()}
                        </strong>
                    </div>

                    <div class="result-line">
                        Bytes:
                        <strong>
                            ${bytes.toLocaleString()}
                        </strong>
                    </div>

                    <div class="result-line">
                        KiB:
                        <strong>
                            ${kib.toLocaleString(
                                undefined,
                                { maximumFractionDigits: 4 }
                            )}
                        </strong>
                    </div>

                    <div class="result-line">
                        MiB:
                        <strong>
                            ${mib.toLocaleString(
                                undefined,
                                { maximumFractionDigits: 6 }
                            )}
                        </strong>
                    </div>

                    <div class="result-final">

                        ${values[unit].toLocaleString(
                            undefined,
                            { maximumFractionDigits: 6 }
                        )}
                        ${unit}

                    </div>

                `;

            }
        );

    }


    /* =====================================================
       UNIT CONVERTER
       ===================================================== */

    const convertUnits =
        document.getElementById(
            "convertUnits"
        );

    if (convertUnits) {

        convertUnits.addEventListener(
            "click",
            () => {

                const value =
                    Number(
                        document.getElementById(
                            "unitValue"
                        ).value
                    );

                const from =
                    document.getElementById(
                        "unitFrom"
                    ).value;

                const result =
                    document.getElementById(
                        "unitResult"
                    );


                if (
                    !Number.isFinite(value) ||
                    value < 0
                ) {

                    result.innerHTML =
                        "<p>Enter a valid non-negative number.</p>";

                    return;

                }


                let bytes;

                switch (from) {

                    case "bits":
                        bytes = value / 8;
                        break;

                    case "bytes":
                        bytes = value;
                        break;

                    case "KiB":
                        bytes = value * 1024;
                        break;

                    case "MiB":
                        bytes = value * 1024 * 1024;
                        break;

                    case "GiB":
                        bytes =
                            value *
                            1024 *
                            1024 *
                            1024;
                        break;

                }


                const conversions = {

                    bits: bytes * 8,

                    bytes: bytes,

                    KiB: bytes / 1024,

                    MiB:
                        bytes /
                        (1024 * 1024),

                    GiB:
                        bytes /
                        (1024 * 1024 * 1024)

                };


                let html = "";

                Object.keys(conversions)
                    .forEach(unit => {

                        html += `
                            <div class="unit-result-row">

                                <span>
                                    ${unit}
                                </span>

                                <strong>
                                    ${conversions[unit]
                                        .toLocaleString(
                                            undefined,
                                            {
                                                maximumFractionDigits: 8
                                            }
                                        )}
                                </strong>

                            </div>
                        `;

                    });


                result.innerHTML = html;

            }
        );

    }


    /* =====================================================
       REVERSE CALCULATOR
       ===================================================== */

    const reverseCalculate =
        document.getElementById(
            "reverseCalculate"
        );

    if (reverseCalculate) {

        reverseCalculate.addEventListener(
            "click",
            () => {

                const bits =
                    Number(
                        document.getElementById(
                            "reverseBits"
                        ).value
                    );

                const rate =
                    Number(
                        document.getElementById(
                            "reverseRate"
                        ).value
                    );

                const depth =
                    Number(
                        document.getElementById(
                            "reverseDepth"
                        ).value
                    );

                const duration =
                    Number(
                        document.getElementById(
                            "reverseDuration"
                        ).value
                    );

                const channels =
                    Number(
                        document.getElementById(
                            "reverseChannels"
                        ).value
                    );

                const target =
                    document.getElementById(
                        "reverseTarget"
                    ).value;

                const result =
                    document.getElementById(
                        "reverseResult"
                    );


                let answer;
                let explanation;


                switch (target) {

                    case "rate":

                        answer =
                            bits /
                            (
                                depth *
                                duration *
                                channels
                            );

                        explanation =
                            `
                            Sample rate =
                            file size ÷
                            (bit depth × duration × channels)
                            `;

                        break;


                    case "depth":

                        answer =
                            bits /
                            (
                                rate *
                                duration *
                                channels
                            );

                        explanation =
                            `
                            Sample resolution =
                            file size ÷
                            (sample rate × duration × channels)
                            `;

                        break;


                    case "duration":

                        answer =
                            bits /
                            (
                                rate *
                                depth *
                                channels
                            );

                        explanation =
                            `
                            Duration =
                            file size ÷
                            (sample rate × bit depth × channels)
                            `;

                        break;


                    case "channels":

                        answer =
                            bits /
                            (
                                rate *
                                depth *
                                duration
                            );

                        explanation =
                            `
                            Channels =
                            file size ÷
                            (sample rate × bit depth × duration)
                            `;

                        break;

                }


                result.innerHTML = `

                    <h3>Reverse Calculation</h3>

                    <p>
                        ${explanation}
                    </p>

                    <div class="result-final">
                        ${answer.toLocaleString(
                            undefined,
                            {
                                maximumFractionDigits: 6
                            }
                        )}
                    </div>

                `;

            }
        );

    }


    /* =====================================================
       COMPARE RECORDINGS
       ===================================================== */

    const compareRecordings =
        document.getElementById(
            "compareRecordings"
        );

    if (compareRecordings) {

        compareRecordings.addEventListener(
            "click",
            () => {

                const aBits =
                    calculateBits(
                        Number(
                            document.getElementById(
                                "aRate"
                            ).value
                        ),
                        Number(
                            document.getElementById(
                                "aDepth"
                            ).value
                        ),
                        Number(
                            document.getElementById(
                                "aDuration"
                            ).value
                        ),
                        Number(
                            document.getElementById(
                                "aChannels"
                            ).value
                        )
                    );


                const bBits =
                    calculateBits(
                        Number(
                            document.getElementById(
                                "bRate"
                            ).value
                        ),
                        Number(
                            document.getElementById(
                                "bDepth"
                            ).value
                        ),
                        Number(
                            document.getElementById(
                                "bDuration"
                            ).value
                        ),
                        Number(
                            document.getElementById(
                                "bChannels"
                            ).value
                        )
                    );


                const result =
                    document.getElementById(
                        "recordingComparison"
                    );


                const aMiB =
                    aBits /
                    8 /
                    1024 /
                    1024;

                const bMiB =
                    bBits /
                    8 /
                    1024 /
                    1024;


                let message;


                if (aBits > bBits) {

                    message = `
                        <strong>
                            Recording A requires more raw data.
                        </strong><br><br>

                        A:
                        ${aMiB.toFixed(4)} MiB<br>

                        B:
                        ${bMiB.toFixed(4)} MiB<br><br>

                        A is approximately
                        ${(aBits / bBits).toFixed(2)}×
                        the size of B.
                    `;

                } else if (bBits > aBits) {

                    message = `
                        <strong>
                            Recording B requires more raw data.
                        </strong><br><br>

                        A:
                        ${aMiB.toFixed(4)} MiB<br>

                        B:
                        ${bMiB.toFixed(4)} MiB<br><br>

                        B is approximately
                        ${(bBits / aBits).toFixed(2)}×
                        the size of A.
                    `;

                } else {

                    message = `
                        <strong>
                            Both recordings require the same raw data size.
                        </strong>
                    `;

                }


                result.innerHTML =
                    message;

            }
        );

    }


    /* =====================================================
       REVEAL ANSWERS
       ===================================================== */

    document.querySelectorAll(
        ".reveal-button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const answer =
                    button.dataset.answer;

                const target =
                    button.nextElementSibling;

                target.textContent =
                    answer;

                button.textContent =
                    "Answer Revealed";

                button.disabled = true;

            }
        );

    });


    /* =====================================================
       MISTAKE DIAGNOSIS
       ===================================================== */

    document.querySelectorAll(
        ".diagnose-button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const number =
                    button.dataset.diagnosis;

                const target =
                    document.getElementById(
                        `diagnosis${number}`
                    );


                const messages = {

                    "1": `
                        <strong>Missing channel factor.</strong><br><br>
                        Stereo has two channels, so the calculation must be:
                        44,100 × 16 × 60 × 2.
                        The student's answer only calculates mono data.
                    `,

                    "2": `
                        <strong>Wrong conversion step.</strong><br><br>
                        Bits must first be converted to bytes by dividing by 8.
                        Only then should the result be divided by 1024 to
                        obtain KiB.
                    `,

                    "3": `
                        <strong>Check the binary storage units.</strong><br><br>
                        In these calculations:
                        1 MiB = 1024 KiB, not 1000 KiB.
                    `,

                    "4": `
                        <strong>Exactly the opposite.</strong><br><br>
                        Increasing bit depth means more bits are stored for
                        every sample. Therefore raw file size increases.
                    `

                };


                target.innerHTML =
                    messages[number];

                button.textContent =
                    "Diagnosis Shown";

                button.disabled = true;

            }
        );

    });


    /* =====================================================
       CHALLENGE
       ===================================================== */

    const showChallenge =
        document.getElementById(
            "showChallenge"
        );

    if (showChallenge) {

        showChallenge.addEventListener(
            "click",
            () => {

                const solution =
                    document.getElementById(
                        "challengeSolution"
                    );

                solution.classList.remove(
                    "hidden"
                );

                showChallenge.textContent =
                    "Worked Solution Shown";

                showChallenge.disabled =
                    true;

            }
        );

    }


    /* =====================================================
       THINKING
       ===================================================== */

    const thinkingText =
        document.getElementById(
            "thinkingText"
        );

    const saveThinking =
        document.getElementById(
            "saveThinking"
        );

    const thinkingSaved =
        document.getElementById(
            "thinkingSaved"
        );


    const storedThinking =
        localStorage.getItem(
            "DR-11-thinking"
        );

    if (storedThinking && thinkingText) {
        thinkingText.value =
            storedThinking;
    }


    if (saveThinking) {

        saveThinking.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "DR-11-thinking",
                    thinkingText.value
                );

                thinkingSaved.textContent =
                    "✓ Thinking saved on this device.";

            }
        );

    }


    /* =====================================================
       QUICK CHECK
       ===================================================== */

    document.querySelectorAll(
        ".quick-item button"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.nextElementSibling;

                target.textContent =
                    button.dataset.answer;

                button.textContent =
                    "✓";

                button.disabled = true;

            }
        );

    });


    /* =====================================================
       ASSESSMENT
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
        q6: "c",
        q7: "b",
        q8: "b",
        q9: "a",
        q10: "c"

    };


    if (assessmentForm) {

        assessmentForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                let score = 0;

                const total =
                    Object.keys(
                        answers
                    ).length;


                Object.keys(
                    answers
                ).forEach(question => {

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

                });


                const percentage =
                    Math.round(
                        score /
                        total *
                        100
                    );


                localStorage.setItem(
                    "DR-11-assessment",
                    JSON.stringify({
                        score,
                        total,
                        percentage,
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
                            ${score}/${total}
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
                            You are ready for DR-12.
                        </p>
                    `;

                    mastery.classList.remove(
                        "hidden"
                    );

                } else {

                    result.innerHTML += `
                        <p>
                            Review the calculation method and
                            retake the assessment.
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
                ).classList.add(
                    "hidden"
                );

                document.getElementById(
                    "mastery"
                ).classList.add(
                    "hidden"
                );

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

    const exitFormula =
        document.getElementById(
            "exitFormula"
        );

    const exitStrength =
        document.getElementById(
            "exitStrength"
        );

    const exitNeed =
        document.getElementById(
            "exitNeed"
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
            "DR-11-exit-ticket"
        );


    if (storedExit) {

        try {

            const data =
                JSON.parse(storedExit);

            exitFormula.value =
                data.formula || "";

            exitStrength.value =
                data.strength || "";

            exitNeed.value =
                data.need || "";

        } catch (error) {

            console.log(
                "Previous exit ticket unavailable."
            );

        }

    }


    if (saveExit) {

        saveExit.addEventListener(
            "click",
            () => {

                const data = {

                    formula:
                        exitFormula.value,

                    strength:
                        exitStrength.value,

                    need:
                        exitNeed.value,

                    date:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "DR-11-exit-ticket",
                    JSON.stringify(data)
                );


                exitSaved.textContent =
                    "✓ Exit ticket saved on this device.";

            }
        );

    }


    /* =====================================================
       FIVE-MINUTE BLOCKLY BREAK
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
                    setInterval(
                        () => {

                            gameSeconds--;

                            updateTimer();


                            if (
                                gameSeconds <= 0
                            ) {

                                clearInterval(
                                    gameInterval
                                );

                                gameInterval =
                                    null;

                                gameTimer.textContent =
                                    "00:00";

                                gameMessage.textContent =
                                    "⏰ Break finished. Close Blockly Music and return to DR-11.";

                                startGame.textContent =
                                    "Break Completed";

                            }

                        },
                        1000
                    );

            }
        );

    }


    /* =====================================================
       VISITED FLAG
       ===================================================== */

    localStorage.setItem(
        "DR-11-visited",
        new Date().toISOString()
    );


    console.log(
        "DR-11 Sound Calculations loaded successfully."
    );

});