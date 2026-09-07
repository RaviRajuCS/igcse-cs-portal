/* =========================================================
   DR-05
   Binary ↔ Hexadecimal Conversion
   ========================================================= */


/* =========================================================
   STUDENT STUDIO TABS
   ========================================================= */

const studioTabs =
    document.querySelectorAll(".studio-tab");

const studioContents =
    document.querySelectorAll(".studio-content");


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
            document.getElementById(
                tab.dataset.tab
            );


        if (target) {

            target.classList.add("active");

        }

    });

});



/* =========================================================
   CONVERSION LAB
   ========================================================= */

const binaryInput =
    document.getElementById(
        "binaryInput"
    );

const hexInput =
    document.getElementById(
        "hexInput"
    );

const binaryToHex =
    document.getElementById(
        "binaryToHex"
    );

const hexToBinary =
    document.getElementById(
        "hexToBinary"
    );

const clearConverter =
    document.getElementById(
        "clearConverter"
    );

const converterResult =
    document.getElementById(
        "converterResult"
    );


/* =========================================================
   BINARY → HEX
   ========================================================= */

binaryToHex.addEventListener(
    "click",
    () => {

        let binary =
            binaryInput.value
                .trim()
                .replace(/\s+/g, "");


        if (binary === "") {

            converterResult.innerHTML =
                "Please enter a binary value.";

            return;

        }


        if (!/^[01]+$/.test(binary)) {

            converterResult.innerHTML =
                "Invalid binary number. Use only 0 and 1.";

            return;

        }


        /*
         * Add leading zeros until the length
         * is a multiple of four.
         */

        const padding =
            (4 - (binary.length % 4)) % 4;


        binary =
            "0".repeat(padding) +
            binary;


        let hex = "";


        for (
            let i = 0;
            i < binary.length;
            i += 4
        ) {

            const group =
                binary.substring(
                    i,
                    i + 4
                );


            const decimal =
                parseInt(
                    group,
                    2
                );


            hex +=
                decimal.toString(16)
                    .toUpperCase();

        }


        hexInput.value = hex;


        converterResult.innerHTML = `
            ${binaryInput.value.trim()}₂
            =
            <strong>${hex}₁₆</strong>
            <br><br>
            Grouped as:
            ${binary.match(/.{1,4}/g).join(" ")}
        `;

    }
);



/* =========================================================
   HEX → BINARY
   ========================================================= */

hexToBinary.addEventListener(
    "click",
    () => {

        let hex =
            hexInput.value
                .trim()
                .replace(/\s+/g, "")
                .toUpperCase();


        if (hex === "") {

            converterResult.innerHTML =
                "Please enter a hexadecimal value.";

            return;

        }


        if (!/^[0-9A-F]+$/.test(hex)) {

            converterResult.innerHTML =
                "Invalid hexadecimal number. Use only 0–9 and A–F.";

            return;

        }


        const map = {

            "0": "0000",
            "1": "0001",
            "2": "0010",
            "3": "0011",

            "4": "0100",
            "5": "0101",
            "6": "0110",
            "7": "0111",

            "8": "1000",
            "9": "1001",
            "A": "1010",
            "B": "1011",

            "C": "1100",
            "D": "1101",
            "E": "1110",
            "F": "1111"

        };


        let binaryGroups = [];


        for (const digit of hex) {

            binaryGroups.push(
                map[digit]
            );

        }


        const binary =
            binaryGroups.join("");


        binaryInput.value =
            binary;


        converterResult.innerHTML = `
            ${hex}₁₆
            =
            <strong>${binary}₂</strong>
            <br><br>
            Digit groups:
            ${binaryGroups.join(" ")}
        `;

    }
);



/* =========================================================
   CLEAR CONVERTER
   ========================================================= */

clearConverter.addEventListener(
    "click",
    () => {

        binaryInput.value = "";

        hexInput.value = "";

        converterResult.textContent =
            "Enter a value and choose a conversion.";

    }
);



/* =========================================================
   ASSESSMENT
   ========================================================= */

const assessmentForm =
    document.getElementById(
        "assessmentForm"
    );

const assessmentResult =
    document.getElementById(
        "assessmentResult"
    );

const nextStep =
    document.getElementById(
        "nextStep"
    );


const answers = {

    q1: "b",
    q2: "b",
    q3: "b",
    q4: "b",
    q5: "a",
    q6: "b",
    q7: "c",
    q8: "a",
    q9: "c",
    q10: "b"

};


assessmentForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        let score = 0;

        let unanswered = 0;


        Object.keys(answers).forEach(
            question => {

                const selected =
                    document.querySelector(
                        `input[name="${question}"]:checked`
                    );


                if (!selected) {

                    unanswered++;

                }
                else if (
                    selected.value ===
                    answers[question]
                ) {

                    score++;

                }

            }
        );


        if (unanswered > 0) {

            assessmentResult.className =
                "assessment-result retry";


            assessmentResult.innerHTML = `

                <strong>
                    Please complete the assessment.
                </strong>

                <p>
                    ${unanswered}
                    question(s) have not been answered.
                </p>

            `;


            nextStep.className =
                "next-step";


            nextStep.innerHTML = `

                <strong>
                    Next step:
                </strong>

                Return to the assessment and answer
                every question.

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

            "DR-05-assessment",

            JSON.stringify({

                score:
                    score,

                percentage:
                    percentage,

                completed:
                    true,

                date:
                    new Date().toISOString()

            })

        );


        /* ==========================================
           MASTERY
           ========================================== */

        if (percentage >= 70) {

            assessmentResult.className =
                "assessment-result pass";


            assessmentResult.innerHTML = `

                <strong>
                    Excellent! ${score}/10
                    (${percentage}%)
                </strong>

                <p>
                    You have demonstrated a secure understanding
                    of binary ↔ hexadecimal conversion.
                </p>

            `;


            nextStep.className =
                "next-step";


            nextStep.innerHTML = `

                <h3>
                    Mastery Pathway
                </h3>

                <p>
                    You are ready to move forward.
                    Your next lesson introduces
                    binary arithmetic.
                </p>

                <a href="DR-06.html"
                   class="primary-btn">

                    Continue to DR-06 →

                </a>

            `;

        }


        /* ==========================================
           REMEDIATION
           ========================================== */

        else {

            assessmentResult.className =
                "assessment-result retry";


            assessmentResult.innerHTML = `

                <strong>
                    ${score}/10
                    (${percentage}%)
                </strong>

                <p>
                    You have not reached the 70% mastery
                    threshold yet. That is not a problem —
                    use the Student Studio to identify the
                    part of the conversion process that needs
                    more practice.
                </p>

            `;


            nextStep.className =
                "next-step";


            nextStep.innerHTML = `

                <h3>
                    Targeted Remediation
                </h3>

                <p>
                    Review these areas:
                </p>

                <ul>

                    <li>
                        <strong>
                            Explore
                        </strong>
                        — the 4-bit to hexadecimal relationship.
                    </li>

                    <li>
                        <strong>
                            Conversion Lab
                        </strong>
                        — practise both directions.
                    </li>

                    <li>
                        <strong>
                            Group It
                        </strong>
                        — especially leading zeros.
                    </li>

                    <li>
                        <strong>
                            Practise
                        </strong>
                        — work through the examples again.
                    </li>

                    <li>
                        <strong>
                            Fix the Mistake
                        </strong>
                        — understand common errors.
                    </li>

                </ul>


                <p>
                    Then retake the assessment.
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


            retryButton.addEventListener(
                "click",
                () => {

                    assessmentForm.reset();


                    assessmentResult.className =
                        "assessment-result hidden";


                    nextStep.className =
                        "next-step hidden";


                    window.scrollTo({

                        top:
                            assessmentForm.offsetTop - 100,

                        behavior:
                            "smooth"

                    });

                }
            );

        }


        assessmentResult.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }
);



/* =========================================================
   GAME BREAK
   ========================================================= */

const gameSelect =
    document.getElementById(
        "gameSelect"
    );

const startGame =
    document.getElementById(
        "startGame"
    );

const gameTimer =
    document.getElementById(
        "gameTimer"
    );

const timerDisplay =
    document.getElementById(
        "timerDisplay"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );


let timerInterval = null;

let remainingSeconds = 300;


startGame.addEventListener(
    "click",
    () => {

        const gameURL =
            gameSelect.value;


        window.open(
            gameURL,
            "_blank"
        );


        remainingSeconds = 300;


        gameTimer.classList.remove(
            "hidden"
        );


        gameMessage.textContent =
            "The game has opened in a new tab. Enjoy your 5-minute break, then return here.";


        updateTimer();


        clearInterval(
            timerInterval
        );


        timerInterval =
            setInterval(
                () => {

                    remainingSeconds--;


                    updateTimer();


                    if (
                        remainingSeconds <= 0
                    ) {

                        clearInterval(
                            timerInterval
                        );


                        timerDisplay.textContent =
                            "00:00";


                        gameMessage.textContent =
                            "Your 5-minute game break is finished. Please close the game and return to your lesson.";

                    }

                },
                1000
            );

    }
);


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
    document.getElementById(
        "learned"
    );

const unclear =
    document.getElementById(
        "unclear"
    );

const saveExit =
    document.getElementById(
        "saveExit"
    );

const exitSaved =
    document.getElementById(
        "exitSaved"
    );


const savedExit =
    localStorage.getItem(
        "DR-05-exit-ticket"
    );


if (savedExit) {

    try {

        const data =
            JSON.parse(
                savedExit
            );


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


saveExit.addEventListener(
    "click",
    () => {

        const data = {

            learned:
                learned.value.trim(),

            unclear:
                unclear.value.trim(),

            date:
                new Date().toISOString()

        };


        localStorage.setItem(

            "DR-05-exit-ticket",

            JSON.stringify(data)

        );


        exitSaved.textContent =
            "✓ Your exit ticket has been saved on this computer.";

    }
);



/* =========================================================
   LESSON VISIT
   ========================================================= */

localStorage.setItem(
    "DR-05-visited",
    "true"
);