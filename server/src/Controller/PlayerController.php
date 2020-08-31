<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Player;

/**
 * PlayerController.
 * @Route("/player", name="player_")
 */
class PlayerController extends AbstractFOSRestController
{
    /**
     * Get all Players.
     * @Rest\Get("/all")
     *
     * @return Response
     */
    public function getAllPlayers()
    {
      $repository = $this->getDoctrine()->getRepository(Player::class);
      $players = $repository->findall();
      return $this->handleView($this->view($players));
    }

    /**
     * Get all Players from a group.
     * @Rest\Get("/from/{section}")
     *
     * @return Response
     */
    public function getUserPlayer(string $section)
    {
      $repository = $this->getDoctrine()->getRepository(Player::class);
      $players = $repository->findBy(['section' => $section], ['points' => 'DESC']);
      return $this->handleView($this->view($players));
    }

    /**
     * Get Player by twitch or chess.com username
     * @Rest\Get("/{name}")
     *
     * @return Response
     */
    public function getPlayer(string $name)
    {
      $repository = $this->getDoctrine()->getRepository(Player::class);
      $player = $repository->findByName($name);
      return $this->handleView($this->view($player));
    }
}
