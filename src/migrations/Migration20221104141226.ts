import { Migration } from '@mikro-orm/migrations';

export class Migration20221104141226 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "likes" int not null');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" drop column "likes";');
  }

}
