import pgp from "pg-promise";
import { AccountRepository } from "../Repositories/AccountRepository";

export default class GetAccount {
    
    constructor(readonly accountRepository: AccountRepository){}

    async execute (accountId: string): Promise<Output> {
        const account = await this.accountRepository.getAccountById(accountId);
        return {
            accountId: account.account_id,
            name: account.name, 
            document: account.document, 
            email: account.email, 
            password: account.password
        };
    }
}

type Output = {
    accountId: string,
    name: string,
    document: string,
    email: string,
    password: string
}