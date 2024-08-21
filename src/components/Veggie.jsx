import React, { useEffect, useState }  from 'react'
import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css'
import {Wrapper, Card, Gradient} from './Popular.jsx'
import { Link } from 'react-router-dom';

function Veggie() {

    
    const [veggie, setVeggie] = useState([]);

    useEffect(()=>{
        getVeggie();
    },[])

    const getVeggie = async()=>{

    const check = localStorage.getItem('veggie');

    if (check) {
        try { // Wrap parsing in a try-catch block
          setVeggie(JSON.parse(check));
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
          // Handle parsing error (optional)
        }

    } else {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
        const data = await api.json();
        localStorage.setItem('veggie', JSON.stringify(data.recipes))
        setVeggie(data.recipes);
        console.log(data.recipes);
    }


    

}

  return (
    <div>
      <Wrapper>
        <h3>Our Vegeterian Picks</h3>

        <Splide 
            options={{
                perPage: 3, // Displays 2 items per page
                arrows: false, // Hides the default navigation arrows
                drag: 'free', // Enables free dragging of slides
                pagination: false, // Hides the pagination dots
                gap: '5rem' // Sets a gap of 5rem between slides
            }}
        >
        {veggie.map((recipe) => (
          <SplideSlide>
            <Card key={recipe.id}>
              <Link to={'../recipe/' +recipe.id} >
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title} />
                <Gradient />
              </Link>
            </Card>
          </SplideSlide>
        ))}
        </Splide>
      </Wrapper>
    </div>
  )
}

export default Veggie