<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Duel;
use App\Repository\DuelRepository;

/**
 * DuelController.
 * @Route("/duel", name="duel_")
 */
class DuelController extends AbstractFOSRestController
{
    /**
     * Get all Duels.
     * @Rest\Get("/all")
     *
     * @return Response
     */
    public function getAllDuels()
    {
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->findAll();
      return $this->handleView($this->view($duels));
    }

    /**
     * Get One by id.
     * @Rest\Get("/{id}",  requirements={"id"="\d+"})
     *
     * @return Response
     */
    public function getById(int $id)
    {
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duel = $repository->find($id);
      return $this->handleView($this->view($duel));
    }

    /**
     * Get all Duels from a group.
     * @Rest\Get("/{tournamentId}/from/{group}")
     *
     * @return Response
     */
    public function getDuelsFrom(int $tournamentId, string $group)
    {
      /** @var DuelRepository $repository */
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->findByGroup($tournamentId, $group);
      return $this->handleView($this->view($duels));
    }

    /**
     * Get all Duels from a stage.
     * @Rest\Get("/{tournamentId}/stage/{stage}")
     *
     * @return Response
     */
    public function getDuelsFromStage(int $tournamentId, string $stage)
    {
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $conditions = [
        'stage' => $stage,
        'tournament' => $tournamentId
      ];
      if($stage != "group"){
        $conditions["round"] = "Quarterfinals";
      }
      $duels = $repository->findBy($conditions, ['next_duel' => "ASC", 'id' => "ASC"]);
      return $this->handleView($this->view($duels));
    }

    /**
     * Get all Duels of a particpant.
     * @Rest\Get("/of/{participantId}")
     *
     * @return Response
     */
    public function getDuelsOf(int $participantId)
    {
      /** @var DuelRepository $repository */
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->findByParticipantId($participantId);
      return $this->handleView($this->view($duels));
    }

    /**
     * Get todays Duels
     * @Rest\Get("/today")
     *
     * @return Response
     */
    public function getTodayDuels()
    {
      $now = new \DateTime();
      /** @var DuelRepository $repository */
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->getByDate($now);
      return $this->handleView($this->view($duels));
    }

    /**
     * Get todays Archives
     * @Rest\Get("/today_archives")
     *
     * @return Response
     */
    public function getTodayArchives()
    {
      $f = function (Duel $duel){
        $u1 = $duel->getParticipant1()->getPlayer()->getUsername();
        $u2 = $duel->getParticipant2()->getPlayer()->getUsername();
        return "https://www.chess.com/games/archive/".$u1."?gameOwner=other_game&gameType=recent&opponent=".$u2;
      };

      $now = new \DateTime();
      /** @var DuelRepository $repository */
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->getByDate($now);
      return $this->handleView($this->view(array_map($f, $duels)));
    }

}
