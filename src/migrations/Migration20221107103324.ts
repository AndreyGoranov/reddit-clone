import { Migration } from '@mikro-orm/migrations';

export class Migration20221107103324 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_liked_posts" ("user_id" int not null, "post_id" int not null, constraint "user_liked_posts_pkey" primary key ("user_id", "post_id"));');

    this.addSql('alter table "user_liked_posts" add constraint "user_liked_posts_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_liked_posts" add constraint "user_liked_posts_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_liked_posts" cascade;');
  }

}
