db="pogchamps"
python3 schedule-to-sql.py
if [ $# -eq 0 ] #if no arguments supplied
  then
    url="postgresql://postgres:postgres@127.0.0.1:5432/$db"
  else
    url=$(heroku config:get DATABASE_URL -a apichamps)
fi
python3 ../sql-to-db.py matchs $url
