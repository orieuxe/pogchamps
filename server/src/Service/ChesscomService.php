<?php

namespace App\Service;
use GuzzleHttp\Client;
use App\Entity\Duel;

class ChesscomService
{
  private Client $client;

  public function __construct(){
    $this->client = new Client(['base_uri' => 'https://api.chess.com/pub/']);
  }

  public static function parsePgn($pgn, $tag){
    preg_match('/\['.$tag.' "([^"]*)"]/i', $pgn, $matches);
    if(array_key_exists(1, $matches)) return $matches[1];
    return null;
  }

  public function fetchDuelGames(Duel $duel): array
  {
    $username1 = strtolower($duel->getParticipant1()->getPlayer()->getUsername());
    $username2 = strtolower($duel->getParticipant2()->getPlayer()->getUsername());
    $date = $duel->getDate();

    $games = $this->fetchGames($username1, $date);
    $gamesToSend = [];
    foreach ($games as $game){
      $black = strtolower($game['black']['username']);
      $white = strtolower($game['white']['username']);
      $colors = [$black, $white];
      $usernames = [$username1, $username2];
      sort($colors);
      sort($usernames);
      if($colors != $usernames) continue;
      $endDate = new \DateTime();
      $endDate->setTimestamp($game['end_time']);
      if(abs($endDate->format('d') - $date->format('d')) > 1) continue;
      $gamesToSend[] = $game;
    }

    return $gamesToSend;
  }

  private function fetchGames($username, $date){
    $response = $this->client->request(
      'GET',
      'https://api.chess.com/pub/player/' . $username . '/games/'.$date->format('Y/m')
    );
    $content = json_decode($response->getBody(), true);
    return $content['games'];
  }
}
