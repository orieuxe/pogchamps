import psycopg2
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


conn = psycopg2.connect(
  host="ec2-54-247-103-43.eu-west-1.compute.amazonaws.com",
  database="ddm1t047g0dclv",
  user="msbnqnrvgvehdm",
  password="84a5383e63737aca8b2a7639a68df67dc5a0c3c0ebd38549f9c7f30f4c4da291"
)
curs = conn.cursor();

sql = "INSERT INTO duel (round, date) VALUES (%s,%s)"
with open("matchs.csv") as f:
    for l in f:
        l = l.strip('\n').split("\t")
        date_str = "2020 " + " ".join(l[0:2]);
        formatted = str_to_utc_format(date_str)
        val = (l[2], formatted)
        print(val)
        curs.execute(sql, val);

conn.commit();
