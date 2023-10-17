import { useRef, useState } from 'react';

import './NewTask.css';

function NewTask({ onAddTask, onCancel }) {
  const titleRef = useRef();
  const summaryRef = useRef();
  const categoryRef = useRef();

  const [formInvalid, setFormInvalid] = useState(false);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredSummary = summaryRef.current.value;
    const chosenCategory = categoryRef.current.value;

    if (
      enteredTitle.trim().length === 0 ||
      enteredSummary.trim().length === 0
    ) {
      setFormInvalid(true);
      return;
    }

    const taskData = {
      title: enteredTitle,
      summary: enteredSummary,
      category: chosenCategory,
    };
    onAddTask(taskData);
  }

  return (
    <form id="new-task-form" onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">Titolo</label>
        <input type="text" id="title" ref={titleRef} />
      </p>
      <p>
        <label htmlFor="summary">Descrizione</label>
        <textarea id="summary" rows="5" ref={summaryRef} />
      </p>
      <p>
        <label htmlFor="category">Categoria</label>
        <select id="category" ref={categoryRef} defaultValue="moderate">
          <option value="urgent">🚨 Urgente</option>
          <option value="important">🔴 Importante</option>
          <option value="moderate">🔵 Moderato</option>
          <option value="low">🟢 Basso</option>
        </select>
      </p>
      {formInvalid && (
        <p className="error-message">
          Inserisci i valori di Titolo, Descrizione e Categoria!
        </p>
      )}
      <p className="actions">
        <button type="button" onClick={onCancel}>Cancella</button>
        <button type="submit">Aggiungi To-Do</button>
      </p>
    </form>
  );
}

export default NewTask;
