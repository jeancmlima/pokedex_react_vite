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
 * Inclui efeito visual de cartas deslizáveis com Swiper.js e detalhamento em modal.
 */

import { useEffect, useState } from 'react'
import './App.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cards'

function App() {
  const [savedCards, setSavedCards] = useState([])
  const [searchCode, setSearchCode] = useState('')
  const [cardResult, setCardResult] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedCards')) || []
    setSavedCards(stored)
  }, [])

  const handleSearch = async () => {
    try {
      const url = searchCode.includes('-')
        ? `https://api.pokemontcg.io/v2/cards/${searchCode}`
        : `https://api.pokemontcg.io/v2/cards?q=name:"${searchCode}"`

      const response = await fetch(url)
      if (!response.ok) throw new Error('Carta não encontrada.')
      const data = await response.json()
      setCardResult(Array.isArray(data.data) ? data.data : [data.data])
    } catch (error) {
      alert('Carta não encontrada.')
      setCardResult([])
    }
  }

  const handleSaveCard = (card) => {
    const updated = [...savedCards, card]
    localStorage.setItem('savedCards', JSON.stringify(updated))
    setSavedCards(updated)
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Cartas Salvas</h2>
      {savedCards.length === 0 ? (
        <p className="text-muted text-center">Nenhuma carta salva.</p>
      ) : (
        <div className="d-flex justify-content-center mb-5">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {savedCards.map(card => (
              <SwiperSlide key={card.id}>
                <div className="swiper-card">
                  <img src={card.images.large} alt={card.name} className="img-fluid" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

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

      {cardResult.length > 1 && (
        <div className="mt-5 d-flex justify-content-center">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {cardResult.map(card => (
              <SwiperSlide key={card.id}>
                <div className="swiper-card" onClick={() => setSelectedCard(card)}>
                  <img src={card.images.large} alt={card.name} className="img-fluid" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {selectedCard && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-4">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCard.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedCard(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-4 text-center">
                    <img src={selectedCard.images.large} className="img-fluid rounded" alt={selectedCard.name} />
                    <button
                      className="btn btn-success mt-3"
                      disabled={savedCards.some(c => c.id === selectedCard.id)}
                      onClick={() => {
                        handleSaveCard(selectedCard)
                        setSelectedCard(null)
                      }}
                    >
                      {savedCards.some(c => c.id === selectedCard.id) ? 'Carta já salva' : 'Salvar Carta'}
                    </button>
                  </div>
                  <div className="col-md-8 text-start">
                    <p><strong>HP:</strong> {selectedCard.hp}</p>
                    <p><strong>Tipos:</strong> {selectedCard.types?.join(', ')}</p>
                    <p><strong>Subtipos:</strong> {selectedCard.subtypes?.join(', ')}</p>
                    <p><strong>Regras:</strong> {selectedCard.rules?.join(' / ')}</p>
                    <h5>Ataques:</h5>
                    <ul>
                      {selectedCard.attacks?.map((atk, i) => (
                        <li key={i}><strong>{atk.name}</strong>: {atk.text} ({atk.damage})</li>
                      ))}
                    </ul>
                    <p><strong>Fraquezas:</strong> {selectedCard.weaknesses?.map(w => `${w.type} (${w.value})`).join(', ')}</p>
                    <p><strong>Conjunto:</strong> {selectedCard.set.name} - {selectedCard.set.releaseDate}</p>
                    <p><strong>Raridade:</strong> {selectedCard.rarity}</p>
                    <p><strong>Artista:</strong> {selectedCard.artist}</p>
                    <p><strong>Preço médio:</strong> R$ {selectedCard.tcgplayer?.prices?.holofoil?.market?.toFixed(2) || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
