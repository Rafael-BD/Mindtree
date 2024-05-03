import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MyTreeComponent from './mock/treeCanvas.jsx';
import styled from 'styled-components';

const Container = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const data = {
  name: "Ideia Inicial",
  children: [
    {
      name: "Ideia 1",
      children: [
        { name: "Sub-ideia 1.1" },
        { name: "Sub-ideia 1.2" }
      ]
    },
    {
      name: "Ideia 2",
      children: [
        { name: "Sub-ideia 2.1" },
        { name: "Sub-ideia 2.2" }
      ]
    }
  ]
};


function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <MyTreeComponent data={data} />
    </Container>
  )
}

export default App
