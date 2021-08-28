python3 schedule-to-sql.py
url=$(../get-url.sh $@)
python3 ../sql-to-db.py matchs $url
