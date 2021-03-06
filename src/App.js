import React, { useState } from "react";
import "./App.css";

const defaultItems = JSON.parse(localStorage.getItem("items")) || [];

const storeToStorage = (items) => {
  localStorage.setItem("items", JSON.stringify(items));
};

function App() {
  const [items, setItems] = useState(defaultItems);
  const [inputValue, setInputValue] = useState("");

  const updateItems = (newItems) => {
    // updated Items in LocalStorage
    storeToStorage(newItems);

    // update State
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      const newItem = {
        text: inputValue,
        selected: false,
      };

      const newItems = [...items, newItem];

      updateItems(newItems);
      setInputValue("");
    }
  };

  const randomizer = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(pickRandomItem, 100 * i + 100);
    }
  };

  const pickRandomItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const newItems = items.map((item) =>
      item === randomItem
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );

    updateItems(newItems);
  };

  const removeItem = (i) => {
    const newItems = items.filter((_, idx) => idx !== i);

    updateItems(newItems);
  };

  return (
    <>
      <h1 className="text-4xl mb-6">Randomizer</h1>
      <div className="container bg-white mx-auto shadow-lg w-full sm:w-2/4 h-auto p-6">
        <form onSubmit={handleSubmit} className="flex">
          <input
            className="py-2 px-4 border border-gray-500 flex-1"
            type="text"
            placeholder="Add a new item"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button className="bg-blue-500 border border-blue-500 hover:bg-blue-700 text-white py-2 px-4">
            Add
          </button>
        </form>

        <ul>
          {items.map((item, idx) => (
            <li
              className={`select-none cursor-pointer hover:bg-orange-300 my-3 p-2 ${
                item.selected ? "bg-orange-500 text-white" : ""
              }`}
              onDoubleClick={() => removeItem(idx)}
              key={idx}
            >
              {item.text}
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <>
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white py-2 px-4"
              onClick={randomizer}
            >
              Randomize
            </button>
            <small className="text-gray-700 mt-3 inline-block">
              * Double click to remove an item
            </small>
          </>
        )}
      </div>
    </>
  );
}

export default App;
