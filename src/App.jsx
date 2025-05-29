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
 * Inclui efeito visual de cartas deslizáveis com Swiper.js.
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

      {/* Cartas Salvas */}
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

      {/* Busca */}
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

      {/* Resultado com Swiper */}
      {cardResult.length > 1 && (
        <div className="mt-5 d-flex justify-content-center">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {cardResult.map(card => (
              <SwiperSlide key={card.id} onClick={() => setCardResult([card])}>
                <div className="swiper-card">
                  <img src={card.images.large} alt={card.name} className="img-fluid" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Detalhes da Carta */}
      {cardResult.length === 1 && (
        <div className="card mt-5 p-4 shadow-lg">
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <img src={cardResult[0].images.large} className="img-fluid rounded" alt={cardResult[0].name} />
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
            <div className="col-md-8 text-start">
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
