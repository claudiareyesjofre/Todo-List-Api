
import React, { useState, useEffect } from "react";

const Todo = () => {
    const [tareas, setTarea] = useState([]);
    const deleteTarea = (i) => {
        setTarea(
            tareas.filter((value, index) => {
                return index != i;
            })
        );
    };

    function putApi() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(tareas);

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(
            "https://assets.breatheco.de/apis/fake/todos/user/claudia",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    }

    useEffect(() => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/claudia")
            .then((respuesta) => respuesta.json())
            .then((data) => setTarea(data));
    }, []);

    useEffect(() => {
        putApi();
    }, [tareas])

    return (
        <div className="container">
            <h1>Todo List</h1>
            <input
                placeholder="Escribir tarea"
                onKeyPress={(event) => {
                    if (event.key == "Enter") {
                        setTarea([...tareas, { label: event.target.value, done: false }]);
                        event.target.value = "";
                    }
                }}
            />

            {tareas.map((value, index, i) => {
                return (
                    <div className="task-container d-flex">
                        <div className="task-name" key={index}>
                            {value.label}
                        </div>
                        <div className="button-container">
                            <button
                                className="delete-button"
                                onClick={() => deleteTarea(index)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                );
            })}
            <div className="left">
        	    <p>Faltan {tareas.length} por finalizar.</p>
    	    </div>
        </div>
    );
};

export default Todo;
