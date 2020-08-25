db="pogchamps"
d=$(date +%Y-%m-%d)
mv ~/Downloads/chess_com_games_$d.pgn pgn/$db.pgn
python pgn-to-sql.py pgn/$db.pgn > sql/$db.sql
sed -i 'N;$!P;D' sql/$db.sql
python3 sql-to-db.py $db
cd ../../
php bin/console app:update
