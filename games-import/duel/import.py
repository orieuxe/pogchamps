import sys
import os
from datetime import datetime,timedelta,timezone

#usage : python3 duel/import.py

twitch_id = {
    "pokimane":33,
    "rainnwilson":34,
    "dnegspoker":35,
    "logic":36,
    "MichelleKhare":37,
    "CodeMiko":38,
    "Myth":39,
    "mrbeast6000":40,
    "xQc":41,
    "Cr1tikal":42,
    "Ludwig":43,
    "sardoche":44,
    "NeoXHyriz":45
}


def str_to_utc_format(date_str):
    date = datetime.strptime(date_str, '%Y %B %d %I:%M %p')
    ptTimeDelta = timedelta(hours=-7)
    ptTZObject = timezone(ptTimeDelta, name="PT")
    return date.replace(tzinfo=ptTZObject).astimezone(tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

with open("matchs.csv") as f:
    values = []
    for idx,l in enumerate(f):
        l = l.strip('\n').split("\t")
        date_str = "2021 " + " ".join(l[0:2])
        formatted = str_to_utc_format(date_str)
        print(l)
        values.append(str((3, twitch_id[l[4]], twitch_id[l[5]], l[2], l[3], formatted)))

    with open("../matchs.sql", "w") as m:
        m.write("INSERT INTO duel (tournament_id, participant1_id, participant2_id, round, stage, date) VALUES\n")
        m.write('\n,\t'.join(values) + ';')