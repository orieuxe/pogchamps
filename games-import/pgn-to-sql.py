import chess.pgn
import re
CLOCK_REGEX = re.compile(r"""\[%clk\s(\d+):(\d+):(\d+(?:\.\d*)?)\]""")
PGN_FIELDS = ['Site', 'Date', 'White', 'Black', 'Result','WhiteElo', 'BlackElo', 'TimeControl', 'Termination']

pgn = open("pgn/pogchamps.pgn")
def clock(node):
	match = CLOCK_REGEX.search(node.comment)
	if match is None:
		return None
	# return int(match.group(1)) * 3600 + int(match.group(2)) * 60 + float(match.group(3))
	return match.group(2)+':'+match.group(3)

def quote(str):
	return '\''+str+'\''

values = []
while game:= chess.pgn.read_game(pgn):
	board = game.board()
	sans = []
	clocks = []
	for node in game.mainline():
		
		move = node.move
		sans.append((board.san(move)))
		clocks.append(clock(node))
		board.push(move)
	
	value = [quote(game.headers[field]) for field in PGN_FIELDS]
	value.append(str(len(sans)))
	value.append(quote(' '.join(sans)))
	value.append(quote(' '.join(clocks)))
	values.append('(' + ', '.join(value) + ')')

print('INSERT INTO game (' + ', '.join(map(lambda x:x.lower(), PGN_FIELDS)) + ', length, moves, clocks) VALUES ')
print(',\n'.join(values) + ';')