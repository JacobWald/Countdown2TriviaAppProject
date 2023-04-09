import Answer from "./answer";
import React, { useEffect, useState } from "react";

export default function Question(props) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAmount, setCorrectAmount] = useState(0);
  const [incorrectAmount, setIncorrectAmount] = useState(0);
  const [isMultipleChoice, setIsMultipleChoice] = useState(true);
  const [questionInfo, setQuestionInfo] = useState([]);
  const [gameState, setGameState] = useState(true);

  useEffect(() => {
    setIsMultipleChoice(checkIsMultipleChoice());
  }, [questionNumber, props.questionList]);

  function checkIsMultipleChoice() {
    if (!(questionNumber >= props.questionList.length)) {
      if (props.questionList[questionNumber].type === "multiple") {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    if (!(questionNumber >= props.questionList.length)) {
      const options = isMultipleChoice
        ? [
            props.questionList[questionNumber].incorrect_answers[0],
            props.questionList[questionNumber].incorrect_answers[1],
            props.questionList[questionNumber].incorrect_answers[2],
            props.questionList[questionNumber].correct_answer,
          ]
        : [
            props.questionList[questionNumber].incorrect_answers[0],
            props.questionList[questionNumber].correct_answer,
          ];

      // Fisher-Yates shuffle algo (googled)
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      setQuestionInfo(options);
    }
  }, [questionNumber, isMultipleChoice, props.questionList]);

  function handleClick(index) {
    if (
      questionInfo[index] === props.questionList[questionNumber].correct_answer
    ) {
      setCorrectAmount(correctAmount + 1);
    } else {
      setIncorrectAmount(incorrectAmount + 1);
    }
    if (questionNumber < props.questionList.length - 1) {
      setQuestionNumber(questionNumber + 1);
    } else {
      setGameState(false);
    }
  }

  if (!props.questionList || props.questionList.length === 0) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        {gameState ? (
          <div>
            <h2>
              {questionNumber +
                1 +
                ". " +
                props.questionList[questionNumber].question}
            </h2>
            {questionInfo.map((element, index) => (
              <Answer
                key={index}
                value={element}
                index={index + 1}
                onButtonClick={() => handleClick(index)}
              />
            ))}
            <p>{`You have answered ${correctAmount} questions correctly`}</p>
            <p>{`You have answered ${incorrectAmount} questions incorrectly`}</p>
          </div>
        ) : (
          <div>
            <p>Game over!</p>
            <p>{`You answered ${correctAmount} questions correctly and ${incorrectAmount} questions incorrectly.`}</p>
          </div>
        )}
      </>
    );
  }
}
