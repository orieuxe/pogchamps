<?php
namespace App\Controller;

use App\Entity\Tournament;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * GameController.
 * @Route("/tournament", name="tournament_")
 */
class TournamentController extends AbstractFOSRestController
{
    /**
     * Get all tournaments
     * @Rest\Get("/all")
     *
     * @return Tournament[]
     */
    public function getAll()
    {
      $tournaments = $this->getDoctrine()->getRepository(Tournament::class)->findBy([], ['id' => 'ASC']);
      return $this->handleView($this->view($tournaments));
    }
    
    /**
     * Get tournament by id
     * @Rest\Get("/{id}")
     *
     * @return Tournament
     */
    public function getOne(int $id)
    {
      $tournament = $this->getDoctrine()->getRepository(Tournament::class)->find($id);
      return $this->handleView($this->view($tournament));
    }
}
