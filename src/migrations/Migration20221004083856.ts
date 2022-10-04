import { Migration } from '@mikro-orm/migrations';

export class Migration20221004083856 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "mikro_orm_migrations" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "mikro_orm_migrations" ("id" serial primary key, "name" varchar null default null, "executed_at" timestamptz null default CURRENT_TIMESTAMP);');
  }
}
