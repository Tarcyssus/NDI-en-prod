<?php

namespace App\Controller;

use App\Entity\User;
use App\Enum\Sport;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\UserRepository;
use Symfony\Component\Routing\Attribute\Route;

final class UserController extends AbstractController
{
    #[Route('/api/ranking', name: 'rank_users_top', methods: ['GET'])]
    public function rank_users(UserRepository $userRepository): Response
    {
        $allUsers = $userRepository->getRankingUsers();
        $topUsers = array_slice($allUsers, 0, 10);
        $data = [];

        foreach ($topUsers as $index => $user) {
            $data[] = [
                'rank' => $index + 1,
                'name' => $user->getLogin(),
                'points' => $user->getRank(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/api/ranking/user/{id}', name: 'rank_user', methods: ['GET'])]
    public function rank_user(UserRepository $userRepository, int $id): Response
    {
        $allUsers = $userRepository->getRankingUsers();
        $userToFind = $userRepository->findBy(['id' => $id]);

        if (empty($userToFind)) {
            throw $this->createNotFoundException();
        }

        $data = [];
        foreach ($allUsers as $index => $user) {
            if ($user->getId() === $userToFind[0]->getId()) {
                $data[] = [
                    'rank' => $index + 1,
                    'name' => $user->getLogin(),
                    'points' => $user->getRank(),
                ];
            }
        }

        return $this->json($data[0]);
    }

    #[Route('/api/profile/{id}', name: 'user_profile', methods: ['GET'])]
    public function profile(UserRepository $userRepository, int $id): Response
    {
        $user = $userRepository->find($id);

        if (!$user instanceof User) {
            throw $this->createNotFoundException();
        }

        $allUsers = $userRepository->getRankingUsers();
        $position = null;

        foreach ($allUsers as $index => $rankedUser) {
            if ($rankedUser->getId() === $user->getId()) {
                $position = $index + 1;
                break;
            }
        }

        $sports = array_map(
            static fn ($sport) => $sport instanceof Sport ? $sport->value : (string) $sport,
            $user->getSports() ?? []
        );

        return $this->json([
            'name' => $user->getLogin(),
            'sportLevel' => $user->getSportLevel()?->value,
            'sports' => $sports,
            'goal' => $user->getGoal()?->value,
            'rank' => $position,
            'points' => $user->getRank(),
        ]);
    }

    #[Route('/api/user/{id}/add_point', name: 'user_add_point', methods: ['GET'])]
    public function add_point(UserRepository $userRepository, EntityManagerInterface $entityManager, int $id): Response
    {
        $user = $userRepository->find($id);

        if (!$user instanceof User) {
            throw $this->createNotFoundException();
        }

        $newRank = $user->getRank() + 1;
        $user->setRank($newRank);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'Points added successfully',
            'new_rank' => $newRank,
        ]);
    }
}
