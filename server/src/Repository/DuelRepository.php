<?php

namespace App\Repository;

use App\Entity\Duel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Duel|null find($id, $lockMode = null, $lockVersion = null)
 * @method Duel|null findOneBy(array $criteria, array $orderBy = null)
 * @method Duel[]    findAll()
 * @method Duel[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DuelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Duel::class);
    }

    /**
     * @return Duel[] Returns an array of Duel objects
     */
    public function findByGroup($tournamentId, $group)
    {
       return $this->createQueryBuilder('d')
                   ->join('d.participant1', 'pa')
                   ->where('pa.groupe = :groupe')
                   ->andWhere("d.stage = 'group'")
                   ->andWhere('d.tournament = :tournamentId')
                   ->orderBy('d.date', 'ASC')
                   ->setParameter(':groupe', $group)
                   ->setParameter(':tournamentId', $tournamentId)
                   ->getQuery()
                   ->getResult();
    }

    /**
     * @return Duel[] Returns an array of Duel objects
     */
    public function findByParticipantId($participantId)
    {
      return $this->createQueryBuilder('d')
          ->where('d.participant1 = :participantId')
          ->orWhere('d.participant2 = :participantId')
          ->setParameter('participantId', $participantId)
          ->orderBy('d.date', 'ASC')
          ->getQuery()
          ->getResult();
    }
    
    public function findOpenDuelByPlayers($username1, $username2): Duel
    {
      return $this->createQueryBuilder('d')
          ->join('d.participant1', 'pa1')
          ->join('d.participant2', 'pa2')
          ->join('pa1.player', 'p1')
          ->join('pa2.player', 'p2')
          ->where('p1.username = :u1 AND p2.username = :u2 OR p2.username = :u1 AND p1.username = :u2')
          ->andWhere('d.result IS NULL')
          ->setParameter('u1', $username1)
          ->setParameter('u2', $username2)
          ->getQuery()
          ->getResult();
    }
    
     /**
     * @return Duel[] Returns an array of Duel objects
     */
    public function findEndedDuels(): array
    {
      return $this->createQueryBuilder('d')
          ->andWhere('d.result IS NOT NULL')
          ->getQuery()
          ->getResult();
    }
    
     /**
     * @return Duel[] Returns an array of Duel objects
     */
    public function findOpenDuels($limit): array
    {
      return $this->createQueryBuilder('d')
          ->andWhere('d.result IS NULL')
          ->orderBy('d.date')
          ->setMaxResults($limit)
          ->getQuery()
          ->getResult();
    }


    public function getByDate(\Datetime $date)
    {
        $from = new \DateTime($date->format("Y-m-d")." 12:00:00");
        $to   = new \DateTime($date->modify('+1 day')->format("Y-m-d")." 11:59:59");

        $qb = $this->createQueryBuilder("e");
        $qb
            ->andWhere('e.date BETWEEN :from AND :to')
            ->setParameter('from', $from )
            ->setParameter('to', $to)
            ->orderBy('e.date', 'ASC')
        ;
        $result = $qb->getQuery()->getResult();

        return $result;
    }
}
