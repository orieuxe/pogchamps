<?php

namespace App\Repository;

use App\Entity\Participant;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Participant|null find($id, $lockMode = null, $lockVersion = null)
 * @method Participant|null findOneBy(array $criteria, array $orderBy = null)
 * @method Participant[]    findAll()
 * @method Participant[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ParticipantRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Participant::class);
    }

    /**
     * @return Participant Returns a Participant
     */
    public function findByName($tournamentId, $name)
    {
        return $this->createQueryBuilder('pa')
            ->where('pa.tournament = :id')
            ->join('pa.player', 'p')
            ->andWhere('p.twitch = :name OR p.username = :name')
            ->setParameter('name', $name)
            ->setParameter('id', $tournamentId)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
