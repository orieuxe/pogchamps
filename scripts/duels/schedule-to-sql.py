import sys
import os
from datetime import datetime,timedelta,timezone

#usage : python3 duel/import.py

twitch_id = {
    "Ludwig":43,
    "Pokimane":33,
    "Rainn Wilson":34,
    "Daniel Negreanu":35,
    "Logic":36,
    "Michelle Khare":37,
    "Myth":39,
    "MrBeast":40,
    "Sardoche":44,
    "Tubbo":46,
    "BenjyFishy":47,
    "Rubius":48,
    "Neeko":45,
    "CodeMiko":38,
    "xQc":41,
    "MoistCr1tikal":42
}

stage_label = {
    "Cons":"loser",
    "Champ":"winner",
}

round_label = {
    "QF":"Quaterfinals",
    "SF":"Semifinals",
    "Final":"Final",
}


def str_to_utc_format(date_str):
    date = datetime.strptime(date_str, '%Y %B  %d %A %I:%M %p')
    ptTimeDelta = timedelta(hours=-8)
    ptTZObject = timezone(ptTimeDelta, name="PT")
    return date.replace(tzinfo=ptTZObject).astimezone(tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

with open("matchs.csv") as f:
    values = []
    for idx,l in enumerate(f):
        l = l.strip('\n').split("\t")
        print(l)
        date_str = "2021 " + " ".join(l[0:3]) + " PM"
        date_formatted = str_to_utc_format(date_str)
        print(date_formatted)
        stage, ronde = l[4].split()
        values.append(str((3, round_label[ronde], stage_label[stage], date_formatted)))

    with open("matchs.sql", "w") as m:
        m.write("INSERT INTO duel (tournament_id, round, stage, date) VALUES\n")
        m.write('\n,\t'.join(values) + ';')