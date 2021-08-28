<?php

namespace App\Command;

use App\Entity\Duel;
use App\Service\ChesscomService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;

class UpdateGamesWithLinkCommand extends Command
{
  // the name of the command (the part after "bin/console")
  protected static $defaultName = 'app:update:link';

  private $em;
  private $gameService;

  public function __construct(EntityManagerInterface $em, ChesscomService $gameService)
  {
    parent::__construct();
    $this->em = $em;
    $this->gameService = $gameService;
  }

  protected function configure(): void
  {
    $this->setDescription('Update all games with their chess.com links');
  }

  protected function execute(InputInterface $input, OutputInterface $output)
  {

    $duelRepository = $this->em->getRepository(Duel::class);
    /** @var DuelRepository $duelRepository */
    $duels = $duelRepository->findEndedDuels();
    /** @var Duel[] $duels */
    $totalUpdates = 0;
    foreach ($duels as $duel) {
      $username1 = $duel->getParticipant1()->getPlayer()->getUsername();
      $username2 = $duel->getParticipant2()->getPlayer()->getUsername();

      $chessGames = $this->gameService->fetchDuelGames(
       $duel->getDate(),
       $username1,
       $username2,
      );
      $games = $duel->getGames();
      $gameUpdates = 0;
      if(count($chessGames) < count($games)){
        dump("not enough games : "."(".count($chessGames)."<".count($games).") ".$username1." vs ".$username2." ".$duel->getDate()->format('Y-m-d H:i:s'));
        continue;
      }
      foreach($games as $idx => $game){
        $chessGame = $chessGames[$idx];
        $pgn = $chessGame['pgn'];
        $whiteElo = ChesscomService::parsePgn($pgn, 'WhiteElo');
        $blackElo = ChesscomService::parsePgn($pgn, 'BlackElo');
        if($blackElo != $game->getBlackElo() && $whiteElo != $game->getWhiteElo()){
          dump("elo mistach : ".$game->getWhite()." vs ".$game->getBlack()." ".$duel->getDate()->format('Y-m-d H:i:s'));
          continue;
        };
        $game->setUrl($chessGame['url']);
        $gameUpdates+=1;
      }
      dump($gameUpdates." updates : ".$username1." ".$duel->getResult()." ".$username2);
      $totalUpdates += $gameUpdates;
    }
    dump($totalUpdates." total updates");

    $this->em->flush();

    return 0;
  }
}
