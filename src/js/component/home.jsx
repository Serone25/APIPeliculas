//API from https://www.themoviedb.org/
//tutorial from https://www.youtube.com/watch?v=PNr8-JDMinU&t=1475s

import { element } from "prop-types";
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import "../../styles/index.css";


//create your first component
const Home = () => {

	const [movieList, setMovieList] = useState([]);
	const [loading, setLoading] = useState(true);
	const url="https://image.tmdb.org/t/p/w500";
	const [paginaUp, setPaginaUp] = useState(1);

	useEffect(() =>{
		fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=1efc1bbb81a51e57cf1edb7bb3b6b380&language=es-ES&page=${paginaUp}`) //Cojemos pagina por pagina
		.then(response => {
			response.json()									//el metodo json tb en asíncrono por lo que hay que esperar con otro then
			.then(response => {
				setLoading(false)
				console.log(response)
				setMovieList(response.results)
				console.log(response.page)
			})
		})
		.catch(function(error){
			console.log(error)
		})
	},[paginaUp])

	

	return (
		<div className="text-center">
			<>
				<h1>Las mejores películas</h1>
				{loading ? <div>Cargando</div> : 
					<Row className ="g-4">{movieList.map(element =>
						<Col sm={4}>
							<Card>
								<Card.Img variant="top" src={url+element.poster_path}/>
								<Card.Body className="cuerpoCarta">
									<Card.Title className="tituloCarta">{element.title}</Card.Title>
									<Card.Text>
										{element.overview}
									</Card.Text>
									<Card.Text className="notas">{element.vote_average}/10</Card.Text>
								</Card.Body>
							</Card>
						</Col>)}
					</Row>}
					<Stack className="justify-content-md-center" direction="horizontal" gap={3}>
						<Button variant="primary" size="lg" onClick={()=>{paginaUp>=2 ? setPaginaUp(paginaUp-1): paginaUp = 1}}>Anterior</Button>
						<Button variant="success" size="lg" onClick={()=>{paginaUp<=20 ? setPaginaUp(paginaUp+1): paginaUp = 20}}>Siguiente</Button>
					</Stack>
			</>
		</div>
	);
};

export default Home;
