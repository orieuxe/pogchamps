import sys
import os
from datetime import datetime,timedelta,timezone

twitch_id = {
    "Forsen":17,
    "xQc":18,
    "Voyboy":19,
    "Fuslie":20,
    "erobb221":21,
    "NateHill":22,
    "Hutch":23,
    "Yassuo":24,
    "moistCr1TiKaL":25,
    "Sliker":26,
    "NymN":27,
    "xChocobars":28,
    "Boxbox":29,
    "Swiftor":30,
    "Papaplatte":31,
    "Ludwig":32,
    "NULL":None
}


def str_to_utc_format(date_str):
    date = datetime.strptime(date_str, '%Y %B %d %I:%M %p')
    ptTimeDelta = timedelta(hours=-7)
    ptTZObject = timezone(ptTimeDelta, name="PT")
    return date.replace(tzinfo=ptTZObject).astimezone(tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

with open("../sql/matchs.sql", "w") as m:
    m.write("INSERT INTO duel (tournament_id, participant1_id, participant2_id, round, stage, date) VALUES\n")
    with open("matchs.csv") as f:
        for idx,l in enumerate(f):
            l = l.strip('\n').split("\t")
            date_str = "2020 " + " ".join(l[0:2])
            formatted = str_to_utc_format(date_str)
            print(l)
            val = (1, twitch_id[l[4]], twitch_id[l[5]], l[2], l[3], formatted)
            eol = ',' if idx < 25 else ';'
            m.write('\t' + str(val) + eol + '\n')