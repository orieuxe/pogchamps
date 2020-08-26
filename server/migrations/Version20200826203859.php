<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200826203859 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('SELECT setval(\'duel_id_seq\', (SELECT MAX(id) FROM duel))');
        $this->addSql('ALTER TABLE duel ALTER id SET DEFAULT nextval(\'duel_id_seq\')');
        $this->addSql('ALTER TABLE duel ALTER round SET NOT NULL');
        $this->addSql('ALTER TABLE duel ALTER round TYPE VARCHAR(16)');
        $this->addSql('ALTER TABLE duel ALTER result DROP NOT NULL');
        $this->addSql('ALTER TABLE duel ALTER result TYPE VARCHAR(255)');
        $this->addSql('SELECT setval(\'game_id_seq\', (SELECT MAX(id) FROM game))');
        $this->addSql('ALTER TABLE game ALTER id SET DEFAULT nextval(\'game_id_seq\')');
        $this->addSql('SELECT setval(\'player_id_seq\', (SELECT MAX(id) FROM player))');
        $this->addSql('ALTER TABLE player ALTER id SET DEFAULT nextval(\'player_id_seq\')');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE duel ALTER id DROP DEFAULT');
        $this->addSql('ALTER TABLE duel ALTER result SET NOT NULL');
        $this->addSql('ALTER TABLE duel ALTER result TYPE VARCHAR(16)');
        $this->addSql('ALTER TABLE duel ALTER round DROP NOT NULL');
        $this->addSql('ALTER TABLE duel ALTER round TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE game ALTER id DROP DEFAULT');
        $this->addSql('ALTER TABLE player ALTER id DROP DEFAULT');
    }
}
