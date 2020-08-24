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
