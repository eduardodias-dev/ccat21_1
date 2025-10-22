import { AccountRepository } from "../Repositories/AccountRepository";
import { validateCpf } from "../validateCpf";
import { isValidEmail } from "../validateEmail";
import { validatePassword } from "../validatePassword";

export default class Signup {

    constructor(readonly accountRepository: AccountRepository){}

    async execute (input: Input) : Promise<Output> {
        if(input.name.split(" ").length < 2)
            throw new Error("Invalid name.");
        
        if(!input.email || !isValidEmail(input.email)){
            throw new Error("Invalid Email");
        }
    
        if(!input.document || !validateCpf(input.document)){
            throw new Error("Invalid document.");
        }
    
        if(!validatePassword(input.password)){
            throw new Error("Invalid Password");
        }

        const existingAccount = await this.accountRepository.getAccountByEmail(input.email);
        if(existingAccount){
            throw new Error("Invalid Email");
        }
        const accountId = crypto.randomUUID();
        await this.accountRepository.saveAccount({...input, id: accountId});
        return { accountId };
    }
}

type Input = {
    name: string,
    document: string,
    email: string,
    password: string
}

type Output = {
    accountId: string
}