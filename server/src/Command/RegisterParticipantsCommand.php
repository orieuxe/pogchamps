<?php
namespace App\Command;

use App\Entity\Player;
use App\Entity\Participant;
use App\Entity\Tournament;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\PlayerRepository;
use App\Repository\TournamentRepository;
use Symfony\Component\Finder\Finder;

class RegisterParticipantsCommand extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:import';

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct();
        $this->em = $em;
    }


    // change these options about the file to read
    private $csvParsingOptions = array(
      'finder_in' => '.',
      'finder_name' => 'participants.csv',
      'ignoreFirstLine' => false
  );

  /**
   * Parse a csv file
   * 
   * @return array
   */
  private function parseCSV()
  {
      $ignoreFirstLine = $this->csvParsingOptions['ignoreFirstLine'];

      $finder = new Finder();
      $finder->files()
          ->in($this->csvParsingOptions['finder_in'])
          ->name($this->csvParsingOptions['finder_name'])
      ;
      foreach ($finder as $file) { $csv = $file; }

      $rows = array();
      if (($handle = fopen($csv->getRealPath(), "r")) !== FALSE) {
          $i = 0;
          while (($data = fgetcsv($handle, null, " ")) !== FALSE) {
              $i++;
              if ($ignoreFirstLine && $i == 1) { continue; }
              $rows[] = $data;
          }
          fclose($handle);
      }

      return $rows;
  }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

      $tournamentRepository = $this->em->getRepository(Tournament::class);
      /** @var Tournament $currentTournament */
      $currentTournament = $tournamentRepository->find(4);
      
        /** @var PlayerRepository $repositry */
      $repository = $this->em->getRepository(Player::class);

      $csv = $this->parseCSV();
      foreach ($csv as $row) {
        $twitch = $row[0];
        $player = $repository->findOneBy(['twitch' => $twitch]);
        if($player == null) {
            $username = array_key_exists(1, $row) ? $row[1] : "undefined";
            $player = new Player($twitch, $username);
            $this->em->persist($player);
            $this->em->flush();
        }
        $output->writeln($player->getName()." registered to pogchamps ".$currentTournament->getId());
        $particpant = new Participant($player, $currentTournament);
        $this->em->persist($particpant);
      }

      $this->em->flush();
      
      return 0;
    }
}
