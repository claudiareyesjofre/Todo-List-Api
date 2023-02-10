import React,{useState,useEffect} from "react";

const Home = () => {
	const [tarea, nueva] = useState([]);
	const borrar = (b) => {
		nueva(tarea.filter((value, index, arr) => {
			return index != b;
		  })
		);
	  };
	

function api ()  {
	var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(tarea);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(
	"http://assets.breatheco.de/apis/fake/todos/user/claudia", 
	requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
}
	useEffect(()=>{
		fetch("https://assets.breatheco.de/apis/fake/todos/user/claudia")
		.then((response) => response.json())
		.then((data) => nueva(data));
	}, []);
	
	useEffect(()=>{
		api();
	},[tarea]);



	return (
		<div className="container">
			<h1>Lista de Tareas</h1>
			<form
        onSubmit={(event) => {
          event.preventDefault(); //que no se actualize el componente//
          nueva([...tarea, { label: event.target[0].value, done: false }]);
          putApi();
          event.target[0].value="";
        }}
      >
        
        <input type="text" placeholder="ingresa"></input>
        <button> Ingresar </button>
      </form>
      {tarea.map((value, index) => {
        return (
          <li key={index}>
            {value.label}
            <button onClick={() => borrar(index)}> X </button>
          </li>
        );
      })}
				<div className="left"> {tarea.length} te quedan tareas</div>
	
	</div>
	);
}; 


export default Home;
