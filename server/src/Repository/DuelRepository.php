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
    public function findBySection($section)
    {
       return $this->createQueryBuilder('d')
                   ->join('d.player1', 'p')
                   ->where('p.section = :section')
                   ->orderBy('d.date', 'ASC')
                   ->setParameter(':section', $section)
                   ->getQuery()
                   ->getResult();
    }

    /**
     * @return Duel[] Returns an array of Duel objects
     */
    public function findByPlayerId($id)
    {
      return $this->createQueryBuilder('d')
          ->orWhere('d.player1 = :id')
          ->orWhere('d.player2 = :id')
          ->setParameter('id', $id)
          ->getQuery()
          ->getResult();
    }

    /**
     * @return Duel Returns an array of Duel objects
     */
    public function findByPlayers($username1, $username2, $stage='group')
    {
      if($stage == 'group'){
        $where = "d.stage = 'group'";
      }else{
        $where = "d.stage != 'group'";
      }

      return $this->createQueryBuilder('d')
          ->join('d.player1', 'p1')
          ->join('d.player2', 'p2')
          ->where('p1.username = :u1 AND p2.username = :u2 OR p2.username = :u1 AND p1.username = :u2')
          ->andWhere($where)
          ->setParameter('u1', $username1)
          ->setParameter('u2', $username2)
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
        ;
        $result = $qb->getQuery()->getResult();

        return $result;
    }
}
