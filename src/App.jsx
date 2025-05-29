/**
 * Nome do arquivo: App.jsx
 * Data de criação: 29/05/2025
 * Autor: Jean Carlos
 * Matrícula: 01750191
 *
 * Descrição:
 * Componente principal da aplicação que exibe cartas salvas no localStorage,
 * permite buscar cartas por nome ou código usando a API Pokémon TCG,
 * exibir múltiplos resultados e salvar cartas visualizadas evitando duplicatas.
 */

import { useEffect, useState } from 'react'

function App() {
  const [savedCards, setSavedCards] = useState([])
  const [searchCode, setSearchCode] = useState('')
  const [cardResult, setCardResult] = useState([])

  // Carrega as cartas salvas ao iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedCards')) || []
    setSavedCards(stored)
  }, [])

  // Buscar carta por código ou nome
  const handleSearch = async () => {
    try {
      const url = searchCode.includes('-')
        ? `https://api.pokemontcg.io/v2/cards/${searchCode}`
        : `https://api.pokemontcg.io/v2/cards?q=name:"${searchCode}"`

      const response = await fetch(url)
      if (!response.ok) throw new Error('Carta não encontrada.')

      const data = await response.json()
      if (Array.isArray(data.data)) {
        setCardResult(data.data)
      } else {
        setCardResult([data.data])
      }
    } catch (error) {
      alert('Carta não encontrada.')
      setCardResult([])
    }
  }

  // Salvar carta no localStorage
  const handleSaveCard = (card) => {
    const updated = [...savedCards, card]
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
          placeholder="Digite o nome ou código da carta (ex: base1-4 ou pikachu)"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      {/* Lista de Resultados */}
      {Array.isArray(cardResult) && cardResult.length > 1 && (
        <div className="row mt-4">
          {cardResult.map(card => (
            <div key={card.id} className="col-md-3 mb-3">
              <div
                className="card h-100 text-center p-2"
                style={{ cursor: 'pointer' }}
                onClick={() => setCardResult([card])}
              >
                <img src={card.images.small} alt={card.name} className="img-fluid" />
                <small>{card.name}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detalhes da Carta */}
      {Array.isArray(cardResult) && cardResult.length === 1 && (
        <div className="card mt-4 p-3 text-start">
          <img src={cardResult[0].images.large} className="img-fluid mb-3" alt={cardResult[0].name} />
          <h3>{cardResult[0].name}</h3>
          <p><strong>Supertype:</strong> {cardResult[0].supertype}</p>
          <p><strong>Subtypes:</strong> {cardResult[0].subtypes?.join(', ')}</p>
          <p><strong>HP:</strong> {cardResult[0].hp}</p>
          <p><strong>Tipos:</strong> {cardResult[0].types?.join(', ')}</p>
          <p><strong>Evolui para:</strong> {cardResult[0].evolvesTo?.join(', ')}</p>
          <p><strong>Regras:</strong> {cardResult[0].rules?.join(' / ')}</p>

          <h5>Ataques:</h5>
          <ul>
            {cardResult[0].attacks?.map((atk, i) => (
              <li key={i}>
                <strong>{atk.name}</strong>: {atk.text} ({atk.damage})
              </li>
            ))}
          </ul>

          <p><strong>Fraquezas:</strong> {cardResult[0].weaknesses?.map(w => `${w.type} (${w.value})`).join(', ')}</p>
          <p><strong>Recuo:</strong> {cardResult[0].retreatCost?.join(', ')}</p>
          <p><strong>Conjunto:</strong> {cardResult[0].set.name} - {cardResult[0].set.releaseDate}</p>
          <p><strong>Nº:</strong> {cardResult[0].number} - <strong>Raridade:</strong> {cardResult[0].rarity}</p>
          <p><strong>Artista:</strong> {cardResult[0].artist}</p>
          <p><strong>Preço médio:</strong> R$ {cardResult[0].tcgplayer?.prices?.holofoil?.market?.toFixed(2) || 'N/A'}</p>

          {/* Botão Salvar Carta */}
          <button
            className="btn btn-success mt-3"
            disabled={savedCards.some(c => c.id === cardResult[0].id)}
            onClick={() => handleSaveCard(cardResult[0])}
          >
            {savedCards.some(c => c.id === cardResult[0].id)
              ? 'Carta já salva'
              : 'Salvar Carta'}
          </button>
        </div>
      )}
    </div>
  )
}

export default App
