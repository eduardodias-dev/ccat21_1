import axios from "axios"
import crypto from "crypto";

axios.defaults.validateStatus = () => true;

const apiBaseUrl = "http://localhost:3000";

test("Deve criar uma conta no sistema", async () => {
    const email = `${crypto.randomUUID()}@test.com`;
    const input = {
        name: "John Doe",
        email,
        document: "137.517.420-77",
        password: "Senha123"
    }
    
    const responseSignup = await axios.post(`${apiBaseUrl}/signup`, input);
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(`${apiBaseUrl}/accounts/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;

    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
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

    const response = await axios.post(`${apiBaseUrl}/signup`, input);
    expect(response.status).toBe(400);
    
});

test.each([
    "johntest.com",
    "ee.com",
    "",
    null,
    undefined
])
("O email deve ser válido", async (email: string|null|undefined) => {
    const input = {
        name: "John Doe",
        email: email,
        document: "13751742077",
        password: "Senha123"
    }

    const response = await axios.post(`${apiBaseUrl}/signup`, input);
    expect(response.status).toBe(400);
    
});

test("O email deve ser único", async () => {
    const input = {
        name: "John Doe",
        email: "foo.bar@test.com",
        document: "13751742077",
        password: "Senha123"
    }
    
    const response = await axios.post(`${apiBaseUrl}/signup`, input);
    expect(response.status).toBe(400)
    
});

test("O documento deve seguir as regras de validação do CPF", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@test.com",
        document: "11111111111",
        password: "Senha123"
    }
    
    const response = await axios.post(`${apiBaseUrl}/signup`, input);
    expect(response.status).toBe(400);
});

test("A senha deve ter no mínimo 8 caracteres com letras minúsculas, maiúsculas e números", async () => {
    const input = {
        name: "John Doe",
        email: "john.doe@test.com",
        document: "13751742077",
        password: "123se"
    }
    
    const response = await axios.post(`${apiBaseUrl}/signup`, input);
    expect(response.status).toBe(400);
});

test("Deve fazer um Depósito", async () => {
    const input = {
        accountId: 'ec249732-442e-449b-891a-c742e2c18e42',
        assetId: "BTC",
        quantity: 10
    }

    let balanceResponse = await axios.get(`${apiBaseUrl}/account/${input.accountId}/balance/${input.assetId}`);
    const previousBalance = balanceResponse.data;
    
    await axios.post(`${apiBaseUrl}/deposit`, input)
    const assetResponse = await axios.get(`${apiBaseUrl}/account/${input.accountId}/balance/${input.assetId}`)
    const assetOutput = assetResponse.data;

    expect(assetOutput.quantity).toBe((previousBalance?.quantity ?? 0) + input.quantity);
});

test("A conta para Depósito deve existir", async () => {
    const input = {
        accountId: crypto.randomUUID(),
        assetId: "BTC",
        quantity: 1
    }

    const response = await axios.post(`${apiBaseUrl}/deposit`, input);
    expect(response.status).toBe(400);
});

test("AssetId deve ser BTC ou USD ao depositar.", async () => {
    const input = {
        accountId: 'ec249732-442e-449b-891a-c742e2c18e42',
        assetId: "ETH",
        quantity: 1
    }

    const response = await axios.post(`${apiBaseUrl}/deposit`, input);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe("Asset must be USD or BTC.");
})

test("A quantidade deve ser maior que zero ao depositar.", async () => {
    const input = {
        accountId: 'ec249732-442e-449b-891a-c742e2c18e42',
        assetId: "USD",
        quantity: 0
    }

    const response = await axios.post(`${apiBaseUrl}/deposit`, input);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe("Quantity must be greater than Zero.")
});

test("A conta para Saque deve existir", async () => {
    const input = {
        accountId: "ec249732-442e-449b-891a-c742e2c18e42",
        assetId: "BTC",
        quantity: 1
    }
    let balanceResponse = await axios.get(`${apiBaseUrl}/account/${input.accountId}/balance/${input.assetId}`);
    const previousBalance = balanceResponse.data;

    const withDrawResponse = await axios.post(`${apiBaseUrl}/withdraw`, input);
    expect(withDrawResponse.status).toBe(200);

    balanceResponse = await axios.get(`${apiBaseUrl}/account/${input.accountId}/balance/${input.assetId}`);
    const updatedBalance = balanceResponse.data;

    expect(updatedBalance.quantity).toBe(previousBalance.quantity - input.quantity)
})

test("O assetId permitido é BTC ou USD", async () => {
    const input = {
        accountId: "ec249732-442e-449b-891a-c742e2c18e42",
        assetId: "ETH",
        quantity: 1
    }

    const response = await axios.post(`${apiBaseUrl}/withdraw`, input);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe("Asset must be USD or BTC.");    
});

test("A quantidade deve ser menor ou igual ao saldo", async () => {
    const input = {
        accountId: "ec249732-442e-449b-891a-c742e2c18e42",
        assetId: "BTC",
        quantity: 10000
    }
    
    const response = await axios.post(`${apiBaseUrl}/withdraw`, input);
    expect(response.status).toBe(400);
    expect(response.data.message).toBe("Quantity must be less or equal than balance.");
});