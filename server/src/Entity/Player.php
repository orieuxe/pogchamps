<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PlayerRepository::class)
 */
class Player
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
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
     * @ORM\Column(type="string", length=8)
     */
    private $section;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private $points;

    /**
     * @ORM\Column(type="boolean", options={"default" : false})
     */
    private $winnerBracket;

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

    public function getSection(): ?string
    {
        return $this->section;
    }

    public function setSection(string $section): self
    {
        $this->section = $section;

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

    public function getWinnerBracket(): ?bool
    {
        return $this->winnerBracket;
    }

    public function setWinnerBracket(bool $winnerBracket): self
    {
        $this->winnerBracket = $winnerBracket;

        return $this;
    }
}
