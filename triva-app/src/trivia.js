import Question from "./question.js";
import React, { useState, useEffect } from "react";

export default function Trivia() {
  const [questions, setQuestions] = useState([]);
  console.log(questions);
  useEffect(() => {
    generateQuestions(setQuestions);
  }, []);

  return (
    <>
      <h1>Triva Game!</h1>
      <Question question="Test Question" />
    </>
  );
}

const generateQuestions = (setData) => {
  fetch("https://opentdb.com/api.php?amount=10")
    .then((res) => res.json())
    .then((data) => setData(data.results));
};
