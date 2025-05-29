# Dashboard Pokémon TCG

### Autor: Jean Carlos  
### Matrícula: 01750191  
### Data de criação: 29/05/2025  

## 📋 Descrição

Este projeto é um **dashboard interativo de cartas do Pokémon TCG** desenvolvido com **ReactJS + Vite**, como parte da atividade da disciplina de Front-End Frameworks (ADS).

O sistema permite:

- Buscar cartas pelo código oficial (ex: `base1-4`)
- Exibir os detalhes completos de cada carta
- Salvar cartas no navegador (localStorage)
- Visualizar miniaturas das cartas salvas

## 🚀 Tecnologias utilizadas

- [ReactJS](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [TCG SDK (`tcg-sdk`)](https://www.npmjs.com/package/tcg-sdk)

## 🧩 Funcionalidades Implementadas

| Funcionalidade                | Commit                                   |
|------------------------------|------------------------------------------|
| Setup inicial do projeto     | `ADS-init: 01750191 Reactjs-vite`        |
| Layout das cartas salvas     | `ADS-layout_cartas_salvas`               |
| Campo de busca               | `ADS-filtro_busca`                       |
| Exibição detalhada da carta  | `ADS-detalhes_cartas`                    |
| Botão para salvar carta      | `ADS-salvar_cartas`                      |

## ⚙️ Como executar o projeto

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse a pasta do projeto
cd pokedex_react_vite

# Instale as dependências
npm install

# Rode o projeto em modo desenvolvimento
npm run dev
