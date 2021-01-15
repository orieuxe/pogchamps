<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Duel;
use App\Entity\Game;
use App\Repository\DuelRepository;
use App\Repository\GameRepository;
use App\Repository\PlayerRepository;

class UpdateCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:update';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }


    protected function configure()
    {

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

    protected function execute(InputInterface $input, OutputInterface $output)
    {
      /** @var GameRepository $repository */
      $repository = $this->em->getRepository(Game::class);
      $games = $repository->findBy(['duel' => null]);
      foreach ($games as $game){

        /** @var DuelRepository $repository */
        $repository = $this->em->getRepository(Duel::class);

        $duel = $repository->findOpenDuelByPlayers(3, $game->getWhite(), $game->getBlack());
        $duel->addGame($game);
      }

      $this->em->flush();
      /** @var Duel[] $duels */
      $duels = $this->em->getRepository(Duel::class)->findBy(['result' => null]);
      foreach ($duels as $duel) {
        $games = $duel->getGames();
        if(count($games) <= 0) continue;

        $score1 = 0.0;
        $score2 = 0.0;
        foreach ($games as $game){
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
          } else if(count($games) > 2){
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
