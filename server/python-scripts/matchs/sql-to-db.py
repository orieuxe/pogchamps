import mysql.connector
import sys
from datetime import datetime,timedelta,timezone

twitch_id = {
    "Gripex90":1,
    "Cizzorz":2,
    "Forsen":3,
    "Callmecarsonlive":4,
    "itshafu":5,
    "Davidpakman":6,
    "easywithaces":7,
    "xQc":8,
    "dogdog":9,
    "TSM_ZexRow":10,
    "tfblade":11,
    "qtcinderella":12,
    "hafthorjulius":13,
    "wagamamatv":14,
    "mizkif":15,
    "AustinShow":16
}


def str_to_utc_format(date_str):
    date = datetime.strptime(date_str, '%Y %B %d %I:%M %p');
    ptTimeDelta = timedelta(hours=-7)
    ptTZObject = timezone(ptTimeDelta, name="PT")
    return date.replace(tzinfo=ptTZObject).astimezone(tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="pogchamps"
)
curs = mydb.cursor();

sql = "INSERT INTO duel (player1_id, player2_id, result, round, date) VALUES (%s,%s,%s,%s,%s)"
with open("matchs.csv") as f:
    for l in f:
        l = l.strip('\n').split("\t")
        date_str = "2020 " + " ".join(l[0:2]);
        formatted = str_to_utc_format(date_str)
        val = (twitch_id[l[3]], twitch_id[l[4]], '1', l[2][-1], formatted)
        print(val)
        curs.execute(sql, val);

mydb.commit();
