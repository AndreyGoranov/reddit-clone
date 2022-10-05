"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20221005161430 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20221005161430 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    }
    async down() {
        this.addSql('alter table "user" drop constraint "user_username_unique";');
    }
}
exports.Migration20221005161430 = Migration20221005161430;
//# sourceMappingURL=Migration20221005161430.js.map