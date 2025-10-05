import express, { Response, Request} from "express";
import crypto from "crypto"
import pgp from "pg-promise";
import { isValidEmail } from "./validateEmail";
import { validateCpf } from "./validateCpf";
import { validatePassword } from "./validatePassword";
var app = express()
app.use(express.json())

const connection = pgp()("postgres://postgres:123456@db:5432/app")

app.post("/signup", async (req: Request, res: Response) => {
    await connection.query("delete from ccca.account")
    await connection.query("insert into ccca.account (account_id, name, email, document, password) values ($1,$2,$3,$4,$5)", [
        crypto.randomUUID(),
        "Foo Bar",
        "foo.bar@test.com",
        "137.517.420-77",
        "123456"
    ])
    const accountId = crypto.randomUUID()
    const input = req.body;
    if(input.name.split(" ").length < 2){
        res.sendStatus(400);
        return;
    }
    if(!input.email || !isValidEmail(input.email)){
        res.sendStatus(400);
        return;
    }
    const existingAccount = await connection.query("select email from ccca.account where email = $1", [input.email]);
    if(existingAccount.length > 0){
        res.sendStatus(400);
        return;
    }

    if(!input.document || !validateCpf(input.document)){
        res.sendStatus(400);
        return;
    }

    if(!validatePassword(input.password)){
        res.sendStatus(400);
        return;
    }
    
    await connection.query("insert into ccca.account (account_id, name, email, document, password) values ($1,$2,$3,$4,$5)", [accountId, input.name, input.email, input.document, input.password]);
    res.json({ accountId })
})

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const [account] = await connection.query("select * from ccca.account where account_id = $1", [accountId]);

    res.json(account)
})

app.listen(3000);