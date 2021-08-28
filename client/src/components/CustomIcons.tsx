import { Icon } from '@chakra-ui/react'
import React from 'react'

export function BracketsIcon(props: any) {
	return (
		<Icon {...props}>
			<svg viewBox="0 0 24 24">
				<title>BracketsIcon</title>
				<polygon points="19.99 9 13.99 9 13.99 3.99 13.99 3 13 3 6.99 3 6.99 0.99 6.99 0 6 0 0 0 0 0.99 6 0.99 6 3 6 3.99 6 6 0 6 0 6.99 6 6.99 6.99 6.99 6.99 6 6.99 3.99 13 3.99 13 9 13 9.99 13 15 6.99 15 6.99 12.99 6.99 12 6 12 0 12 0 12.99 6 12.99 6 15 6 15.99 6 18 0 18 0 18.99 6 18.99 6.99 18.99 6.99 18 6.99 15.99 13 15.99 13.99 15.99 13.99 15 13.99 9.99 19.99 9.99 19.99 9" />
			</svg>
		</Icon>
	)
}

export function PuzzleIcon(props: any) {
	return (
		<Icon {...props}>
			<svg viewBox="0 0 24 24">
				<title>PuzzleIcon</title>
				<path d="M20.5 11H19V7a2 2 0 00-2-2h-4V3.5A2.5 2.5 0 0010.5 1 2.5 2.5 0 008 3.5V5H4a2 2 0 00-2 2v3.8h1.5c1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7H2V20a2 2 0 002 2h3.8v-1.5c0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7V22H17a2 2 0 002-2v-4h1.5a2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5z" />
			</svg>
		</Icon>
	)
}

export function TwitchIcon(props: any) {
	return (
		<Icon {...props}>
			<svg viewBox="0 0 24 24">
				<title>TwitchIcon</title>
				<path fill="none" d="M0 0h24v24H0z" />
				<path d="M21 3v11.74l-4.696 4.695h-3.913l-2.437 2.348H6.913v-2.348H3V6.13L4.227 3H21zm-1.565 1.565H6.13v11.74h3.13v2.347l2.349-2.348h4.695l3.13-3.13V4.565zm-3.13 3.13v4.696h-1.566V7.696h1.565zm-3.914 0v4.696h-1.565V7.696h1.565z" />
			</svg>
		</Icon>
	)
}

export function ChessBoardIcon(props: any) {
	return (
		<Icon {...props}>
			<svg viewBox="0 0 24 24" {...props}>
				<path d="M21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zm-1 6h-4v4h4v4h-4v4h-4v-4H8v4H4v-4h4v-4H4V8h4V4h4v4h4V4h4v4z" />
				<path d="M8 8h4v4H8zm4 4h4v4h-4z" />
			</svg>
		</Icon>
	)
}
