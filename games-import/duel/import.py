import sys
import os
from datetime import datetime,timedelta,timezone

twitch_id = {
    "forsen":3,
    "xQcow":8,
    "VoyBoy":17,
    "fuslie":18,
    "erobb221":19,
    "NateHill":20,
    "hutch":21,
    "yassuo":22,
    "moistCr1tikal":23,
    "ItsSliker":24,
    "NymN":25,
    "xChocobars":26,
    "boxbox":27,
    "Swiftor":28,
    "Papaplatte":29,
    "Ludwig":30
}


def str_to_utc_format(date_str):
    date = datetime.strptime(date_str, '%Y %B %d %I:%M %p')
    ptTimeDelta = timedelta(hours=-7)
    ptTZObject = timezone(ptTimeDelta, name="PT")
    return date.replace(tzinfo=ptTZObject).astimezone(tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

with open("../sql/matchs.sql", "w") as m:
    m.write("INSERT INTO duel (tournament_id, participant1_id, participant2_id, round, date) VALUES\n")
    with open("matchs.csv") as f:
        for idx,l in enumerate(f):
            l = l.strip('\n').split("\t")
            date_str = "2020 " + " ".join(l[0:2])
            formatted = str_to_utc_format(date_str)
            val = (1, twitch_id[l[4]], twitch_id[l[5]], l[2][-1], formatted)
            eol = ',' if idx < 25 else ';'
            m.write('\t' + str(val) + eol + '\n')