<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Stopwatch\Section;

/**
 * @ORM\Entity(repositoryClass=PlayerRepository::class)
 */
class Player
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=16)
     */
    private $twitch;

    /**
     * @ORM\Column(type="string", length=16)
     */
    private $username;

    /**
     * @ORM\OneToMany(targetEntity=Participant::class, mappedBy="player")
     */
    private $participations;

    public function __construct()
    {
        $this->participations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTwitch(): ?string
    {
        return $this->twitch;
    }

    public function setTwitch(string $twitch): self
    {
        $this->twitch = $twitch;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getParticipation(): ?string
    {
        return $this->participation;
    }

    public function setParticipation(string $participation): self
    {
        $this->participation = $participation;

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

    public function addPoints(int $val): self
    {
        $this->points += $val;

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

    public function incPlayed(): self
    {
        $this->played += 1;

        return $this;
    }

    /**
     * @return Collection|Participation[]
     */
    public function getParticipations(): Collection
    {
        return $this->participations;
    }

    public function addParticipation(Participant $participation): self
    {
        if (!$this->participations->contains($participation)) {
            $this->participations[] = $participation;
            $participation->setPlayer($this);
        }

        return $this;
    }

    public function removeParticipation(Participant $participation): self
    {
        if ($this->participations->contains($participation)) {
            $this->participations->removeElement($participation);
            // set the owning side to null (unless already changed)
            if ($participation->getPlayer() === $this) {
                $participation->setPlayer(null);
            }
        }

        return $this;
    }
}
