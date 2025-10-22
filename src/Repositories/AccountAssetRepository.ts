export default interface AccountAssetRepository {
    get(accountId: string, assetId: string) : Promise<any>;
    update(accountId: string, assetId: string, quantity: number) : Promise<any>;
    insert(accountId: string, assetId: string, quantity: number) : Promise<any>;
}