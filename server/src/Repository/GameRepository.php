<?php

namespace App\Repository;

use App\Entity\Game;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Game|null find($id, $lockMode = null, $lockVersion = null)
 * @method Game|null findOneBy(array $criteria, array $orderBy = null)
 * @method Game[]    findAll()
 * @method Game[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GameRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Game::class);
    }

    /**
     * @return Game[] Returns an array of Game objects
     */
    public function findByUsername($username)
    {
        return $this->createQueryBuilder('g')
            ->orWhere('g.white = :name')
            ->orWhere('g.black = :name')
            ->setParameter('name', $username)
            ->getQuery()
            ->getResult()
        ;
    }
    /**
     * @return Game[] Returns an array of Game objects
     */
    public function findBySection($section)
    {
       $em = $this->getEntityManager();
       return $em->createQuery('SELECT g FROM App\Entity\Game g WHERE g.white IN (SELECT p.username FROM App\Entity\Player p WHERE p.section = :sect)')
                   ->setParameter(':sect', $section)
                   ->getResult();

    }
}
