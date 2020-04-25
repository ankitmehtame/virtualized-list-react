import React from 'react'
import styled from 'styled-components'
import { DetailComponent } from './components/detail'

const AppRoot = styled.div`
  display: grid;
  height: 100vh;
  width: 100%;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  /* background-color: #282c34; */
  /* color: white; */
  background-color: #282c34;
  color: white;
  @media screen and (prefers-color-scheme: light) {
    background-color: white;
    color: black;
  }

  input[type='button'], input[type='submit'], button {
    background-color: #555555;
    color: white;
    @media screen and (prefers-color-scheme: light) {
      background-color: #e7e7e7;
      color: black;
    }
    border: none;
    padding: 10px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
`

const Header = styled.div`
  margin: 0.2em;
  text-align: center;
`

function App() {
  return (
    <AppRoot>
      <Header>Virtualized vs Normal List</Header>
      <DetailComponent/>
    </AppRoot>
  )
}

export default App
