<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Controller\UserController;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use App\Enum\Goal;
use App\Enum\Level;
use App\Enum\Sport;
use App\Repository\UserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_LOGIN', fields: ['login'])]
#[ApiResource(
    shortName: 'Users',
    description: 'API Users',
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Patch(),
        new Delete()
    ],
    formats: ['jsonld', 'json'],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    #[Groups(['user:read', 'user:write'])]
    private ?string $login = null;

    #[ORM\Column]
    #[Groups(['user:read', 'user:write'])]
    private array $roles = [];

    #[ORM\Column]
    #[Groups(['user:read', 'user:write'])]
    private ?string $password = null;

    #[ORM\Column(type: 'integer', options: ["default" => 0])]
    #[Groups(['user:read', 'user:write'])]
    private int $rank = 0;

    #[ORM\Column(nullable: true, enumType: Level::class)]
    #[Groups(['user:read', 'user:write'])]
    private ?Level $sportLevel = null;

    #[ORM\Column(type: Types::SIMPLE_ARRAY, nullable: true, enumType: Sport::class)]
    #[Groups(['user:read', 'user:write'])]
    private ?array $sports = null;

    #[ORM\Column(nullable: true, enumType: Goal::class)]
    #[Groups(['user:read', 'user:write'])]
    private ?Goal $goal = null;

    public function getRank(): int
    {
        return $this->rank;
    }

    public function setRank(int $rank): self
    {
        $this->rank = $rank;
        return $this;
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLogin(): ?string
    {
        return $this->login;
    }

    public function setLogin(string $login): static
    {
        $this->login = $login;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->login;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    #[\Deprecated]
    public function eraseCredentials(): void
    {
        // @deprecated, to be removed when upgrading to Symfony 8
    }

    public function getSportLevel(): ?Level
    {
        return $this->sportLevel;
    }

    public function setSportLevel(?Level $sportLevel): static
    {
        $this->sportLevel = $sportLevel;

        return $this;
    }

    /**
     * @return Sport[]|null
     */
    public function getSports(): ?array
    {
        return $this->sports;
    }

    public function setSports(?array $sports): static
    {
        $this->sports = $sports;

        return $this;
    }

    public function getGoal(): ?Goal
    {
        return $this->goal;
    }

    public function setGoal(?Goal $goal): static
    {
        $this->goal = $goal;

        return $this;
    }
}
