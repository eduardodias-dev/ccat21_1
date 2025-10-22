import AccountAssetRepository from "./AccountAssetRepository";
import pgp from "pg-promise";

export default class AccountAssetRepositoryDatabase implements AccountAssetRepository {
    async insert(accountId: string, assetId: string, quantity: number): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        await connection.query("insert into ccca.balance (account_id, asset_id, quantity) values ($1,$2,$3)",
        [
            accountId,
            assetId,
            quantity
        ]);
        connection.$pool.end();
    }

    async update(accountId: string, assetId: string, quantity: number): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        await connection.query("update ccca.balance set quantity = $3 where account_id = $1 and asset_id = $2",[
            accountId,
            assetId,
            quantity
        ]);
        connection.$pool.end();
    }

    async get(accountId: string, assetId: string): Promise<any> {
        const connection = pgp()("postgres://postgres:123456@db:5432/app");
        const [balance] = await connection.query("select * from ccca.balance where account_id = $1 AND asset_id = $2", [accountId, assetId]);
        connection.$pool.end();
        console.log(balance);
        return balance;
    }
}