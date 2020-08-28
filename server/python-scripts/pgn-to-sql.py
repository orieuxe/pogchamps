# Copyright (c) 2017, balping
# https://github.com/balping

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import pgn
import sys

fields = map(lambda x:x.lower(), pgn.PGNGame.TAG_ORDER)

def values_row (game):
	ret = '('
	for field in fields:
		if hasattr(game, field):
			ret += ' \'' + getattr(game, field).replace('\'', '\\\'') + '\', '
		else:
			ret += ' \'\', '

	if hasattr(game, 'moves'):
		ret += str(len(game.moves)) + ', '
		ret += ' \'' + ' '.join(game.moves) + '\''
	else:
		ret += '0, \'\''

	ret += ')'
	return ret

if len(sys.argv) != 2:
	print 'Usage: python pgn-to-sql.py input.pgn > out.sql'

i = 0
for game in pgn.GameIterator(sys.argv[1]):
	if not(hasattr(game, 'result')):
		break;

	if (i % 500) == 0:
		print 'INSERT INTO game (' + ', '.join(fields) + ', length, moves) VALUES '

	print values_row(game)

	if (i % 500) == 499:
		print ';'
	else :
		print ','

	i += 1

print ';'
