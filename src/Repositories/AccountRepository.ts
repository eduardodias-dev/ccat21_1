export interface AccountRepository {
    getAccountById(id: string): Promise<any>;
    saveAccount(account: {id: string, name:string, document:string, email: string, password: string}): Promise<any>;
    getAccountByEmail(email: string): Promise<any>;
}