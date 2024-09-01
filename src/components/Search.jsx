import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

function Search() {
    const [input, setInput] = useState(" ");
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();
        navigate('../searched/' + input)
    }

  return (
    <FormStyle onSubmit={submitHandler}>
        <FaSearch />
        <input 
        onChange={(e)=>{setInput(e.target.value)}} 
        type='text' 
        value={input}
        />
    </FormStyle>
  )
}

const FormStyle = styled.form`
    margin: 2rem 20rem;
    position: relative;
    width: 100%;
    

    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5 rem;
        color: white;
        padding: 1rem 2.5rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width 100%;
    }

    svg {
        position: absolute;
        top: 30%;
        left: 0%;
        transform: translate(100%, -5%);
        color: white;
    }

`

export default Search