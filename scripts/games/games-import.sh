db="pogchamps"
d=$(date +%Y-%m-%d)

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    UNAMECHECK=$(uname -a); 
    if [[ $UNAMECHECK == *"microsoft"* ]]; then #WSL
      download_dir="/mnt/c/Users/Utilisateur/Downloads"
    else #Linux
      download_dir="/home/$(whoami)/Downloads"
    fi
else #Git bash (windows)
    download_dir="$HOME/Downloads"
fi

mv $download_dir/chess_com_games_$d.pgn $db.pgn
python3 pgn-to-sql.py $db.pgn > $db.sql
url=$(../get-url.sh $@)
python3 ../sql-to-db.py $db $url
cd ../../server/
php bin/console app:update
