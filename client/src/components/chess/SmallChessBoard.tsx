import { Game } from '@models/game'
import React from 'react'
import {Chess} from 'chess.js'
import dynamic from 'next/dynamic'

interface Props {
	game: Game
  size: number
}

function SmallChessBoard({ game, size }: Props) {
	const Chessboard = dynamic(() => import('chessboardjsx'), {
		ssr: false, // <- this do the magic ;)
	})

	let fen = '8/8/8/8/8/8/8/8';
	if(game.fen){
		fen = game.fen.split(' ')[0];
	}else if(game.moves) {
		const chess = new Chess()
		chess.load_pgn(game.moves)
		fen = chess.fen();
	}

	return (
		<Chessboard
      width={size}
			position={fen}
			draggable={false}
			orientation="white"
			showNotation={false}
		/>
	)
}

export default SmallChessBoard
