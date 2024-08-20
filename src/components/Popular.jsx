import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(()=>{
        getPopular();
    },[])

    const getPopular = async()=>{

    const check = localStorage.getItem('popular');

    if(check){
        setPopular(JSON.parse(check));
    } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=20`)
        const data = await api.json();
        localStorage.setItem('popular', JSON.stringify(data.recipes))
        setPopular(data.recipes);
        console.log(data.recipes);
    }


    

}

return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>

        <Splide 
            options={{
                perPage: 4, // Displays 2 items per page
                arrows: false, // Hides the default navigation arrows
                drag: 'free', // Enables free dragging of slides
                pagination: false, // Hides the pagination dots
                gap: '5rem' // Sets a gap of 5rem between slides
            }}
        >
        {popular.map((recipe) => (
            <SplideSlide>
          <Card key={recipe.id}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title} />
            <Gradient />
          </Card>
          </SplideSlide>
        ))}
        </Splide>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 5%;
  overflow: hidden;
  position: relative;

  p {
    position: absolute;
    z-index: 10;
    bottom: 0; /* Position text at the bottom */
    left: 0; /* Position text at the left */
    width: 100%; /* Full width of the card */
    padding: 1rem; /* Add padding for spacing */
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
    color: #fff;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
  }

  img {
    border-radius: 5%;
    position: absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit: cover;
    }

`;

const Gradient = styled.div`
    z-index:3;
    position:absolute;
    width:100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))
`;
export { Wrapper, Card, Gradient };

export default Popular