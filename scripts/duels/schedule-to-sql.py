import sys
import os
from datetime import datetime,timedelta,timezone

#usage : python3 duel/import.py

twitch_id = {
    "connoreatspants":55,
    "qtcinderella":66,
    "boxbox":68,
    "ludwig":51,
    "mrbeast":53,
    "sapnap":50,
    "rubius":54,
    "tectone":64,
    "punz":67,
    "justaminx":69,
    "fundy":70,
    "iamcristinini":49,
    "crokeyz":71,
    "5uppp":72,
    "jakenbakelive":73,
    "harrymackofficial":65
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
    date = datetime.strptime(date_str, '%Y %A %B %d %I:%M %p')
    ptTimeDelta = timedelta(hours=-8)
    ptTZObject = timezone(ptTimeDelta, name="PT")
    return date.replace(tzinfo=ptTZObject).astimezone(tz=timezone.utc).strftime('%Y-%m-%d %H:%M:%S')

with open("matchs.csv") as f:
    values = []
    for idx,l in enumerate(f):
        l = l.strip('\n').split("\t")
        print(l)
        date_str = "2021 " + " ".join(l[0:2]) + " "+ l[3]
        date_formatted = str_to_utc_format(date_str)
        print(date_formatted)
        stage, group = l[2].split()
        # values.append(str((3, round_label[ronde], stage_label[stage], date_formatted)))
        values.append(str(
            (1, date_formatted, stage.lower(), 4, twitch_id[l[4].lower()], twitch_id[l[5].lower()]))
        )

    with open("matchs.sql", "w") as m:
        m.write("INSERT INTO duel (round, date, stage, tournament_id, participant1_id, participant2_id) VALUES\n")
        m.write(',\n'.join(values) + ';')