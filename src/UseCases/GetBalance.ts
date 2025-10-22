import AccountAssetRepository from "../Repositories/AccountAssetRepository";

export default class GetBalance {
    constructor(readonly accountAssetRepository: AccountAssetRepository){}

    async execute(input: Input) : Promise<Output>{
        const balance = await this.accountAssetRepository.get(input.accountId, input.assetId);
        return {
            assetId: balance.asset_id,
            accountId: balance.account_id,
            quantity: balance.quantity
        };
    }
}

type Input = {
    assetId: string,
    accountId: string
}

type Output = {
    assetId: string,
    accountId: string,
    quantity: number
}
