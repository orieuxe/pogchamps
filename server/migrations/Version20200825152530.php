<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200825152530 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE duel_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE game_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE player_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE duel (id INT NOT NULL, player1_id INT NOT NULL, player2_id INT NOT NULL, result VARCHAR(255) DEFAULT NULL, round VARCHAR(16) NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9BB4A762C0990423 ON duel (player1_id)');
        $this->addSql('CREATE INDEX IDX_9BB4A762D22CABCD ON duel (player2_id)');
        $this->addSql('CREATE TABLE game (id INT NOT NULL, duel_id INT DEFAULT NULL, site VARCHAR(32) NOT NULL, date DATE NOT NULL, white VARCHAR(32) NOT NULL, black VARCHAR(32) NOT NULL, result VARCHAR(8) NOT NULL, whiteelo INT NOT NULL, blackelo INT NOT NULL, timecontrol VARCHAR(32) NOT NULL, eco VARCHAR(8) DEFAULT NULL, termination VARCHAR(64) NOT NULL, length INT NOT NULL, moves TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_232B318C58875E ON game (duel_id)');
        $this->addSql('CREATE TABLE player (id INT NOT NULL, twitch VARCHAR(16) NOT NULL, username VARCHAR(16) NOT NULL, section VARCHAR(8) NOT NULL, points INT DEFAULT 0 NOT NULL, winner_bracket BOOLEAN DEFAULT \'false\' NOT NULL, played INT DEFAULT 0 NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE duel ADD CONSTRAINT FK_9BB4A762C0990423 FOREIGN KEY (player1_id) REFERENCES player (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE duel ADD CONSTRAINT FK_9BB4A762D22CABCD FOREIGN KEY (player2_id) REFERENCES player (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318C58875E FOREIGN KEY (duel_id) REFERENCES duel (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE game DROP CONSTRAINT FK_232B318C58875E');
        $this->addSql('ALTER TABLE duel DROP CONSTRAINT FK_9BB4A762C0990423');
        $this->addSql('ALTER TABLE duel DROP CONSTRAINT FK_9BB4A762D22CABCD');
        $this->addSql('DROP SEQUENCE duel_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE game_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE player_id_seq CASCADE');
        $this->addSql('DROP TABLE duel');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE player');
    }
}
