<?php

namespace App\Entity;

use App\Repository\TournamentRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TournamentRepository::class)
 */
class Tournament
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Player::class, cascade={"persist", "remove"})
     */
    private $winner;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $infoUrl;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWinner(): ?Player
    {
        return $this->winner;
    }

    public function setWinner(?Player $winner): self
    {
        $this->winner = $winner;

        return $this;
    }

    public function getInfoUrl(): ?string
    {
        return $this->infoUrl;
    }

    public function setInfoUrl(string $infoUrl): self
    {
        $this->infoUrl = $infoUrl;

        return $this;
    }
}
