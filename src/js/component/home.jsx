import React,{useState,useEffect} from "react";

const Home = () => {
	const [tarea, nueva] = useState([]);

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

fetch("http://assets.breatheco.de/apis/fake/todos/user/claudia", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
	useEffect(()=>{
		fetch("https://assets.breatheco.de/apis/fake/todos/user/claudia")
		.then((respuesta) => respuesta.json())
		.then((data) => nueva(data));
	}, []);
	
	useEffect(()=>{
		api();
	},[tarea]);
	
	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Todo List!</h1>
			<form onSubmit={(evento)=>{
				evento.preventDefault()
nueva([...tarea, {label:evento.target[0].value, done:false}]);			
			
			}}>
				<input type="text" placeholder="agregar" ></input>
			</form>
			{tarea.map((elm,index)=>{
				return<li key={index}>{elm.label}</li>
			})}	
			<p>Faltan {tarea.length} para terminar</p>	
		</div>
	);
};

export default Home;
