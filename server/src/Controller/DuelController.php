<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Duel;

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
      $duels = $repository->findall();
      return $this->handleView($this->view($duels));
    }

    /**
     * Get all Duels from a group.
     * @Rest\Get("/from/{group}")
     *
     * @return Response
     */
    public function getDuelsFrom(string $group)
    {
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->findBySection($group);
      return $this->handleView($this->view($duels));
    }

    /**
     * Get all Duels from a stage.
     * @Rest\Get("/stage/{stage}")
     *
     * @return Response
     */
    public function getDuelsFromStage(string $stage)
    {
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $conditions = ['stage' => $stage];
      if($stage != "group"){
        $conditions["round"] = "Quarterfinals";
      }
      $duels = $repository->findBy($conditions);
      return $this->handleView($this->view($duels));
    }

    /**
     * Get all Duels of a player.
     * @Rest\Get("/of/{id}")
     *
     * @return Response
     */
    public function getDuelsOf(int $id)
    {
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->findByPlayerId($id);
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
      $repository = $this->getDoctrine()->getRepository(Duel::class);
      $duels = $repository->getByDate($now);
      return $this->handleView($this->view($duels));
    }

}
