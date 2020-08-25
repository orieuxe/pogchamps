<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Duel;
use App\Entity\Game;


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

    protected function execute(InputInterface $input, OutputInterface $output)
    {
      $repository = $this->em->getRepository(Game::class);
      $games = $repository->findBy(['duel' => null]);
      foreach ($games as $game){
        $repository = $this->em->getRepository(Duel::class);
        $duel = $repository->findByPlayers($game->getWhite(), $game->getBlack());
        $duel->addGame($game);
        $this->em->flush();
      }

      $repository = $this->em->getRepository(Duel::class);
      $duels = $repository->findBy(['result' => NULL]);
      foreach ($duels as $duel) {
        $games = $duel->getGames();
        if(count($games) <= 0) continue;

        $score1 = 0;
        $score2 = 0;
        foreach ($games as $game){
          $score = array_map('intval', explode("-", $game->getResult()));
          if($game->getWhite() != $duel->getPlayer1()->getUsername()){
            $score = array_reverse($score);
          }
          $score1 += $score[0];
          $score2 += $score[1];
        }
        $duel->setResult(strval($score1).'-'.strval($score2));
        $winner = $score1 > $score2 ? $duel->getPlayer1() : $duel->getPlayer2();
        $winner->setPoints($winner->getPoints()+3);

        $this->em->flush();
      }
      return 0;
    }
}
