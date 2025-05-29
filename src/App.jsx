/**
 * Nome do arquivo: main.jsx
 * Data de criação: 29/05/2025
 * Autor: Jean Carlos
 * Matrícula: 01750191
 *
 * Descrição:
 * Componente principal da aplicação criado pelo template inicial do Vite + React.
 * Atualmente exibe os logotipos do Vite e do React, contador de cliques e links de documentação.
 * Será substituído posteriormente pelo dashboard de cartas do Pokémon TCG.
 */

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
