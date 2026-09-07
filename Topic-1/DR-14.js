document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       VISITED
    ================================================= */

    localStorage.setItem(
        "DR-14-visited",
        "true"
    );


    /* =================================================
       STUDENT STUDIO TABS
    ================================================= */

    const tabButtons =
        document.querySelectorAll(".tabs button");

    const tabContents =
        document.querySelectorAll(".tab-content");


    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.tab;

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


    /* =================================================
       NUMBER FORMATTER
    ================================================= */

    function formatNumber(value) {

        if (!Number.isFinite(value)) {

            return "Invalid value";

        }

        if (Number.isInteger(value)) {

            return value.toLocaleString();

        }

        return value.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 6
            }
        );

    }


    /* =================================================
       DIAGNOSTIC TOOL
    ================================================= */

    document
        .getElementById("diagnoseBtn")
        .addEventListener("click", () => {

            const selected =
                document.querySelectorAll(
                    ".diagnostic:checked"
                );

            const result =
                document.getElementById(
                    "diagnosticResult"
                );


            if (selected.length === 0) {

                result.innerHTML =
                    `🌟 <strong>Excellent!</strong><br>
                     You have not identified a specific weak area.
                     Attempt the final assessment and let the score
                     provide further evidence.`;

                return;

            }


            const areas = [];

            selected.forEach(item => {

                areas.push(
                    item.parentElement.textContent.trim()
                );

            });


            result.innerHTML =
                `<strong>Areas to revisit:</strong><br>
                 ${areas.join(" · ")}<br><br>
                 Use the Student Studio tabs above before attempting
                 the final assessment.`;

        });


    /* =================================================
       FINAL ASSESSMENT
    ================================================= */

    const answers = {

        q1: "b",
        q2: "b",
        q3: "b",
        q4: "b",
        q5: "b",
        q6: "b",
        q7: "b",
        q8: "c",
        q9: "c",
        q10: "b"

    };


    document
        .getElementById("assessmentForm")
        .addEventListener("submit", event => {

            event.preventDefault();


            let score = 0;

            const incorrect = [];


            Object.keys(answers).forEach(question => {

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

                } else {

                    incorrect.push(
                        question.toUpperCase()
                    );

                }

            });


            const percentage =
                score * 10;


            localStorage.setItem(
                "DR-14-assessment",
                JSON.stringify({

                    score: score,

                    percentage: percentage,

                    date:
                        new Date().toISOString()

                })
            );


            const result =
                document.getElementById(
                    "assessmentResult"
                );


            const pathway =
                document.getElementById(
                    "pathway"
                );


            result.innerHTML =
                `<strong>Final Score:
                ${score}/10
                (${percentage}%)
                </strong>`;


            if (percentage >= 70) {

                pathway.innerHTML =
                    `🎉 <strong>Topic Mastery Achieved!</strong><br><br>

                     You have reached the 70% mastery threshold
                     for Data Representation.<br><br>

                     Your next step is to review your weaker areas,
                     consolidate your understanding and use this
                     knowledge in future programming and problem-solving
                     work.`;

            } else {

                pathway.innerHTML =
                    `📘 <strong>Remediation Required</strong><br><br>

                     You scored below the 70% mastery threshold.<br><br>

                     Questions requiring another look:
                     <strong>
                     ${incorrect.join(", ")}
                     </strong><br><br>

                     Use the Student Studio and the targeted
                     remediation section before attempting the
                     assessment again.`;

            }


            document
                .getElementById("assessment")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });


    /* =================================================
       EXIT TICKET
    ================================================= */

    const saved =
        localStorage.getItem(
            "DR-14-exit-ticket"
        );


    if (saved) {

        const data =
            JSON.parse(saved);


        document.getElementById(
            "learned"
        ).value =
            data.learned || "";


        document.getElementById(
            "unclear"
        ).value =
            data.unclear || "";


        document.getElementById(
            "explain"
        ).value =
            data.explain || "";

    }


    document
        .getElementById("saveExit")
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

                explain:
                    document.getElementById(
                        "explain"
                    ).value,

                date:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "DR-14-exit-ticket",
                JSON.stringify(data)
            );


            document.getElementById(
                "exitSaved"
            ).innerHTML =
                `<div class="result">
                    🌟 Final reflection saved successfully
                    on this device.
                 </div>`;

        });

});


/* =====================================================
   GLOBAL REVEAL
===================================================== */

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