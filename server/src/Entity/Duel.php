<?php

namespace App\Entity;

use App\Repository\DuelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DuelRepository::class)
 * @ORM\Table(name="duel")
 */
class Duel
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Participant::class)
     * @ORM\JoinColumn(nullable=true)
     */
    private $participant1;

    /**
     * @ORM\ManyToOne(targetEntity=Participant::class)
     * @ORM\JoinColumn(nullable=true)
     */
    private $participant2;

    /**
     * @ORM\OneToMany(targetEntity=Game::class, mappedBy="duel", cascade={"persist"})
     * @ORM\OrderBy({"id" = "ASC"})
     */
    private $games;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $result;

    /**
     * @ORM\Column(type="string", length=16)
     */
    private $round;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity=Duel::class)
     */
    private $next_duel;

    /**
     * @ORM\Column(type="string", length=8, options={"default" : "group"})
     */
    private $stage;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $nextDuelSlot;

    /**
     * @ORM\ManyToOne(targetEntity=Tournament::class)
     */
    private $tournament;

    public function __construct()
    {
        $this->games = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getParticipant1(): ?Participant
    {
        return $this->participant1;
    }

    public function setParticipant1(?Participant $participant1): self
    {
        $this->participant1 = $participant1;

        return $this;
    }

    public function getParticipant2(): ?Participant
    {
        return $this->participant2;
    }

    public function setParticipant2(?Participant $participant2): self
    {
        $this->participant2 = $participant2;

        return $this;
    }

    /**
     * @return Collection|Game[]
     */
    public function getGames(): Collection
    {
        return $this->games;
    }

    public function addGame(Game $game): self
    {
        if (!$this->games->contains($game)) {
            $this->games[] = $game;
            $game->setDuel($this);
        }

        return $this;
    }

    public function removeGame(Game $game): self
    {
        if ($this->games->contains($game)) {
            $this->games->removeElement($game);
            // set the owning side to null (unless already changed)
            if ($game->getDuel() === $this) {
                $game->setDuel(null);
            }
        }

        return $this;
    }

    public function getResult(): ?string
    {
        return $this->result;
    }

    public function setResult(?string $result): self
    {
        $this->result = $result;

        return $this;
    }

    public function getRound(): ?string
    {
        return $this->round;
    }

    public function setRound(string $round): self
    {
        $this->round = $round;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getNextDuel(): ?self
    {
        return $this->next_duel;
    }

    public function setNextDuel(?self $next_duel): self
    {
        $this->next_duel = $next_duel;

        return $this;
    }

    public function getStage(): ?string
    {
        return $this->stage;
    }

    public function setStage(string $stage): self
    {
        $this->stage = $stage;

        return $this;
    }

    public function getNextDuelSlot(): ?int
    {
        return $this->nextDuelSlot;
    }

    public function setNextDuelSlot(?int $nextDuelSlot): self
    {
        $this->nextDuelSlot = $nextDuelSlot;

        return $this;
    }

    public function getTournament(): ?Tournament
    {
        return $this->tournament;
    }

    public function setTournament(?Tournament $tournament): self
    {
        $this->tournament = $tournament;

        return $this;
    }
}
