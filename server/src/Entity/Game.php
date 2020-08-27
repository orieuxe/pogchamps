<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GameRepository::class)
 */
class Game implements \JsonSerializable
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=32)
     */
    private $site;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

    /**
     * @ORM\Column(type="string", length=32)
     */
    private $white;

    /**
     * @ORM\Column(type="string", length=32)
     */
    private $black;

    /**
     * @ORM\Column(type="string", length=8)
     */
    private $result;

    /**
     * @ORM\Column(type="integer")
     */
    private $whiteelo;

    /**
     * @ORM\Column(type="integer")
     */
    private $blackelo;

    /**
     * @ORM\Column(type="string", length=32)
     */
    private $timecontrol;

    /**
     * @ORM\Column(type="string", length=8, nullable=true)
     */
    private $eco;

    /**
     * @ORM\Column(type="string", length=64)
     */
    private $termination;

    /**
     * @ORM\Column(type="integer")
     */
    private $length;

    /**
     * @ORM\Column(type="text")
     */
    private $moves;

    /**
     * @ORM\ManyToOne(targetEntity=Duel::class, inversedBy="Games")
     * @ORM\JoinColumn(nullable=true)
     */
    private $duel;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $clocks;

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSite(): ?string
    {
        return $this->site;
    }

    public function setSite(string $site): self
    {
        $this->site = $site;

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

    public function getWhite(): ?string
    {
        return $this->white;
    }

    public function setWhite(string $white): self
    {
        $this->white = $white;

        return $this;
    }

    public function getBlack(): ?string
    {
        return $this->black;
    }

    public function setBlack(string $black): self
    {
        $this->black = $black;

        return $this;
    }

    public function getResult(): ?string
    {
        return $this->result;
    }

    public function setResult(string $result): self
    {
        $this->result = $result;

        return $this;
    }

    public function getWhiteelo(): ?int
    {
        return $this->whiteelo;
    }

    public function setWhiteelo(int $whiteelo): self
    {
        $this->whiteelo = $whiteelo;

        return $this;
    }

    public function getBlackelo(): ?int
    {
        return $this->blackelo;
    }

    public function setBlackelo(int $blackelo): self
    {
        $this->blackelo = $blackelo;

        return $this;
    }

    public function getTimecontrol(): ?string
    {
        return $this->timecontrol;
    }

    public function setTimecontrol(string $timecontrol): self
    {
        $this->timecontrol = $timecontrol;

        return $this;
    }

    public function getEco(): ?string
    {
        return $this->eco;
    }

    public function setEco(?string $eco): self
    {
        $this->eco = $eco;

        return $this;
    }

    public function getTermination(): ?string
    {
        return $this->termination;
    }

    public function setTermination(string $termination): self
    {
        $this->termination = $termination;

        return $this;
    }

    public function getLength(): ?int
    {
        return $this->length;
    }

    public function setLength(int $length): self
    {
        $this->length = $length;

        return $this;
    }

    public function getMoves(): ?string
    {
        return $this->moves;
    }

    public function setMoves(string $moves): self
    {
        $this->moves = $moves;

        return $this;
    }

    public function getDuel(): ?Duel
    {
        return $this->duel;
    }

    public function setDuel(?Duel $duel): self
    {
        $this->duel = $duel;

        return $this;
    }

    public function getClocks(): ?string
    {
        return $this->clocks;
    }

    public function setClocks(?string $clocks): self
    {
        $this->clocks = $clocks;

        return $this;
    }
}
