import AccountAssetRepository from "../Repositories/AccountAssetRepository";

export default class Withdraw{
    
    constructor(readonly accountAssetRepository: AccountAssetRepository){}

    async execute(input: Input) : Promise<any> {
        if(input.assetId !== "USD" && input.assetId !== "BTC"){
            throw new Error("Asset must be USD or BTC.");
        }

        const balance = await this.accountAssetRepository.get(input.accountId, input.assetId);
        if(!balance)
            throw new Error("Insufficient funds.");

        if(input.quantity > parseFloat(balance.quantity)){
            throw new Error("Quantity must be less or equal than balance.");
        }

        const updatedBalance = parseFloat(balance.quantity) - input.quantity;
        await this.accountAssetRepository.update(input.accountId, input.assetId, updatedBalance);
    }
}

type Input = {
    accountId: string,
    assetId: string,
    quantity: number
}