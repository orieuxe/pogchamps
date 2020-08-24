<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200824105041 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE duel (id INT AUTO_INCREMENT NOT NULL, player1_id INT NOT NULL, player2_id INT NOT NULL, result INT DEFAULT NULL, round VARCHAR(16) NOT NULL, date DATETIME NOT NULL, INDEX IDX_9BB4A762C0990423 (player1_id), INDEX IDX_9BB4A762D22CABCD (player2_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE duel ADD CONSTRAINT FK_9BB4A762C0990423 FOREIGN KEY (player1_id) REFERENCES player (id)');
        $this->addSql('ALTER TABLE duel ADD CONSTRAINT FK_9BB4A762D22CABCD FOREIGN KEY (player2_id) REFERENCES player (id)');
        $this->addSql('ALTER TABLE game ADD duel_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C58875E FOREIGN KEY (duel_id) REFERENCES duel (id)');
        $this->addSql('CREATE INDEX IDX_232B318C58875E ON game (duel_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE game DROP FOREIGN KEY FK_232B318C58875E');
        $this->addSql('DROP TABLE duel');
        $this->addSql('DROP INDEX IDX_232B318C58875E ON game');
        $this->addSql('ALTER TABLE game DROP duel_id');
    }
}
