import styled from 'styled-components';

export default styled.button`
  font-family: montserrat, arial;
  border-radius: 25px;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin: 10px;
  background-color: black;
  color: white;
  border: 2px solid white;
  width: 200px;
  height: 35px;
  &: hover {
    background: white;
    color: #222222;
    border: 2px solid grey;
  }
  &: focus {
    background: white;
    color: #222222;
    border: 2px solid grey;
  }
`;
