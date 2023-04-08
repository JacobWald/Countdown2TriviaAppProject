import Answer from "./answer";
import React, { useEffect, useState } from "react";

export default function Question(props) {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAmount, setCorrectAmount] = useState(0);
  const [incorrectAmount, setIncorrectAmount] = useState(0);
  const [isMultipleChoice, setIsMultipleChoice] = useState(true);
  const [questionInfo, setQuestionInfo] = useState([]);
  const [gameState, setGameState] = useState(true);

  useEffect(() => {
    setIsMultipleChoice(checkIsMultipleChoice());
  }, [questionNumber]);

  function checkIsMultipleChoice() {
    if (!(questionNumber >= props.questionList.length)) {
      if (props.questionList[questionNumber - 1].type === "multiple") {
        return true;
      } else {
        return false;
      }
    }
  }

  function handleClick(index) {
    if (
      questionInfo[index] ===
      (isMultipleChoice ? questionInfo[3] : questionInfo[1])
    ) {
      setCorrectAmount(correctAmount + 1);
    } else {
      setIncorrectAmount(incorrectAmount + 1);
    }
    setGameState(!(questionNumber >= props.questionList.length));
    setQuestionNumber(questionNumber + 1);
    setQuestionInfo(
      isMultipleChoice
        ? [
            props.questionList[questionNumber - 1].incorrect_answers[0],
            props.questionList[questionNumber - 1].incorrect_answers[1],
            props.questionList[questionNumber - 1].incorrect_answers[2],
            props.questionList[questionNumber - 1].correct_answer,
          ]
        : [
            props.questionList[questionNumber - 1].incorrect_answers[0],
            props.questionList[questionNumber - 1].correct_answer,
          ]
    );
  }

  useEffect(() => {
    if (!(questionNumber >= props.questionList.length)) {
      setQuestionInfo(
        isMultipleChoice
          ? [
              props.questionList[questionNumber - 1].incorrect_answers[0],
              props.questionList[questionNumber - 1].incorrect_answers[1],
              props.questionList[questionNumber - 1].incorrect_answers[2],
              props.questionList[questionNumber - 1].correct_answer,
            ]
          : [
              props.questionList[questionNumber - 1].incorrect_answers[0],
              props.questionList[questionNumber - 1].correct_answer,
            ]
      );
    }
  }, [questionNumber, isMultipleChoice]);

  return (
    <>
      {gameState ? (
        <div>
          <h2>
            {questionNumber +
              ". " +
              props.questionList[questionNumber - 1].question}
          </h2>
          {questionInfo.map((element, index) => (
            <Answer
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

//TODO: Add MaterialUI
//TODO: First Question is getting an answer set from some previously generated question somehow....
//TODO: Have to comment out Line 14 of trivia.js to initially run code (idk why)
//TODO: Randomize question placement on the UI. Currently the correct answer is always that last choice.
