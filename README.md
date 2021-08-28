# Pogchamps

[Pogchamps](https://en.wikipedia.org/wiki/PogChamps) is a chess tournament for streamers organised by [chess.com](https://chess.com).

[This site](https://pogchamps.chess.com/) covers all events and includes :
- a light/dark mode
- standings for the groupstages
- Championship and consolation brackets
- players live ratings
- all matchs and results
- all games linked to chess.com

![screenshot of the app](./static/screenshot.png)

# Structure

- `server/` : Symfony 4.4
- `client/` : React 17 / Next 11
- `scripts/` : custom SQL and python scripts

Backend and frontend servers are both hosted on Heroku, respectively :
- https://apichamps.herokuapp.com/
- https://pogchamps.herokuapp.com/
