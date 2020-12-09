db="pogchamps"
d=$(date +%Y-%m-%d)
mv ~/Downloads/chess_com_games_$d.pgn pgn/$db.pgn
python pgn-to-sql.py pgn/$db.pgn > sql/$db.sql
sed -i 'N;$!P;D' sql/$db.sql
if [ $# -eq 0 ]
  then
    url="postgresql://:poggers@127.0.0.1:5432/$db"
  else
    url=$(heroku config:get DATABASE_URL -a apichamps)
fi
python3 sql-to-db.py $db $url
cd ../server/
php bin/console app:update
