/* =========================================================
   DR-06 — BINARY OPERATIONS WORKSHOP
   IGCSE COMPUTER SCIENCE 0984
   Design and Content by Ravi Raju
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       VISITED FLAG
       ----------------------------------------------------- */

    localStorage.setItem("DR-06-visited", "true");


    /* -----------------------------------------------------
       STUDENT STUDIO TABS
       ----------------------------------------------------- */

    const tabs = document.querySelectorAll(".studio-tab");
    const panels = document.querySelectorAll(".studio-panel");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            tab.classList.add("active");

            const panel = document.getElementById(target);

            if (panel) {
                panel.classList.add("active");
            }
        });

    });


    /* -----------------------------------------------------
       BINARY VALIDATION
       ----------------------------------------------------- */

    function isBinary8(value) {
        return /^[01]{8}$/.test(value);
    }


    /* -----------------------------------------------------
       BINARY ADDER
       ----------------------------------------------------- */

    const addBtn = document.getElementById("addBtn");

    if (addBtn) {

        addBtn.addEventListener("click", () => {

            const a = document.getElementById("addA").value.trim();
            const b = document.getElementById("addB").value.trim();
            const output = document.getElementById("addResult");

            if (!isBinary8(a) || !isBinary8(b)) {

                output.textContent =
                    "Please enter two valid 8-bit binary numbers.";

                return;
            }

            const decimalA = parseInt(a, 2);
            const decimalB = parseInt(b, 2);

            const sum = decimalA + decimalB;

            const nineBit =
                sum.toString(2).padStart(9, "0");

            const eightBit =
                (sum & 255).toString(2).padStart(8, "0");

            const overflow = sum > 255;

            output.innerHTML =
                `First number: <code>${a}</code>
                 Second number: <code>${b}</code>

                 Decimal values: ${decimalA} + ${decimalB}

                 9-bit result: <code>${nineBit}</code>

                 8-bit stored result: <code>${eightBit}</code>

                 ${overflow
                     ? "⚠ OVERFLOW: the result requires more than 8 bits."
                     : "✓ No overflow: the result fits in 8 bits."
                 }`;

        });

    }


    /* -----------------------------------------------------
       HIDDEN ANSWERS
       ----------------------------------------------------- */

    document.querySelectorAll(".answer-button").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.answer;
            const answer = document.getElementById(id);

            if (!answer) return;

            answer.classList.toggle("show");

            button.textContent =
                answer.classList.contains("show")
                    ? "Hide Answer"
                    : "Show Answer";

        });

    });


    /* -----------------------------------------------------
       INTERACTIVE 8-BIT REGISTER
       ----------------------------------------------------- */

    const bitRegister = document.getElementById("bitRegister");
    const registerValue = document.getElementById("registerValue");
    const resetRegister = document.getElementById("resetRegister");

    let registerBits = [
        0, 0, 0, 0, 0, 0, 0, 0
    ];

    function renderRegister() {

        bitRegister.innerHTML = "";

        registerBits.forEach((bit, index) => {

            const cell = document.createElement("div");

            cell.className =
                "interactive-bit" + (bit === 1 ? " one" : "");

            cell.textContent = bit;

            cell.title = `Bit ${7 - index}`;

            cell.addEventListener("click", () => {

                registerBits[index] =
                    registerBits[index] === 0 ? 1 : 0;

                renderRegister();
            });

            bitRegister.appendChild(cell);

        });

        const binary =
            registerBits.join("");

        const decimal =
            parseInt(binary, 2);

        registerValue.textContent =
            `Binary: ${binary} | Denary: ${decimal}`;
    }

    if (bitRegister) {
        renderRegister();
    }

    if (resetRegister) {

        resetRegister.addEventListener("click", () => {

            registerBits = [
                0, 0, 0, 0, 0, 0, 0, 0
            ];

            renderRegister();

        });

    }


    /* -----------------------------------------------------
       OVERFLOW DETECTOR
       ----------------------------------------------------- */

    const overflowBtn =
        document.getElementById("overflowBtn");

    if (overflowBtn) {

        overflowBtn.addEventListener("click", () => {

            const a =
                document.getElementById("overflowA").value.trim();

            const b =
                document.getElementById("overflowB").value.trim();

            const result =
                document.getElementById("overflowResult");

            if (!isBinary8(a) || !isBinary8(b)) {

                result.textContent =
                    "Please enter two valid 8-bit binary numbers.";

                return;
            }

            const sum =
                parseInt(a, 2) + parseInt(b, 2);

            const nine =
                sum.toString(2).padStart(9, "0");

            const stored =
                (sum & 255).toString(2).padStart(8, "0");

            if (sum > 255) {

                result.innerHTML =
                    `9-bit result: <code>${nine}</code>

                     Stored in 8 bits:
                     <code>${stored}</code>

                     ⚠ Overflow detected.`;

            } else {

                result.innerHTML =
                    `Result:
                     <code>${stored}</code>

                     ✓ No overflow.`;

            }

        });

    }


    /* -----------------------------------------------------
       SHIFT LAB
       ----------------------------------------------------- */

    const shiftBtn =
        document.getElementById("shiftBtn");

    if (shiftBtn) {

        shiftBtn.addEventListener("click", () => {

            const input =
                document.getElementById("shiftInput")
                    .value.trim();

            const direction =
                document.getElementById("shiftDirection")
                    .value;

            const count =
                parseInt(
                    document.getElementById("shiftCount").value,
                    10
                );

            const result =
                document.getElementById("shiftResult");

            if (!isBinary8(input)) {

                result.textContent =
                    "Please enter a valid 8-bit binary number.";

                return;
            }

            let current = input;
            let lostBits = [];

            for (let i = 0; i < count; i++) {

                if (direction === "left") {

                    lostBits.push(current[0]);

                    current =
                        current.substring(1) + "0";

                } else {

                    lostBits.push(current[7]);

                    current =
                        "0" + current.substring(0, 7);
                }
            }

            const originalDecimal =
                parseInt(input, 2);

            const resultDecimal =
                parseInt(current, 2);

            result.innerHTML =
                `Original:
                 <code>${input}</code>
                 (${originalDecimal})

                 Result:
                 <code>${current}</code>
                 (${resultDecimal})

                 Lost bits:
                 <code>${lostBits.join(" ")}</code>

                 ${direction === "left"
                     ? `Effect: approximately × ${2 ** count}`
                     : `Effect: approximately ÷ ${2 ** count}`
                 }`;

        });

    }


    /* -----------------------------------------------------
       TWO'S COMPLEMENT CONVERTER
       ----------------------------------------------------- */

    const twosBtn =
        document.getElementById("twosBtn");

    if (twosBtn) {

        twosBtn.addEventListener("click", () => {

            const value =
                parseInt(
                    document.getElementById("twosInput").value,
                    10
                );

            const output =
                document.getElementById("twosResult");

            if (
                Number.isNaN(value) ||
                value < -128 ||
                value > 127
            ) {

                output.textContent =
                    "Enter a value between -128 and +127.";

                return;
            }

            let binary;

            if (value >= 0) {

                binary =
                    value.toString(2).padStart(8, "0");

            } else {

                binary =
                    (256 + value)
                        .toString(2)
                        .padStart(8, "0");
            }

            output.innerHTML =
                `<strong>${value}</strong>
                 in 8-bit two's complement is:

                 <code>${binary}</code>`;

        });

    }


    /* -----------------------------------------------------
       TWO'S COMPLEMENT DECODER
       ----------------------------------------------------- */

    const decodeBtn =
        document.getElementById("decodeBtn");

    if (decodeBtn) {

        decodeBtn.addEventListener("click", () => {

            const binary =
                document.getElementById("decodeInput")
                    .value.trim();

            const output =
                document.getElementById("decodeResult");

            if (!isBinary8(binary)) {

                output.textContent =
                    "Please enter exactly 8 binary digits.";

                return;
            }

            const unsigned =
                parseInt(binary, 2);

            let value;

            if (binary[0] === "0") {

                value = unsigned;

                output.innerHTML =
                    `<code>${binary}</code>
                     represents <strong>+${value}</strong>.`;

            } else {

                value = unsigned - 256;

                const inverted =
                    binary
                        .split("")
                        .map(bit => bit === "0" ? "1" : "0")
                        .join("");

                const magnitude =
                    parseInt(inverted, 2) + 1;

                output.innerHTML =
                    `<code>${binary}</code>

                     MSB = 1 → negative

                     Invert:
                     <code>${inverted}</code>

                     Add 1:
                     <code>${magnitude.toString(2).padStart(8, "0")}</code>

                     Therefore:
                     <strong>${value}</strong>`;

            }

        });

    }


    /* -----------------------------------------------------
       QUICK CHECK
       ----------------------------------------------------- */

    document.querySelectorAll(".quick-option")
        .forEach(option => {

            option.addEventListener("click", () => {

                const q =
                    option.dataset.q;

                const feedback =
                    document.getElementById(
                        `feedback${q}`
                    );

                const correct =
                    option.dataset.correct === "true";

                if (correct) {

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


    /* -----------------------------------------------------
       THINKING RESPONSES
       ----------------------------------------------------- */

    function saveThinking(
        textareaId,
        outputId,
        storageKey
    ) {

        const textarea =
            document.getElementById(textareaId);

        const output =
            document.getElementById(outputId);

        if (!textarea || !output) return;

        const saved =
            localStorage.getItem(storageKey);

        if (saved) {
            textarea.value = saved;
        }

        const button =
            textarea.parentElement.querySelector(
                ".action-button"
            );

        if (!button) return;

        button.addEventListener("click", () => {

            localStorage.setItem(
                storageKey,
                textarea.value
            );

            output.textContent =
                "✓ Your thinking has been saved on this device.";

        });

    }

    saveThinking(
        "thinkAnswer",
        "thinkSaved",
        "DR-06-thinking-1"
    );

    saveThinking(
        "thinkAnswer2",
        "thinkSaved2",
        "DR-06-thinking-2"
    );


    /* -----------------------------------------------------
       FORMATIVE ASSESSMENT
       ----------------------------------------------------- */

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
        q4: "a",
        q5: "a",
        q6: "b",
        q7: "b",
        q8: "b",
        q9: "b",
        q10: "a"
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
                    "DR-06-assessment",
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
                         You are ready to move on to
                         <strong>DR-07 — Character Representation.</strong>
                         <br><br>
                         <a href="DR-07.html"
                            class="nav-button">
                            Continue to DR-07 →
                         </a>`;

                    remediationArea.classList.add("hidden");

                } else {

                    assessmentResult.style.background =
                        "rgba(157,39,39,0.12)";

                    assessmentResult.style.color =
                        "#9d2727";

                    masteryMessage.innerHTML =
                        `You scored ${percentage}%.
                         <strong>Let's strengthen the foundations before moving on.</strong>`;

                    remediationArea.classList.remove(
                        "hidden"
                    );

                }

                window.scrollTo({
                    top:
                        document.getElementById(
                            "masteryPanel"
                        ).offsetTop - 30,
                    behavior: "smooth"
                });

            }
        );

    }


    /* -----------------------------------------------------
       RETAKE
       ----------------------------------------------------- */

    const retakeBtn =
        document.getElementById("retakeBtn");

    if (retakeBtn) {

        retakeBtn.addEventListener("click", () => {

            assessmentForm.reset();

            assessmentResult.textContent = "";

            masteryMessage.textContent =
                "Assessment reset. Have another try.";

            remediationArea.classList.add("hidden");

            window.scrollTo({
                top:
                    assessmentForm.offsetTop - 30,
                behavior: "smooth"
            });

        });

    }


    /* -----------------------------------------------------
       GAME TIMER
       ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       EXIT TICKET
       ----------------------------------------------------- */

    const exitLearned =
        document.getElementById("exitLearned");

    const exitUnclear =
        document.getElementById("exitUnclear");

    const saveExit =
        document.getElementById("saveExit");

    const exitSaved =
        document.getElementById("exitSaved");


    if (exitLearned && exitUnclear) {

        const previous =
            JSON.parse(
                localStorage.getItem(
                    "DR-06-exit-ticket"
                ) || "{}"
            );

        exitLearned.value =
            previous.learned || "";

        exitUnclear.value =
            previous.unclear || "";

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
                "DR-06-exit-ticket",
                JSON.stringify(data)
            );

            exitSaved.textContent =
                "✓ Exit ticket saved on this device.";

        });

    }

});