import psycopg2
import sys
from urllib.parse import urlparse

file_name = sys.argv[1]
db_url = sys.argv[2]

result = urlparse(db_url)
username = result.username
password = result.password
database = result.path[1:]
hostname = result.hostname
conn = psycopg2.connect(
    database = database,
    user = username,
    password = password,
    host = hostname
)

curs = conn.cursor()

sql_file = open('sql/'+file_name+'.sql')
curs.execute(sql_file.read())
conn.commit()
