import puppeteer from "puppeteer";

const getClassNameFromAnswer = async (question, answer) => {
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
                            ${question}
                        </strong>
                        <p>
                            ${answer}
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
    const describeQuestion = "Describe yourself";
    const graduateQuestion =
        "Are you due to graduate soon, or have you graduated from university in the past two years?";
    const timezoneQuestion = "What time zone are you in?";
    const degreeQuestion =
        "What is your degree result? i.e. Upper second, 2.1, 85%, First class, GPA 3.8/4.0 (expected)";
    const highSchoolQuestion =
        "How did you do in maths, physics or computer science at high school?";
    const languageQuestion =
        "How did you do in your native language at high school?";
    const companyEventQuestion =
        "We expect all colleagues to meet in person twice a year, at internal company events. We try to pick interesting and new locations, so this requires international travel for a total of 2-4 weeks per year depending on your responsibilities. Are you willing and able to commit to this?";

    const classNamePecise = "pecise";
    const classNameMamba = "mamba";
    const classNameNinja = "ninja";
    const classNamePebble = "pebble";
    const classNameElephant = "elephant";

    it(`adds class name based on answer to question - ${describeQuestion}`, async () => {
        const answerOne = "answer";
        const answerTwo = "answer more than 10 characters";
        const answerThree =
            "test answer more than 50 characters - test answers test answers test answers";

        const answerArray = [answerOne, answerTwo, answerThree];

        for (let i = 0; i < answerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                describeQuestion,
                answerArray[i]
            );

            switch (answerArray[i]) {
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

    it(`adds class name based on answer to question - ${graduateQuestion}`, async () => {
        const answer = "test";
        const addedClassName = await getClassNameFromAnswer(
            graduateQuestion,
            answer
        );

        expect(addedClassName).toBe(classNameElephant);
    });

    it(`adds class name based on answer to question - ${timezoneQuestion}`, async () => {
        const answer = "test";
        const addedClassName = await getClassNameFromAnswer(
            timezoneQuestion,
            answer
        );

        expect(addedClassName).toBe(classNameElephant);
    });

    it(`adds class name based on answer to question - ${degreeQuestion}`, async () => {
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
        const answerNineteen = "GPA 3.00/4.00";
        const answerTwenty = "GPA: 3.90/4.00";

        const answerArray = [
            answerOne,
            answerTwo,
            answerThree,
            answerFour,
            answerFive,
            answerSix,
            answerSeven,
            answerEight,
            answerNine,
            answerTen,
            answerEleven,
            answerTwelve,
            answerThirteen,
            answerFourteen,
            answerFifteen,
            answerSixteen,
            answerSeventeen,
            answerEighteen,
            answerNineteen,
            answerTwenty,
        ];

        for (let i = 0; i < answerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                degreeQuestion,
                answerArray[i]
            );

            switch (answerArray[i]) {
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
                case answerNineteen:
                    expect(addedClassName).toBe(classNameMamba);
                    break;
                case answerTwenty:
                    expect(addedClassName).toBe(classNamePebble);
                    break;
                default:
                    expect(addedClassName).toBe(classNameElephant);
                    break;
            }
        }
    });

    it(`adds class name based on answer to question - ${highSchoolQuestion}`, async () => {
        const answerOne = "Top student";
        const answerTwo = "Top 10%";
        const answerThree = "Top 50%";
        const answerFour = "Cannot recall";

        const answerArray = [answerOne, answerTwo, answerThree, answerFour];

        for (let i = 0; i < answerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                highSchoolQuestion,
                answerArray[i]
            );

            switch (answerArray[i]) {
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

    it(`adds class name based on answer to question - ${languageQuestion}`, async () => {
        const answerOne = "Top student";
        const answerTwo = "Top 10%";
        const answerThree = "Top 50%";
        const answerFour = "Cannot recall";

        const answerArray = [answerOne, answerTwo, answerThree, answerFour];

        for (let i = 0; i < answerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                languageQuestion,
                answerArray[i]
            );

            switch (answerArray[i]) {
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

    it(`adds class name based on answer to question - ${companyEventQuestion}`, async () => {
        const answerOne = "Yes";
        const answerTwo = "Not sure";

        const answerArray = [answerOne, answerTwo];

        for (let i = 0; i < answerArray.length; i++) {
            const addedClassName = await getClassNameFromAnswer(
                companyEventQuestion,
                answerArray[i]
            );

            switch (answerArray[i]) {
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

    it("adds class name based on answer to question - others", async () => {
        const question = "Test question";
        const answer = "test";
        const addedClassName = await getClassNameFromAnswer(question, answer);

        expect(addedClassName).toBe(classNameElephant);
    });
});
