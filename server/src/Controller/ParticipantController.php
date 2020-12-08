<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Entity\Participant;
use App\Repository\ParticipantRepository;

/**
 * ParticipantController.
 * @Route("/participant", name="participant_")
 */
class ParticipantController extends AbstractFOSRestController
{
    /**
     * Get all Participants.
     * @Rest\Get("/{tournamentId}/all")
     *
     * @return Response
     */
    public function getAllParticipants(int $tournamentId)
    {
      $repository = $this->getDoctrine()->getRepository(Participant::class);
      $participants = $repository->findBy(['tournament' => $tournamentId]);
      return $this->handleView($this->view($participants));
    }

    /**
     * Get all Participants from a group.
     * @Rest\Get("/{tournamentId}/from/{groupe}")
     *
     * @return Response
     */
    public function getUserParticipant(int $tournamentId, string $groupe)
    {
      $repository = $this->getDoctrine()->getRepository(Participant::class);
      $participants = $repository->findBy(
        ['groupe' => $groupe, 'tournament' => $tournamentId], 
        ['points' => 'DESC', 'points' => 'ASC', 'id' => 'DESC']
      );
      return $this->handleView($this->view($participants));
    }

    /**
     * Get Participant by twitch or chess.com username
     * @Rest\Get("/{tournamentId}/username/{name}")
     *
     * @return Response
     */
    public function getParticipant(int $tournamentId, string $name)
    {
      /** @var ParticipantRepository $repository */
      $repository = $this->getDoctrine()->getRepository(Participant::class);
      $participant = $repository->findByName($tournamentId, $name);
      return $this->handleView($this->view($participant));
    }
}
