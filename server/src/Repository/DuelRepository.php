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

    
    public function findByPlayers($tournamentId, $username1, $username2, $stage='group'): Duel
    {
      if($stage == 'group'){
        $where = "d.stage = 'group'";
      }else{
        $where = "d.stage != 'group'";
      }

      return $this->createQueryBuilder('d')
          ->join('d.participant1', 'p1')
          ->join('d.participant2', 'p2')
          ->where('p1.username = :u1 AND p2.username = :u2 OR p2.username = :u1 AND p1.username = :u2')
          ->andWhere('d.tournament = :tournamentId')
          ->andWhere($where)
          ->setParameter('u1', $username1)
          ->setParameter('u2', $username2)
          ->setParameter('tournamentId', $tournamentId)
          ->getQuery()
          ->getOneOrNullResult();
    }


    public function getByDate(\Datetime $date)
    {
        $from = new \DateTime($date->format("Y-m-d")." 00:00:00");
        $to   = new \DateTime($date->format("Y-m-d")." 23:59:59");

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
