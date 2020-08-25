<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

/**
 * GameController.
 * @Route("/test", name="test_")
 */
class TestController extends AbstractFOSRestController
{
    /**
     * Get 200 Response
     * @Rest\Get("/response")
     *
     * @return Response
     */
    public function getResponse()
    {
      return $this->handleView($this->view(['hello word']));
    }
}
