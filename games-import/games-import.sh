db="pogchamps"
d=$(date +%Y-%m-%d)
mv ~/Downloads/chess_com_games_$d.pgn $db.pgn
python3 pgn-to-sql.py $db.pgn > $db.sql
if [ $# -eq 0 ] #if no arguments supplied
  then
    url="postgresql://postgres:postgres@127.0.0.1:5432/$db"
  else
    url=$(heroku config:get DATABASE_URL -a apichamps)
fi
python3 sql-to-db.py $db $url
cd ../server/
php bin/console app:update
