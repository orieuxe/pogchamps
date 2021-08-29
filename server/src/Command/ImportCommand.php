<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Duel;
use App\Entity\Game;
use App\Repository\DuelRepository;
use Symfony\Component\Console\Input\InputArgument;
use App\Service\ChesscomService;

class ImportCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:import';

    private $em;
    private $chesscomService;

    public function __construct(EntityManagerInterface $em, ChesscomService $gameService)
    {
      parent::__construct();
      $this->em = $em;
      $this->chesscomService = $gameService;
    }

    protected function configure(): void
    {
        $this->addArgument('count', InputArgument::REQUIRED, 'The number of duels to fetch results.');
    }

    private function resultToScore(string $result){
      switch ($result) {
        case '1-0':
          return [1,0];
          break;

        case '0-1':
          return [0,1];
          break;

        default:
          return [0.5,0.5];
          break;
      }
    }

    /**
     * @param mixed $chessGame 
     * @return Game 
     */
    private function chessGametoGame($chessGame): Game{
      $pgn = $chessGame['pgn'];
      $game = new Game();
      $game->setSite(ChesscomService::parsePgn($pgn, 'Site'));
      $game->setDate(\DateTime::createFromFormat(
        'Y.m.d H:i:s',
        (ChesscomService::parsePgn($pgn, 'UTCDate')." ".ChesscomService::parsePgn($pgn, 'UTCTime'))));
      $game->setWhite(ChesscomService::parsePgn($pgn, 'White'));
      $game->setBlack(ChesscomService::parsePgn($pgn, 'Black'));
      $game->setResult(ChesscomService::parsePgn($pgn, 'Result'));
      $game->setWhiteelo(ChesscomService::parsePgn($pgn, 'WhiteElo'));
      $game->setBlackelo(ChesscomService::parsePgn($pgn, 'BlackElo'));
      $game->setTimecontrol(ChesscomService::parsePgn($pgn, 'TimeControl'));
      $game->setEco(ChesscomService::parsePgn($pgn, 'Eco'));
      $game->setTermination(ChesscomService::parsePgn($pgn, 'Termination'));
      $game->setFen(ChesscomService::parsePgn($pgn, 'CurrentPosition'));
      $game->setUrl (ChesscomService::parsePgn($pgn, 'Link'));
      return $game;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
      /** @var DuelRepository $duelRepository */
      $duelRepository = $this->em->getRepository(Duel::class);

      /** @var Duel[] $openDuels */
      $openDuels = $duelRepository->findOpenDuels(1);
      
      foreach ($openDuels as $duel){
        $chessGames = $this->chesscomService->fetchDuelGames($duel);

        $score1 = 0.0;
        $score2 = 0.0;
        foreach ($chessGames as $chessGame){
          $game = $this->chessGametoGame($chessGame);

          $duel->addGame($game);

          $score = $this->resultToScore($game->getResult());
          if($game->getWhite() != $duel->getParticipant1()->getPlayer()->getUsername()){
            $score = array_reverse($score);
          }

          $score1 += $score[0];
          $score2 += $score[1];
        }
        $duel->setResult(strval($score1).'-'.strval($score2));

        $winner = $score1 > $score2 ? $duel->getParticipant1() : $duel->getParticipant2();
        $loser = ($winner->getId() === $duel->getParticipant2()->getId()) ? $duel->getParticipant1() : $duel->getParticipant2();
        
        dump($duel->getParticipant1()->getPlayer()->getTwitch().' '.$score1.' - '.$score2.' '.$duel->getParticipant2()->getPlayer()->getTwitch());

        if($duel->getStage() == "group"){
          if ($score1 == $score2){
            $winner->addPoints(1);
            $loser->addPoints(1);
          } else if(count($chessGames) > 2){
            $winner->addPoints(2);
            $loser->addPoints(1);
          }else {
            $winner->addPoints(3);
          }
          
          $loser->incPlayed();
          $winner->incPlayed();
        }else{
          $nextDuel = $duel->getNextDuel();
          if(!is_null($nextDuel)){
            if($duel->getNextDuelSlot() == 1){
              $nextDuel->setParticipant1($winner);
            }else{
              $nextDuel->setParticipant2($winner);
            }
          }
        }        
        
        $this->em->flush();
      }
      return 0;
    }
}
