import psycopg2
import sys

file_name = sys.argv[1]

conn = psycopg2.connect(
  host="ec2-54-247-103-43.eu-west-1.compute.amazonaws.com",
  database="ddm1t047g0dclv",
  user="msbnqnrvgvehdm",
  password="84a5383e63737aca8b2a7639a68df67dc5a0c3c0ebd38549f9c7f30f4c4da291"
)
curs = conn.cursor();

sql_file = open('sql/'+file_name+'.sql')
curs.execute(sql_file.read())
conn.commit();
