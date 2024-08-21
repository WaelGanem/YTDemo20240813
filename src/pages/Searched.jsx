import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Searched() {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
    
    }

    useEffect(()=>{
        getSearched(params.search);
        console.log(params.search);
    },[params.search])

  return (
    <Grid>
        {searchedRecipes.map((item) => {
            return(
            <Link to={'/recipe/' +item.id}>
                <Card key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.tittle}</h4>
                </Card>
            </Link>
            )
        })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  overflow: visible; // Ensure no overflow hidden
`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }
    a{
        text-decoration: none;
    }
    h4{
    text-align: center;
    padding: 1rem;
    }
`

export default Searched