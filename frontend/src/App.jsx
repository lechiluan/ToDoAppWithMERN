import { useEffect, useState } from "react";
import Todo from "./components/ToDo"; // Make sure the file path is correct
import { getAllToDo, addToDo, updateToDo, deleteToDo} from "./utils/HandleAPI"; // 

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [update, setUpdate] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (id, text) => {
    setUpdate(true);
    setText(text);
    setToDoId(id);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>TO DO APPLICATION</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={update ? () => updateToDo(toDoId, text, setToDo, setText, setUpdate) : () => addToDo(text, setText, setToDo)}>{update ? "Update" : "Add"}
          </div>

        </div>

        <div className="list">
          {toDo.map((item) => (
            <Todo key={item._id} text={item.text} 
            updateMode={() => updateMode(item._id, item.text)}
            deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
