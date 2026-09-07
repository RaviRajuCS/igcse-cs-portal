/* =========================================================
   DR-09 — Image Representation: Calculations & File Size
   Design and Content by Ravi Raju
   Offline-first JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

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
       FORMAT NUMBER
       ----------------------------------------------------- */

    function formatNumber(value, decimals = 6) {

        if (!Number.isFinite(value)) {
            return "—";
        }

        if (Number.isInteger(value)) {
            return value.toLocaleString();
        }

        return value.toLocaleString(undefined, {
            maximumFractionDigits: decimals
        });
    }


    /* -----------------------------------------------------
       FULL IMAGE CALCULATOR
       ----------------------------------------------------- */

    const calculateImage = document.getElementById("calculateImage");

    if (calculateImage) {

        calculateImage.addEventListener("click", () => {

            const width = Number(document.getElementById("calcWidth").value);
            const height = Number(document.getElementById("calcHeight").value);
            const depth = Number(document.getElementById("calcDepth").value);

            const result = document.getElementById("imageCalcResult");

            if (
                width <= 0 ||
                height <= 0 ||
                depth <= 0 ||
                !Number.isFinite(width) ||
                !Number.isFinite(height) ||
                !Number.isFinite(depth)
            ) {

                result.innerHTML = `
                    <h3>Check the values</h3>
                    <p>Please enter positive numerical values.</p>
                `;

                return;
            }

            const pixels = width * height;
            const bits = pixels * depth;
            const bytes = bits / 8;
            const kib = bytes / 1024;
            const mib = kib / 1024;
            const gib = mib / 1024;

            result.innerHTML = `
                <h3>Step-by-Step Calculation</h3>

                <div class="result-line">
                    Pixels:
                    <strong>${formatNumber(width)} × ${formatNumber(height)}
                    = ${formatNumber(pixels)}</strong>
                </div>

                <div class="result-line">
                    Bits:
                    <strong>${formatNumber(pixels)} × ${formatNumber(depth)}
                    = ${formatNumber(bits)} bits</strong>
                </div>

                <div class="result-line">
                    Bytes:
                    <strong>${formatNumber(bits)} ÷ 8
                    = ${formatNumber(bytes)} bytes</strong>
                </div>

                <div class="result-line">
                    KiB:
                    <strong>${formatNumber(bytes)} ÷ 1024
                    = ${formatNumber(kib)} KiB</strong>
                </div>

                <div class="result-line">
                    MiB:
                    <strong>${formatNumber(kib)} ÷ 1024
                    = ${formatNumber(mib)} MiB</strong>
                </div>

                <div class="result-line">
                    GiB:
                    <strong>${formatNumber(mib)} ÷ 1024
                    = ${formatNumber(gib)} GiB</strong>
                </div>

                <p class="result-final">
                    Raw pixel data = ${formatNumber(bits)} bits
                </p>
            `;

        });

    }


    /* -----------------------------------------------------
       BITS → BYTES
       ----------------------------------------------------- */

    const bitsToBytes = document.getElementById("bitsToBytes");

    if (bitsToBytes) {

        bitsToBytes.addEventListener("click", () => {

            const bits = Number(document.getElementById("bitsInput").value);
            const result = document.getElementById("bitsResult");

            if (bits < 0 || !Number.isFinite(bits)) {
                result.textContent = "Enter a valid number of bits.";
                return;
            }

            const bytes = bits / 8;

            result.innerHTML = `
                ${formatNumber(bits)} ÷ 8
                = <strong>${formatNumber(bytes)} bytes</strong>
            `;

        });

    }


    /* -----------------------------------------------------
       BYTES → BITS
       ----------------------------------------------------- */

    const bytesToBits = document.getElementById("bytesToBits");

    if (bytesToBits) {

        bytesToBits.addEventListener("click", () => {

            const bytes = Number(document.getElementById("bytesInput").value);
            const result = document.getElementById("bytesResult");

            if (bytes < 0 || !Number.isFinite(bytes)) {
                result.textContent = "Enter a valid number of bytes.";
                return;
            }

            const bits = bytes * 8;

            result.innerHTML = `
                ${formatNumber(bytes)} × 8
                = <strong>${formatNumber(bits)} bits</strong>
            `;

        });

    }


    /* -----------------------------------------------------
       STORAGE UNIT CONVERTER
       ----------------------------------------------------- */

    const convertStorage = document.getElementById("convertStorage");

    if (convertStorage) {

        convertStorage.addEventListener("click", () => {

            const value = Number(document.getElementById("storageValue").value);
            const unit = document.getElementById("storageUnit").value;
            const result = document.getElementById("storageResult");

            if (value < 0 || !Number.isFinite(value)) {
                result.innerHTML = `
                    <h3>Invalid value</h3>
                    <p>Please enter a valid non-negative number.</p>
                `;
                return;
            }

            const factors = {
                bits: 1,
                bytes: 8,
                kib: 8 * 1024,
                mib: 8 * 1024 * 1024,
                gib: 8 * 1024 * 1024 * 1024
            };

            const bits = value * factors[unit];

            const bytes = bits / 8;
            const kib = bytes / 1024;
            const mib = kib / 1024;
            const gib = mib / 1024;

            result.innerHTML = `
                <h3>Equivalent Values</h3>

                <div class="result-line">
                    Bits:
                    <strong>${formatNumber(bits)}</strong>
                </div>

                <div class="result-line">
                    Bytes:
                    <strong>${formatNumber(bytes)}</strong>
                </div>

                <div class="result-line">
                    KiB:
                    <strong>${formatNumber(kib)}</strong>
                </div>

                <div class="result-line">
                    MiB:
                    <strong>${formatNumber(mib)}</strong>
                </div>

                <div class="result-line">
                    GiB:
                    <strong>${formatNumber(gib)}</strong>
                </div>
            `;

        });

    }


    /* -----------------------------------------------------
       REVERSE CALCULATION
       ----------------------------------------------------- */

    const reverseCalculate = document.getElementById("reverseCalculate");

    if (reverseCalculate) {

        reverseCalculate.addEventListener("click", () => {

            const width = Number(document.getElementById("reverseWidth").value);
            const height = Number(document.getElementById("reverseHeight").value);
            const bits = Number(document.getElementById("reverseBits").value);

            const result = document.getElementById("reverseResult");

            if (
                width <= 0 ||
                height <= 0 ||
                bits <= 0 ||
                !Number.isFinite(width) ||
                !Number.isFinite(height) ||
                !Number.isFinite(bits)
            ) {

                result.innerHTML = `
                    <h3>Check the values</h3>
                    <p>All values must be positive.</p>
                `;

                return;
            }

            const pixels = width * height;
            const depth = bits / pixels;

            result.innerHTML = `
                <h3>Reverse Calculation</h3>

                <div class="result-line">
                    Number of pixels:
                    <strong>${formatNumber(width)} × ${formatNumber(height)}
                    = ${formatNumber(pixels)}</strong>
                </div>

                <div class="result-line">
                    Colour depth:
                    <strong>${formatNumber(bits)} ÷ ${formatNumber(pixels)}
                    = ${formatNumber(depth)} bits per pixel</strong>
                </div>

                <p class="result-final">
                    Colour depth = ${formatNumber(depth)} bits per pixel
                </p>
            `;

        });

    }


    /* -----------------------------------------------------
       IMAGE COMPARISON
       ----------------------------------------------------- */

    const compareImages = document.getElementById("compareImages");

    if (compareImages) {

        compareImages.addEventListener("click", () => {

            const aw = Number(document.getElementById("aWidth").value);
            const ah = Number(document.getElementById("aHeight").value);
            const ad = Number(document.getElementById("aDepth").value);

            const bw = Number(document.getElementById("bWidth").value);
            const bh = Number(document.getElementById("bHeight").value);
            const bd = Number(document.getElementById("bDepth").value);

            const result = document.getElementById("compareResult");

            if (
                aw <= 0 || ah <= 0 || ad <= 0 ||
                bw <= 0 || bh <= 0 || bd <= 0
            ) {

                result.innerHTML = "<strong>Please enter valid positive values.</strong>";
                return;

            }

            const aPixels = aw * ah;
            const bPixels = bw * bh;

            const aBits = aPixels * ad;
            const bBits = bPixels * bd;

            let comparison;

            if (aBits > bBits) {

                comparison = `
                    <strong>Image A requires more raw data.</strong><br>
                    A = ${formatNumber(aBits)} bits<br>
                    B = ${formatNumber(bBits)} bits<br>
                    A is approximately ${(aBits / bBits).toFixed(2)} times larger.
                `;

            } else if (bBits > aBits) {

                comparison = `
                    <strong>Image B requires more raw data.</strong><br>
                    A = ${formatNumber(aBits)} bits<br>
                    B = ${formatNumber(bBits)} bits<br>
                    B is approximately ${(bBits / aBits).toFixed(2)} times larger.
                `;

            } else {

                comparison = `
                    <strong>Both images require the same raw data size.</strong><br>
                    ${formatNumber(aBits)} bits
                `;

            }

            result.innerHTML = comparison;

        });

    }


    /* -----------------------------------------------------
       PRACTICE REVEALS
       ----------------------------------------------------- */

    document.querySelectorAll(".reveal-button").forEach(button => {

        button.addEventListener("click", () => {

            const answer = button.dataset.answer;
            const box = button.nextElementSibling;

            box.textContent = answer;

            button.textContent = "Answer Revealed";
            button.disabled = true;

        });

    });


    /* -----------------------------------------------------
       MISTAKE DIAGNOSIS
       ----------------------------------------------------- */

    const mistakeReveal = document.getElementById("mistakeReveal");

    if (mistakeReveal) {

        mistakeReveal.addEventListener("click", () => {

            document.getElementById("mistakeAnswer").innerHTML = `
                <strong>The student has stopped at bits.</strong><br><br>
                800 × 600 × 8 = 3,840,000 bits,
                not bytes. To convert to bytes, divide by 8:
                3,840,000 ÷ 8 = 480,000 bytes.
            `;

        });

    }


    const mistakeReveal2 = document.getElementById("mistakeReveal2");

    if (mistakeReveal2) {

        mistakeReveal2.addEventListener("click", () => {

            document.getElementById("mistakeAnswer2").innerHTML = `
                <strong>Width and height must be multiplied.</strong><br><br>
                1024 × 768 = 786,432 pixels.
                Adding them gives a meaningless value for the number of pixels.
            `;

        });

    }


    const mistakeReveal3 = document.getElementById("mistakeReveal3");

    if (mistakeReveal3) {

        mistakeReveal3.addEventListener("click", () => {

            document.getElementById("mistakeAnswer3").innerHTML = `
                <strong>The conversion direction is reversed.</strong><br><br>
                8 bits make one byte, so bits → bytes requires division by 8.
                Bytes → bits requires multiplication by 8.
            `;

        });

    }


    /* -----------------------------------------------------
       CHALLENGE
       ----------------------------------------------------- */

    const challengeReveal = document.getElementById("challengeReveal");

    if (challengeReveal) {

        challengeReveal.addEventListener("click", () => {

            const bytes = 12 * 1024 * 1024;
            const bits = bytes * 8;
            const pixels = bits / 24;

            document.getElementById("challengeAnswer").innerHTML = `
                <strong>Solution</strong><br><br>

                12 MiB × 1024 = 12,288 KiB<br>
                12,288 × 1024 = ${formatNumber(12 * 1024 * 1024)} bytes<br>
                Bytes × 8 = ${formatNumber(bits)} bits<br>
                Bits ÷ 24 = <strong>${formatNumber(pixels)} pixels</strong><br><br>

                Therefore, under the stated assumptions, the storage can contain
                <strong>${formatNumber(pixels)} pixels</strong>.
            `;

            challengeReveal.disabled = true;
            challengeReveal.textContent = "Solution Revealed";

        });

    }


    /* -----------------------------------------------------
       THINKING — LOCAL STORAGE
       ----------------------------------------------------- */

    const thinkResponse = document.getElementById("thinkResponse");
    const saveThinking = document.getElementById("saveThinking");
    const thinkingSaved = document.getElementById("thinkingSaved");

    const savedThinking = localStorage.getItem("DR-09-thinking");

    if (savedThinking && thinkResponse) {
        thinkResponse.value = savedThinking;
    }

    if (saveThinking) {

        saveThinking.addEventListener("click", () => {

            localStorage.setItem(
                "DR-09-thinking",
                thinkResponse.value
            );

            thinkingSaved.textContent = "✓ Thinking saved on this device.";

        });

    }


    /* -----------------------------------------------------
       QUICK CHECK
       ----------------------------------------------------- */

    document.querySelectorAll(".quick-item button").forEach(button => {

        button.addEventListener("click", () => {

            const answer = button.dataset.answer;
            const target = button.nextElementSibling;

            target.textContent = answer;

            button.textContent = "✓";
            button.disabled = true;

        });

    });


    /* -----------------------------------------------------
       FORMATIVE ASSESSMENT
       ----------------------------------------------------- */

    const assessmentForm = document.getElementById("assessmentForm");

    const answers = {
        q1: "b",
        q2: "c",
        q3: "b",
        q4: "c",
        q5: "b",
        q6: "a",
        q7: "c",
        q8: "b",
        q9: "c",
        q10: "b"
    };

    if (assessmentForm) {

        assessmentForm.addEventListener("submit", event => {

            event.preventDefault();

            let score = 0;
            const total = Object.keys(answers).length;

            Object.keys(answers).forEach(question => {

                const selected =
                    assessmentForm.querySelector(
                        `input[name="${question}"]:checked`
                    );

                if (selected && selected.value === answers[question]) {
                    score++;
                }

            });

            const percentage = Math.round((score / total) * 100);

            localStorage.setItem(
                "DR-09-assessment",
                JSON.stringify({
                    score: score,
                    total: total,
                    percentage: percentage,
                    date: new Date().toISOString()
                })
            );

            const result =
                document.getElementById("assessmentResult");

            const remediation =
                document.getElementById("remediation");

            const mastery =
                document.getElementById("mastery");

            result.innerHTML = `
                <h3>Assessment Result</h3>
                <p>
                    You scored
                    <strong>${score} / ${total}</strong>
                    (${percentage}%).
                </p>
            `;

            remediation.classList.add("hidden");
            mastery.classList.add("hidden");

            if (percentage >= 70) {

                result.innerHTML += `
                    <p>
                        <strong>Mastery threshold achieved.</strong>
                        Your next lesson is DR-10.
                    </p>
                `;

                mastery.classList.remove("hidden");

            } else {

                result.innerHTML += `
                    <p>
                        You are not quite at mastery yet.
                        Review the calculation method and retake the assessment.
                    </p>
                `;

                remediation.classList.remove("hidden");

            }

            result.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    /* -----------------------------------------------------
       RETAKE ASSESSMENT
       ----------------------------------------------------- */

    const retakeButton = document.getElementById("retakeButton");

    if (retakeButton) {

        retakeButton.addEventListener("click", () => {

            assessmentForm.reset();

            document.getElementById("assessmentResult").innerHTML = "";

            document.getElementById("remediation")
                .classList.add("hidden");

            document.getElementById("mastery")
                .classList.add("hidden");

            assessmentForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* -----------------------------------------------------
       EXIT TICKET
       ----------------------------------------------------- */

    const saveExit = document.getElementById("saveExit");

    const learned = document.getElementById("learned");
    const confident = document.getElementById("confident");
    const needsPractice = document.getElementById("needsPractice");
    const exitSaved = document.getElementById("exitSaved");

    const savedExit =
        localStorage.getItem("DR-09-exit-ticket");

    if (savedExit) {

        try {

            const data = JSON.parse(savedExit);

            learned.value = data.learned || "";
            confident.value = data.confident || "";
            needsPractice.value = data.needsPractice || "";

        } catch (error) {
            console.log("Previous exit ticket could not be loaded.");
        }

    }

    if (saveExit) {

        saveExit.addEventListener("click", () => {

            const data = {
                learned: learned.value,
                confident: confident.value,
                needsPractice: needsPractice.value,
                date: new Date().toISOString()
            };

            localStorage.setItem(
                "DR-09-exit-ticket",
                JSON.stringify(data)
            );

            exitSaved.textContent =
                "✓ Exit ticket saved on this device.";

        });

    }


    /* -----------------------------------------------------
       VISITED FLAG
       ----------------------------------------------------- */

    localStorage.setItem(
        "DR-09-visited",
        new Date().toISOString()
    );


    /* -----------------------------------------------------
       BLOCKLY GAME — 5 MINUTES
       ----------------------------------------------------- */

    const startGame = document.getElementById("startGame");
    const gameTimer = document.getElementById("gameTimer");
    const gameMessage = document.getElementById("gameMessage");

    let gameSeconds = 300;
    let gameInterval = null;

    function updateTimer() {

        const minutes =
            Math.floor(gameSeconds / 60)
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

        startGame.addEventListener("click", () => {

            if (gameInterval) {
                return;
            }

            gameMessage.textContent =
                "Your 5-minute break has started. Enjoy the programming challenge!";

            startGame.textContent = "Break Running";
            startGame.disabled = true;

            gameSeconds = 300;
            updateTimer();

            gameInterval = setInterval(() => {

                gameSeconds--;
                updateTimer();

                if (gameSeconds <= 0) {

                    clearInterval(gameInterval);
                    gameInterval = null;

                    gameTimer.textContent = "00:00";

                    gameMessage.textContent =
                        "⏰ Break finished. Close the Blockly game and return to DR-09.";

                    startGame.textContent = "Break Completed";

                }

            }, 1000);

        });

    }


    /* -----------------------------------------------------
       OPTIONAL PREVIOUS ASSESSMENT DISPLAY
       ----------------------------------------------------- */

    const previousAssessment =
        localStorage.getItem("DR-09-assessment");

    if (previousAssessment) {

        try {

            const data = JSON.parse(previousAssessment);

            console.log(
                `DR-09 previous assessment: ${data.score}/${data.total} (${data.percentage}%)`
            );

        } catch (error) {
            console.log("Previous assessment data unavailable.");
        }

    }


    /* -----------------------------------------------------
       PAGE READY
       ----------------------------------------------------- */

    console.log(
        "DR-09 Image Representation — Calculations & File Size loaded successfully."
    );

});