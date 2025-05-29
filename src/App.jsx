/**
 * Nome do arquivo: App.jsx
 * Data de criação: 29/05/2025
 * Autor: Jean Carlos
 * Matrícula: 01750191
 *
 * Descrição:
 * Componente principal da aplicação que exibe cartas salvas no localStorage,
 * permite buscar cartas por código usando a API Pokémon TCG
 * e salvar cartas visualizadas evitando duplicatas.
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

  // Salvar carta no localStorage
  const handleSaveCard = () => {
    const updated = [...savedCards, cardResult]
    localStorage.setItem('savedCards', JSON.stringify(updated))
    setSavedCards(updated)
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

      {/* Detalhes da Carta */}
      {cardResult && (
        <div className="card mt-4 p-3 text-start">
          <img src={cardResult.images.large} className="img-fluid mb-3" alt={cardResult.name} />
          <h3>{cardResult.name}</h3>
          <p><strong>Supertype:</strong> {cardResult.supertype}</p>
          <p><strong>Subtypes:</strong> {cardResult.subtypes?.join(', ')}</p>
          <p><strong>HP:</strong> {cardResult.hp}</p>
          <p><strong>Tipos:</strong> {cardResult.types?.join(', ')}</p>
          <p><strong>Evolui para:</strong> {cardResult.evolvesTo?.join(', ')}</p>
          <p><strong>Regras:</strong> {cardResult.rules?.join(' / ')}</p>

          <h5>Ataques:</h5>
          <ul>
            {cardResult.attacks?.map((atk, i) => (
              <li key={i}>
                <strong>{atk.name}</strong>: {atk.text} ({atk.damage})
              </li>
            ))}
          </ul>

          <p><strong>Fraquezas:</strong> {cardResult.weaknesses?.map(w => `${w.type} (${w.value})`).join(', ')}</p>
          <p><strong>Recuo:</strong> {cardResult.retreatCost?.join(', ')}</p>
          <p><strong>Conjunto:</strong> {cardResult.set.name} - {cardResult.set.releaseDate}</p>
          <p><strong>Nº:</strong> {cardResult.number} - <strong>Raridade:</strong> {cardResult.rarity}</p>
          <p><strong>Artista:</strong> {cardResult.artist}</p>
          <p><strong>Preço médio:</strong> R$ {cardResult.tcgplayer?.prices?.holofoil?.market?.toFixed(2) || 'N/A'}</p>

          {/* Botão Salvar Carta */}
          <button
            className="btn btn-success mt-3"
            disabled={savedCards.some(c => c.id === cardResult.id)}
            onClick={handleSaveCard}
          >
            {savedCards.some(c => c.id === cardResult.id)
              ? 'Carta já salva'
              : 'Salvar Carta'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App
