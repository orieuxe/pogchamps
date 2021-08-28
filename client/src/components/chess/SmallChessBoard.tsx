import { Game } from '@models/game'
import React from 'react'
import {Chess} from 'chess.js'
import dynamic from 'next/dynamic'

interface Props {
	game: Game
  size: number
}

function SmallChessBoard({ game, size }: Props) {
	const chess = new Chess()
	const Chessboard = dynamic(() => import('chessboardjsx'), {
		ssr: false, // <- this do the magic ;)
	})
	chess.load_pgn(game.moves)
	return (
		<Chessboard
      width={size}
			position={chess.fen()}
			draggable={false}
			orientation="white"
			showNotation={false}
		/>
	)
}

export default SmallChessBoard
