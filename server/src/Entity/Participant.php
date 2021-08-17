<?php

namespace App\Entity;

use App\Repository\ParticipantRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ParticipantRepository::class)
 */
class Participant
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Player::class, inversedBy="participants")
     */
    private $player;

    /**
     * @ORM\ManyToOne(targetEntity=Tournament::class, cascade={"persist", "remove"})
     */
    private $tournament;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $points = 0;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $played = 0;

    /**
     * @ORM\Column(type="string", length=8, nullable=true)
     */
    private $groupe;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $tiebreak = 0;

    public function __construct(Player $player, Tournament $tournament) {
        $this->player = $player;
        $this->tournament = $tournament;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer(): ?Player
    {
        return $this->player;
    }

    public function setPlayer(?Player $player): self
    {
        $this->player = $player;

        return $this;
    }



    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(int $points): self
    {
        $this->points = $points;

        return $this;
    }

    public function getPlayed(): ?int
    {
        return $this->played;
    }

    public function setPlayed(int $played): self
    {
        $this->played = $played;

        return $this;
    }

    public function getGroupe(): ?string
    {
        return $this->groupe;
    }

    public function setGroupe(string $groupe): self
    {
        $this->groupe = $groupe;

        return $this;
    }

    public function getTournament()
    {
        return $this->tournament;
    }

    public function setTournament($tournament)
    {
        $this->tournament = $tournament;

        return $this;
    }
    
    public function addPoints(int $val): self
    {
        $this->points += $val;

        return $this;
    }

    public function incPlayed(): self
    {
        $this->played += 1;

        return $this;
    }

    public function getTiebreak(): ?int
    {
        return $this->tiebreak;
    }

    public function setTiebreak(?int $tiebreak): self
    {
        $this->tiebreak = $tiebreak;

        return $this;
    }
}
