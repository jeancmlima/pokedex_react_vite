/**
 * Nome do arquivo: App.jsx
 * Data de criação: 29/05/2025
 * Autor: Jean Carlos
 * Matrícula: 01750191
 *
 * Descrição:
 * Componente principal da aplicação que exibe cartas salvas no localStorage
 * e permite buscar cartas por código usando a API Pokémon TCG.
 */

import { useEffect, useState } from 'react'
import { Card } from 'tcg-sdk'

function App() {
  const [savedCards, setSavedCards] = useState([])
  const [searchCode, setSearchCode] = useState('')
  const [cardResult, setCardResult] = useState(null)

  // Carrega as cartas salvas ao iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedCards')) || []
    setSavedCards(stored)
  }, [])

  // Buscar carta via api
  const handleSearch = async () => {
    try {
      const card = await Card.find(searchCode)
      setCardResult(card)
    } catch (error) {
      alert('Carta não encontrada.')
    }
  }

  return (
    <div className="container mt-4">

      {/* Cartas Salvas */}
      <h2>Cartas Salvas</h2>
      {savedCards.length === 0 ? (
        <p>Nenhuma carta salva.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {savedCards.map(card => (
            <img
              key={card.id}
              src={card.images.small}
              alt={card.name}
              style={{ width: 100 }}
            />
          ))}
        </div>
      )}

      {/* Campo de Busca */}
      <div className="mt-5">
        <h3>Buscar Carta</h3>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Digite o código da carta (ex: base1-4)"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>

    </div>
  )
}

export default App
