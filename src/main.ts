import express, { Response, Request} from "express";
import Signup from "./UseCases/Signup";
import GetAccount from "./UseCases/GetAccount";
import AccountRepositoryDatabase from "./Repositories/AccountRepositoryDatabase";
import AccountAssetRepositoryDatabase from "./Repositories/AccountAssetRepositoryDatabase";
import Deposit from "./UseCases/Deposit";
import GetBalance from "./UseCases/GetBalance";
import Withdraw from "./UseCases/Withdraw";

export const main = () => {
    var app = express()
    app.use(express.json())
    
    app.post("/signup", async (req: Request, res: Response) => {
        try {
            const input = req.body;
            const signup = new Signup(new AccountRepositoryDatabase());
            const output = await signup.execute(input);
            res.json(output);
        }catch(e: any){
            res.status(400).json({
                message: e.message
            })
        }
    })
    
    app.get("/accounts/:accountId", async (req: Request, res: Response) => {
        const accountId = req.params.accountId;
        const getAccount = new GetAccount(new AccountRepositoryDatabase());
        const account = await getAccount.execute(accountId);
    
        res.json(account)
    })
    
    app.post("/deposit", async (req: Request, res: Response) => {
        try {
            const depositData = req.body;
            const deposit = new Deposit(new AccountRepositoryDatabase(), new AccountAssetRepositoryDatabase());
            await deposit.execute(depositData);
            res.sendStatus(200)
        }catch(e: any){
            res.status(400).send({ message: e.message });
        }
    });
    
    app.post("/withdraw", async (req: Request, res: Response) => {
        try {
            const withDrawData = req.body;
            const withdraw = new Withdraw(new AccountAssetRepositoryDatabase())
            await withdraw.execute(withDrawData);
            res.sendStatus(200);
        }catch(e: any){
            res.status(400).send({message: e.message});
        }
    })
    
    app.get("/account/:accountId/balance/:assetId", async (req: Request, res: Response) => {
        const accountId = req.params.accountId; 
        const assetId = req.params.assetId;
        const getBalance = new GetBalance(new AccountAssetRepositoryDatabase())
        const output = await getBalance.execute({ assetId, accountId });
        res.json(output);
    })
    
    app.listen(3000);
}

main();