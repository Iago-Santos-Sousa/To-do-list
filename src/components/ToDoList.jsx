import { useState, useReducer, useRef } from "react";

const ToDoList = () => {
  let contador = 1;
  const tarefasIniciais = [];

  const tarefaRedutor = (state, action) => {
    switch (action.type) {
      case "ADD":
        const novaTarefa = {
          id: Math.random(),
          text: tarefaTexto,
        };

        setTarefaTexto("");

        return [...state, novaTarefa];

      case "REMOVE":
        return state.filter((tarefa) => tarefa.id !== action.id);
      default:
        return state;
    }
  };

  const [tarefaTexto, setTarefaTexto] = useState("");
  const [tasks, dispatchTask] = useReducer(tarefaRedutor, tarefasIniciais);
  const inputRef = useRef(1);

  const enviarTarefa = (e) => {
    e.preventDefault();
    dispatchTask({ type: "ADD" });
  };

  const removerTarefa = (id) => {
    dispatchTask({ type: "REMOVE", id: id });
  };

  return (
    <div className="div-todo">
      <h1>To do list</h1>
      <form onSubmit={enviarTarefa}>
        <input
          ref={inputRef}
          className="input-tarefa"
          placeholder="Informe uma tarefa"
          type="text"
          required
          onChange={(e) => setTarefaTexto(e.target.value)}
          value={tarefaTexto}
          maxLength="40"
        />
        <input type="submit" value="Add" className="btn-enviar" />
      </form>
      <ul>
        {tasks.map((tarefa) => (
          <div key={tarefa.id}>
            <li>
              Tarefa - {contador++} - {tarefa.text}
            </li>
            <button
              className="btn-remover"
              onClick={() => removerTarefa(tarefa.id)}
            >
              Remover
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
