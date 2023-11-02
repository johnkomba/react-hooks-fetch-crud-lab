import React from "react";

function QuestionItem({ question, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={(e) => {
            fetch(`http://localhost:4000/questions/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ correctIndex: e.target.value }),
            })
              .then(() => {
                setQuestions((prevQuestions) =>
                  prevQuestions.map((q) =>
                    q.id === id ? { ...q, correctIndex: parseInt(e.target.value) } : q
                  )
                );
              })
              .catch((error) => console.error("Error updating question:", error));
          }}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
