<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Game;

/**
 * GameController.
 * @Route("/game", name="game_")
 */
class GameController extends AbstractFOSRestController
{
    /**
     * Get all Games.
     * @Rest\Get("/all")
     *
     * @return Response
     */
    public function getAllGames()
    {
      $repository = $this->getDoctrine()->getRepository(Game::class);
      $games = $repository->findall();
      return $this->handleView($this->view($games));
    }

    /**
     * Get Game.
     * @Rest\Get("/{id}")
     *
     * @return Response
     */
    public function getGame(int $id)
    {
      $repository = $this->getDoctrine()->getRepository(Game::class);
      $game = $repository->find($id);
      return $this->handleView($this->view($game));
    }

    /**
     * Get all Games from player.
     * @Rest\Get("/from/{username}")
     *
     * @return Response
     */
    public function getUserGames(string $username)
    {
      $repository = $this->getDoctrine()->getRepository(Game::class);
      $games = $repository->findByUsername($username);
      return $this->handleView($this->view($games));
    }

    /**
     * Get all Games from section.
     * @Rest\Get("/group/{section}")
     *
     * @return Response
     */
    public function getSectionGames(string $section)
    {
      $repository = $this->getDoctrine()->getRepository(Game::class);
      $games = $repository->findBySection($section);
      return $this->handleView($this->view($games));
    }
}
