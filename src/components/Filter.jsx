function Filter({ onFilterChange }) {
  function filterChangeHandler(event) {
    onFilterChange(event.target.value);
  }

  return (
    <select id="filter" onChange={filterChangeHandler}>
      <option value="all">Tutte</option>
      <option value="urgent">🚨 Urgente</option>
      <option value="important">🔴 Importante</option>
      <option value="moderate">🔵 Moderato</option>
      <option value="low">🟢 Basso</option>
    </select>
  );
}

export default Filter;
