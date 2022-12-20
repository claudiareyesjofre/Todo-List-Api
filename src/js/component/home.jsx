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
			<ul>
				<li>
					<input
					 placeholder="ingresa"
					onKeyPress={(event) => {
						if(event.key === "Enter") {
							nueva([...tarea, {label: event.target.value,done: false}]);
							event.target.value ="";
						}
					}} />
				</li>
				{tarea.map((value, index) => {
					return(
						<li key={index}>
							{value.label} <i className="fas fa-times float-end my-1 mx-1"
							onClick={() => nueva(tarea.filter((value,i)=> index != i))
							}
							></i>
						</li>
					);
				})}
				<div className="left"> {tarea.length} Item Left</div>
			</ul>
	</div>
	);
}; 


export default Home;
