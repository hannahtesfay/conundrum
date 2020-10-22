import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"

const Button = styled.button`
  border: 2px solid #00b5ad;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  font-family: 'Poppins', sans-serif !important;
  font-weight: 600;
  padding: 0.6rem;
  margin: 0;
  } 
`
const Toggle = ({theme,  toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} >
          Switch Theme
        </Button>
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;

//   background: ${({ theme }) => theme.background};
// ${({ theme }) => theme.toggleBorder};