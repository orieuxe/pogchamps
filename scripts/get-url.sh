if [ $# -eq 0 ] #if no arguments supplied
  then
    echo "postgresql://postgres:postgres@127.0.0.1:5432/pogchamps"
  else
    echo $(heroku config:get DATABASE_URL -a apichamps)
fi