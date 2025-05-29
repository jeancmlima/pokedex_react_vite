/**
 * Nome do arquivo: App.jsx
 * Data de criação: 29/05/2025
 * Autor: Jean Carlos
 * Matrícula: 01750191
 *
 * Descrição:
 * Exibe as cartas salvas anteriormente no localStorage.
 * Renderiza miniaturas no topo da página ou uma mensagem se não houver cartas.
 */

import { useEffect, useState } from 'react'

function App() {
  const [savedCards, setSavedCards] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedCards')) || []
    setSavedCards(stored)
  }, [])

  return (
    <div className="container mt-4">
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
    </div>
  )
}
