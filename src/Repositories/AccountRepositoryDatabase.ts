import { AccountRepository } from "./AccountRepository";
import pgp from "pg-promise";

export default class AccountRepositoryDatabase implements AccountRepository {
    async getAccountByEmail(email: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        const [account] = await connection.query("select email from ccca.account where email = $1", [email]);
        connection.$pool.end();
        return account;
    }

    async getAccountById(id: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        const [account] = await connection.query("select * from ccca.account where account_id = $1", [id])
        connection.$pool.end();
        return account;
    }

    async saveAccount(account: { id: string; name: string; document: string; email: string; password: string; }): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        await connection.query("insert into ccca.account (account_id, name, email, document, password) values ($1,$2,$3,$4,$5)", [account.id, account.name, account.email, account.document, account.password]);
        connection.$pool.end();
    }

}