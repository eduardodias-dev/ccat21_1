import axios from "axios"

test("Deve criar uma conta no sistema", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@test.com",
        document: "137.517.420-77",
        password: "Senha123"
    }
    
    const responseSignup = await axios.post("http://localhost:3000/signup", input);
    const outputSignup =responseSignup.data;
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;

    expect(outputGetAccount.account_id).toBe(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);
})

test("Deve ter erro se não tiver nome e sobrenome", async () => {
    const input = {
        name: "John",
        email: "john@test.com",
        document: "13751742077",
        password: "Senha123"
    }

    
    try {
        await axios.post("http://localhost:3000/signup", input);
    }
    catch(error){
        expect(error.response.status).toBe(400)
        return;
    }
    
    throw new Error();
});

test.each([
    "johntest.com",
    "ee.com",
    "",
    null,
    undefined
])
("O email deve ser válido", async (email: string) => {
    const input = {
        name: "John Doe",
        email: email,
        document: "13751742077",
        password: "Senha123"
    }
    
    try {
        await axios.post("http://localhost:3000/signup", input);
    }
    catch(error){
        expect(error.response.status).toBe(400)
        return;
    }
    
    throw new Error();
});

test("O email deve ser único", async () => {
    const input = {
        name: "John Doe",
        email: "foo.bar@test.com",
        document: "13751742077",
        password: "Senha123"
    }
    
    try {
        await axios.post("http://localhost:3000/signup", input);
    }
    catch(error){
        expect(error.response.status).toBe(400)
        return;
    }
    
    throw new Error();
});

test("O documento deve seguir as regras de validação do CPF", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@test.com",
        document: "11111111111",
        password: "Senha123"
    }
    
    try {
        await axios.post("http://localhost:3000/signup", input);
    }
    catch(error){
        expect(error.response.status).toBe(400)
        return;
    }
    
    throw new Error();
});

test("A senha deve ter no mínimo 8 caracteres com letras minúsculas, maiúsculas e números", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@test.com",
        document: "13751742077",
        password: "123se"
    }
    
    try {
        await axios.post("http://localhost:3000/signup", input);
    }
    catch(error){
        expect(error.response.status).toBe(400)
        return;
    }
    
    throw new Error();
});