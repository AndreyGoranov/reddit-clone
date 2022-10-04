"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20221004083856 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20221004083856 extends migrations_1.Migration {
    async up() {
        this.addSql('drop table if exists "mikro_orm_migrations" cascade;');
    }
    async down() {
        this.addSql('create table "mikro_orm_migrations" ("id" serial primary key, "name" varchar null default null, "executed_at" timestamptz null default CURRENT_TIMESTAMP);');
    }
}
exports.Migration20221004083856 = Migration20221004083856;
//# sourceMappingURL=Migration20221004083856.js.map