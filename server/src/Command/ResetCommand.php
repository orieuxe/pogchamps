<?php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Duel;
use App\Entity\Game;
use App\Entity\Player;


class ResetCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:reset';

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
      $games = $repository->findAll();
      foreach ($games as $game){
        $game->setDuel(NULL);
      }
      $this->em->flush();

      $repository = $this->em->getRepository(Duel::class);
      $duels = $repository->findAll();
      foreach ($duels as $duel) {
        $duel->setResult(NULL);
      }

      $repository = $this->em->getRepository(Player::class);
      $players = $repository->findAll();
      foreach ($players as $player) {
        $player->setPoints(0);
        $player->setPlayed(0);
      }
      $this->em->flush();

      return 0;
    }
}
