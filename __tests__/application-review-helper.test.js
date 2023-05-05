import puppeteer from "puppeteer";

const getClassNameFromAnswer = async (questionAndAnswer) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = `
        <!DOCTYPE html>
        <html>
        <head></head>
        <body>
            <div id="test-container">
                <div data-provides="app-review">
                    <div data-provides="question-">
                        <strong>
                            ${questionAndAnswer["question"]}
                        </strong>
                        <p>
                            ${questionAndAnswer["answer"]}
                        </p>
                        </div>
                </div>
            </div>
          </body>
        </html>
        `;
    await page.setContent(html);
    await page.addScriptTag({
        path: "./application-review-helper.user.js",
    });
    const evaluatedPage = await page.evaluate(() => {
        testContainer = document.getElementById("test-container");
        const questionContainer = testContainer.querySelector(
            'div[data-provides^="question-"'
        );
        return questionContainer.className;
    });
    await browser.close();

    return evaluatedPage;
};

describe("Application review helper tests", () => {
    const classNamePecise = "pecise";
    const classNameMamba = "mamba";
    const classNameNinja = "ninja";
    const classNamePebble = "pebble";
    const classNameElephant = "elephant";

    it("adds class name based on answer to question - case 1", async () => {
        const question = "Describe yourself";
        const answerOne = "answer";
        const answerTwo = "answer more than 10 characters";
        const answerThree =
            "test answer more than 50 characters - test answers test answers test answers";

        const questionAndAnswerArray = [
            { question, answer: answerOne },
            { question, answer: answerTwo },
            { question, answer: answerThree },
        ];

        for (let i = 0; i < questionAndAnswerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                questionAndAnswerArray[i]
            );

            switch (questionAndAnswerArray[i]["answer"]) {
                case answerOne:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                case answerTwo:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerThree:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
                default:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
            }
        }
    });

    it("adds class name based on answer to question - case 2", async () => {
        const question =
            "Are you due to graduate soon, or have you graduated from university in the past two years?";
        const answer = "test";
        const questionAndAnswer = { question, answer };
        const addedClassName = await getClassNameFromAnswer(questionAndAnswer);

        expect(addedClassName).toBe(classNameElephant);
    });

    it("adds class name based on answer to question - case 3", async () => {
        const question = "What time zone are you in?";
        const answer = "test";
        const questionAndAnswer = { question, answer };
        const addedClassName = await getClassNameFromAnswer(questionAndAnswer);

        expect(addedClassName).toBe(classNameElephant);
    });

    it("adds class name based on answer to question - case 4", async () => {
        const question =
            "What is your degree result? i.e. Upper second, 2.1, 85%, First class, GPA 3.8/4.0 (expected)";
        const answerOne = "n/a";
        const answerTwo = "0";
        const answerThree = "3";
        const answerFour = "3.8";
        const answerFive = "3.7";
        const answerSix = "3.6";
        const answerSeven = "2.5";
        const answerEight = "3/4";
        const answerNine = "9/10";
        const answerTen = "19/20";
        const answerEleven = "2-1";
        const answerTwelve = "2:1";
        const answerThirteen = "2:2";
        const answerFourteen = "95%";
        const answerFifteen = "85%";
        const answerSixteen = "70%";
        const answerSeventeen = "50%";
        const answerEighteen = "first class";

        const questionAndAnswerArray = [
            { question, answer: answerOne },
            { question, answer: answerTwo },
            { question, answer: answerThree },
            { question, answer: answerFour },
            { question, answer: answerFive },
            { question, answer: answerSix },
            { question, answer: answerSeven },
            { question, answer: answerEight },
            { question, answer: answerNine },
            { question, answer: answerTen },
            { question, answer: answerEleven },
            { question, answer: answerTwelve },
            { question, answer: answerThirteen },
            { question, answer: answerFourteen },
            { question, answer: answerFifteen },
            { question, answer: answerSixteen },
            { question, answer: answerSeventeen },
            { question, answer: answerEighteen },
        ];

        for (let i = 0; i < questionAndAnswerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                questionAndAnswerArray[i]
            );

            switch (questionAndAnswerArray[i]["answer"]) {
                case answerOne:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                case answerTwo:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                case answerThree:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                case answerFour:
                    expect(addedClassName).toBe(classNamePebble);
                    break;
                case answerFive:
                    expect(addedClassName).toBe(classNameNinja);
                    break;
                case answerSix:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerSeven:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
                case answerEight:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerNine:
                    expect(addedClassName).toBe(classNameNinja);
                    break;
                case answerTen:
                    expect(addedClassName).toBe(classNamePebble);
                    break;
                case answerEleven:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
                case answerTwelve:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerThirteen:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                case answerFourteen:
                    expect(addedClassName).toBe(classNamePebble);
                    break;
                case answerFifteen:
                    expect(addedClassName).toBe(classNameNinja);
                    break;
                case answerSixteen:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerSeventeen:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                case answerEighteen:
                    expect(addedClassName).toBe(classNamePebble);
                    break;
                default:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
            }
        }
    });

    it("adds class name based on answer to question - case 5", async () => {
        const question =
            "How did you do in maths, physics or computer science at high school?";
        const answerOne = "Top student";
        const answerTwo = "Top 10%";
        const answerThree = "Top 50%";
        const answerFour = "Cannot recall";

        const questionAndAnswerArray = [
            { question, answer: answerOne },
            { question, answer: answerTwo },
            { question, answer: answerThree },
            { question, answer: answerFour },
        ];

        for (let i = 0; i < questionAndAnswerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                questionAndAnswerArray[i]
            );

            switch (questionAndAnswerArray[i]["answer"]) {
                case answerOne:
                    expect(addedClassName).toBe(classNamePebble);
                    break;
                case answerTwo:
                    expect(addedClassName).toBe(classNameNinja);
                    break;
                case answerThree:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerFour:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                default:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
            }
        }
    });

    it("adds class name based on answer to question - case 6", async () => {
        const question =
            "How did you do in your native language at high school?";
        const answerOne = "Top student";
        const answerTwo = "Top 10%";
        const answerThree = "Top 50%";
        const answerFour = "Cannot recall";

        const questionAndAnswerArray = [
            { question, answer: answerOne },
            { question, answer: answerTwo },
            { question, answer: answerThree },
            { question, answer: answerFour },
        ];

        for (let i = 0; i < questionAndAnswerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                questionAndAnswerArray[i]
            );

            switch (questionAndAnswerArray[i]["answer"]) {
                case answerOne:
                    expect(addedClassName).toBe(classNamePebble);
                    break;
                case answerTwo:
                    expect(addedClassName).toBe(classNameNinja);
                    break;
                case answerThree:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerFour:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                default:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
            }
        }
    });

    it("adds class name based on answer to question - case 7", async () => {
        const question =
            "We expect all colleagues to meet in person twice a year, at internal company events. We try to pick interesting and new locations, so this requires international travel for a total of 2-4 weeks per year depending on your responsibilities. Are you willing and able to commit to this?";
        const answerOne = "Yes";
        const answerTwo = "Not sure";

        const questionAndAnswerArray = [
            { question, answer: answerOne },
            { question, answer: answerTwo },
        ];

        for (let i = 0; i < questionAndAnswerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                questionAndAnswerArray[i]
            );

            switch (questionAndAnswerArray[i]["answer"]) {
                case answerOne:
                    expect(addedClassName).toBe(classNameNinja);
                    break;
                case answerTwo:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
                default:
                    expect(addedClassName).toBe(classNamePecise);
                    break;
            }
        }
    });

    it("adds class name based on answer to question - default case", async () => {
        const question = "Test question";
        const answer = "test";
        const questionAndAnswer = { question, answer };
        const addedClassName = await getClassNameFromAnswer(questionAndAnswer);

        expect(addedClassName).toBe(classNameElephant);
    });
});
