<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LoginController extends AbstractController
{
    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $login = $data['login'] ?? null;
        $plainPassword = $data['password'] ?? null;

        if (!$login || !$plainPassword) {
            return new JsonResponse(['error' => 'Missing credentials'], 400);
        }

        // Chercher l’utilisateur en base
        $user = $entityManager->getRepository(User::class)->findOneBy(['login' => $login]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        // Vérifier le mot de passe
        if (!$passwordHasher->isPasswordValid($user, $plainPassword)) {
            return new JsonResponse(['error' => 'Invalid credentials'], 401);
        }

        // Ici tu pourrais générer un JWT ou un token de session
        return new JsonResponse([
            'status' => 'Login successful',
            'user' => [
                'id' => $user->getId(),
                'login' => $user->getLogin(),
                'rank' => $user->getRank(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }
}
