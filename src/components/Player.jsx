import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  function handleClick() {
    setIsEditing((preValue) => !preValue);
  }

  function handleChange(event) {
    setEditedName((preValue) => (preValue = event.target.value));
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            onChange={handleChange}
            type="text"
            required
            value={editedName}
          />
        ) : (
          <span className={"player-name"}>{editedName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
