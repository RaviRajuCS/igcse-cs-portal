document.addEventListener("DOMContentLoaded", () => {

    localStorage.setItem("DR-12-visited", "true");

    /* ---------------------------
       STUDENT STUDIO TABS
    ---------------------------- */

    const tabButtons = document.querySelectorAll(".tabs button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.dataset.tab;

            tabContents.forEach(tab => {
                tab.classList.remove("active");
            });

            const selected = document.getElementById(target);

            if (selected) {
                selected.classList.add("active");
            }
        });
    });


    /* ---------------------------
       UNIT CONVERTER
    ---------------------------- */

    const unitToBytes = {
        bits: 1 / 8,
        bytes: 1,
        KiB: 1024,
        MiB: 1024 * 1024,
        GiB: 1024 * 1024 * 1024
    };

    function formatNumber(value) {
        if (!Number.isFinite(value)) return "Invalid value";

        if (Number.isInteger(value)) {
            return value.toLocaleString();
        }

        return value.toLocaleString(undefined, {
            maximumFractionDigits: 6
        });
    }

    document.getElementById("convertBtn").addEventListener("click", () => {

        const value = Number(document.getElementById("convValue").value);
        const from = document.getElementById("convFrom").value;

        if (value < 0 || !Number.isFinite(value)) {
            document.getElementById("conversionResult").textContent =
                "Please enter a valid positive value.";
            return;
        }

        const bytes = value * unitToBytes[from];

        const results = {
            bits: bytes * 8,
            bytes: bytes,
            KiB: bytes / 1024,
            MiB: bytes / (1024 ** 2),
            GiB: bytes / (1024 ** 3)
        };

        let html = `<strong>${formatNumber(value)} ${from}</strong><br><br>`;

        for (const unit in results) {
            html += `${unit}: ${formatNumber(results[unit])}<br>`;
        }

        document.getElementById("conversionResult").innerHTML = html;
    });


    /* ---------------------------
       BITS / BYTES
    ---------------------------- */

    document.getElementById("bitsBtn").addEventListener("click", () => {

        const bits = Number(document.getElementById("bitsInput").value);
        const result = bits / 8;

        document.getElementById("bitsResult").innerHTML =
            `${formatNumber(bits)} bits ÷ 8 = <strong>${formatNumber(result)} bytes</strong>`;
    });


    document.getElementById("bytesBtn").addEventListener("click", () => {

        const bytes = Number(document.getElementById("bytesInput").value);
        const result = bytes * 8;

        document.getElementById("bytesResult").innerHTML =
            `${formatNumber(bytes)} bytes × 8 = <strong>${formatNumber(result)} bits</strong>`;
    });


    /* ---------------------------
       CAPACITY PLANNER
    ---------------------------- */

    document.getElementById("planBtn").addEventListener("click", () => {

        const capacity = Number(document.getElementById("planCapacity").value);
        const capacityUnit = document.getElementById("planCapacityUnit").value;

        const used = Number(document.getElementById("planUsed").value);
        const usedUnit = document.getElementById("planUsedUnit").value;

        const fileSize = Number(document.getElementById("planFile").value);

        if (
            capacity < 0 ||
            used < 0 ||
            fileSize <= 0 ||
            !Number.isFinite(capacity) ||
            !Number.isFinite(used) ||
            !Number.isFinite(fileSize)
        ) {
            document.getElementById("planResult").textContent =
                "Please enter valid values.";
            return;
        }

        const capacityMiB = capacity * unitToBytes[capacityUnit] / unitToBytes["MiB"];
        const usedMiB = used * unitToBytes[usedUnit] / unitToBytes["MiB"];

        const remaining = capacityMiB - usedMiB;

        if (remaining < 0) {
            document.getElementById("planResult").innerHTML =
                `<strong>The storage is already over capacity.</strong>`;
            return;
        }

        const files = Math.floor(remaining / fileSize);
        const finalRemaining = remaining - files * fileSize;

        document.getElementById("planResult").innerHTML =
            `<strong>Capacity:</strong> ${formatNumber(capacityMiB)} MiB<br>
             <strong>Already used:</strong> ${formatNumber(usedMiB)} MiB<br>
             <strong>Remaining:</strong> ${formatNumber(remaining)} MiB<br>
             <strong>Complete files that fit:</strong> ${files}<br>
             <strong>Space left afterwards:</strong> ${formatNumber(finalRemaining)} MiB`;

        localStorage.setItem("DR-12-planner", JSON.stringify({
            capacity,
            capacityUnit,
            used,
            usedUnit,
            fileSize
        }));
    });


    /* ---------------------------
       FILE COLLECTION
    ---------------------------- */

    document.getElementById("collectionBtn").addEventListener("click", () => {

        const n1 = Number(document.getElementById("c1n").value);
        const s1 = Number(document.getElementById("c1s").value);

        const n2 = Number(document.getElementById("c2n").value);
        const s2 = Number(document.getElementById("c2s").value);

        const n3 = Number(document.getElementById("c3n").value);
        const s3 = Number(document.getElementById("c3s").value);

        const total1 = n1 * s1;
        const total2 = n2 * s2;
        const total3 = n3 * s3;

        const total = total1 + total2 + total3;

        document.getElementById("collectionResult").innerHTML =
            `Group 1: ${formatNumber(total1)} MiB<br>
             Group 2: ${formatNumber(total2)} MiB<br>
             Group 3: ${formatNumber(total3)} MiB<br><br>
             <strong>Total = ${formatNumber(total)} MiB</strong>`;
    });


    /* ---------------------------
       REMAINING SPACE
    ---------------------------- */

    document.getElementById("remainBtn").addEventListener("click", () => {

        const capacity = Number(document.getElementById("remainCapacity").value);
        const used = Number(document.getElementById("remainUsed").value);

        const remaining = capacity - used;

        document.getElementById("remainResult").innerHTML =
            `<strong>Remaining space = ${formatNumber(remaining)} MiB</strong>`;
    });


    /* ---------------------------
       HOW MANY FILES
    ---------------------------- */

    document.getElementById("fitBtn").addEventListener("click", () => {

        const space = Number(document.getElementById("fitSpace").value);
        const file = Number(document.getElementById("fitFile").value);

        if (file <= 0) {
            document.getElementById("fitResult").textContent =
                "File size must be greater than zero.";
            return;
        }

        const number = Math.floor(space / file);
        const leftover = space - number * file;

        document.getElementById("fitResult").innerHTML =
            `<strong>${number} complete files</strong><br>
             Space remaining: ${formatNumber(leftover)} MiB`;
    });


    /* ---------------------------
       COMPARE STORAGE
    ---------------------------- */

    document.getElementById("compareBtn").addEventListener("click", () => {

        const capacityGiB =
            Number(document.getElementById("compareCapacity").value);

        const collectionMiB =
            Number(document.getElementById("compareCollection").value);

        const capacityMiB = capacityGiB * 1024;
        const difference = capacityMiB - collectionMiB;

        if (difference >= 0) {
            document.getElementById("compareResult").innerHTML =
                `<strong>Fits!</strong><br>
                 Capacity = ${formatNumber(capacityMiB)} MiB<br>
                 Collection = ${formatNumber(collectionMiB)} MiB<br>
                 Space remaining = ${formatNumber(difference)} MiB`;
        } else {
            document.getElementById("compareResult").innerHTML =
                `<strong>Does not fit.</strong><br>
                 Storage shortfall = ${formatNumber(Math.abs(difference))} MiB`;
        }
    });


    /* ---------------------------
       THINKING
    ---------------------------- */

    const savedThinking = localStorage.getItem("DR-12-thinking");

    if (savedThinking) {
        document.getElementById("thinkAnswer").value = savedThinking;
    }

    document.getElementById("saveThink").addEventListener("click", () => {

        const text = document.getElementById("thinkAnswer").value.trim();

        localStorage.setItem("DR-12-thinking", text);

        document.getElementById("thinkSaved").textContent =
            "Your thinking has been saved on this device.";
    });


    /* ---------------------------
       FORMATIVE ASSESSMENT
    ---------------------------- */

    const answers = {
        q1: "b",
        q2: "b",
        q3: "a",
        q4: "c",
        q5: "a",
        q6: "a",
        q7: "b",
        q8: "a",
        q9: "b",
        q10: "b"
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

                if (selected && selected.value === answers[question]) {
                    score++;
                }
            });

            const percentage = score * 10;

            localStorage.setItem(
                "DR-12-assessment",
                JSON.stringify({
                    score,
                    percentage,
                    date: new Date().toISOString()
                })
            );

            document.getElementById("assessmentResult").innerHTML =
                `<strong>Score: ${score}/10 (${percentage}%)</strong>`;

            if (percentage >= 70) {

                document.getElementById("pathway").innerHTML =
                    `🎉 <strong>Mastery achieved!</strong><br>
                     You are ready to continue to
                     <a href="DR-13.html">DR-13 — Data Compression</a>.`;

            } else {

                document.getElementById("pathway").innerHTML =
                    `📘 <strong>More practice needed.</strong><br>
                     Revisit the Storage Units, Conversion Lab,
                     Capacity Planner and Fix the Mistake activities.
                     Then retake the assessment.`;
            }

            document.getElementById("assessmentResult")
                .scrollIntoView({ behavior: "smooth" });
        });


    /* ---------------------------
       EXIT TICKET
    ---------------------------- */

    const savedExit = localStorage.getItem("DR-12-exit-ticket");

    if (savedExit) {

        const data = JSON.parse(savedExit);

        document.getElementById("learned").value =
            data.learned || "";

        document.getElementById("unclear").value =
            data.unclear || "";
    }

    document.getElementById("saveExit").addEventListener("click", () => {

        const data = {
            learned: document.getElementById("learned").value,
            unclear: document.getElementById("unclear").value,
            date: new Date().toISOString()
        };

        localStorage.setItem(
            "DR-12-exit-ticket",
            JSON.stringify(data)
        );

        document.getElementById("exitSaved").innerHTML =
            `<div class="result">Exit ticket saved successfully.</div>`;
    });


    /* ---------------------------
       5-MINUTE GAME TIMER
    ---------------------------- */

    let timerSeconds = 300;
    let timerRunning = false;
    let timerInterval;

    const timerDisplay = document.getElementById("timer");
    const timerMessage = document.getElementById("timerMessage");

    function updateTimer() {

        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    document.getElementById("startTimer").addEventListener("click", () => {

        if (timerRunning) return;

        timerRunning = true;
        timerMessage.textContent =
            "Enjoy your 5-minute game break. Come back when the timer finishes.";

        timerInterval = setInterval(() => {

            timerSeconds--;

            updateTimer();

            if (timerSeconds <= 0) {

                clearInterval(timerInterval);

                timerRunning = false;

                timerMessage.textContent =
                    "⏰ Time is up! Close the game and return to DR-12.";
            }

        }, 1000);
    });


    updateTimer();

});


/* ---------------------------
   GLOBAL REVEAL FUNCTION
---------------------------- */

function reveal(id) {

    const element = document.getElementById(id);

    if (!element) return;

    if (
        element.style.display === "none" ||
        element.style.display === ""
    ) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}


/* ---------------------------
   QUICK CHECK
---------------------------- */

function quick(button, correct) {

    const container = button.parentElement;
    const feedback = container.querySelector(".feedback");

    if (correct) {
        feedback.textContent = "✓ Correct!";
    } else {
        feedback.textContent = "✗ Try again.";
    }
}