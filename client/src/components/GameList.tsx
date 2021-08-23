import { Game } from '@models/game'
import React from 'react'

interface Props {
  games: Game[]
}

function GameList({games}: Props) {
  return (
    <ul>
      {games.map((game, i) => (
       <li className="clickable" key={i}>{game.white} vs {game.black} : {game.result} in {game.moves} moves</li> 
      ))}
    </ul>
  )
}

export default GameList
