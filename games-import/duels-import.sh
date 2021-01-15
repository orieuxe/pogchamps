db="pogchamps"
cd duel
python3 import.py
if [ $# -eq 0 ] #if no arguments supplied
  then
    url="postgresql://:poggers@127.0.0.1:5432/$db"
  else
    url=$(heroku config:get DATABASE_URL -a apichamps)
fi
cd ..
python3 sql-to-db.py matchs $url
