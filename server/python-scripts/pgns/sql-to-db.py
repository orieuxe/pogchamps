import mysql.connector
import sys

file_name = sys.argv[1]

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database=file_name
)
curs = mydb.cursor();

sql_file = open('sql/'+file_name+'.sql')
curs.execute(sql_file.read())

mydb.commit();
