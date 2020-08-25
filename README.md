# Pogchamps

[Pogchamps](https://www.chess.com/article/view/next-pogchamps-all-the-information) is a chess tournament for streamers organised by [chess.com](https://chess.com).

[This app](https://pogchamps.herokuapp.com/) includes :
- standings for the groupstages
- players updated chess.com ratings
- all matchs and results
- all games through a pgn viewer

![screenshot of the app](./static/screenshot.png)

# Structure

- `server/` : Symfony 4.4 used as a REST API.
- `client/` : angular8

Backend and frontend servers are both hosted on Heroku, respectively :
- https://apichamps.herokuapp.com/
- https://pogchamps.herokuapp.com/
