import { Migration } from '@mikro-orm/migrations';

export class Migration20221110102041 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post_disliked_by" ("post_id" int not null, "user_id" int not null, constraint "post_disliked_by_pkey" primary key ("post_id", "user_id"));');

    this.addSql('alter table "post_disliked_by" add constraint "post_disliked_by_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "post_disliked_by" add constraint "post_disliked_by_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "post" add column "dislikes" int not null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post_disliked_by" cascade;');

    this.addSql('alter table "post" drop column "dislikes";');
  }

}
