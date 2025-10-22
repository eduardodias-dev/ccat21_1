import AccountAssetRepository from "../Repositories/AccountAssetRepository";
import { AccountRepository } from "../Repositories/AccountRepository";

export default class Deposit {
    constructor(readonly accountRepository: AccountRepository, readonly accountAssetRepository: AccountAssetRepository){}

    async execute(input: Input): Promise<any> {
        if(input.assetId !== 'USD' && input.assetId !== 'BTC'){
            throw new Error("Asset must be USD or BTC.");
        }
    
        if(input.quantity <= 0){
            throw new Error("Quantity must be greater than Zero.");
        }
    
        const existingAccount = await this.accountRepository.getAccountById(input.accountId);
        if(!existingAccount){
            throw new Error("Account doesn't exist.");
        }
    
        const currentBalance = await this.accountAssetRepository.get(input.accountId, input.assetId);
    
        if (currentBalance){        
            await this.accountAssetRepository.update(input.accountId, input.assetId, input.quantity + parseFloat(currentBalance.quantity));
            return;
        }
        
        await this.accountAssetRepository.insert(input.accountId, input.assetId, input.quantity);
    }
}

type Input = {
    accountId: string,
    assetId: string,
    quantity: number
}