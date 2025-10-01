import { validateCpf } from "../src/validateCpf_";

test("Deve retornar true para cpf válido com pontuação", () => {
    const result = validateCpf("137.517.420-77");
    expect(result).toBeTruthy();
});

test("Deve retornar true para cpf válido sem pontuação", () => {
    const result = validateCpf("13751742077");
    expect(result).toBeTruthy();
})

test("Deve retornar false para cpf inválido sem pontuação", () => {
    const result = validateCpf("13751742078");
    expect(result).toBeFalsy();
})

test("Deve retornar false para cpf inválido com pontuação", () => {
    const result = validateCpf("137.517.420-78");
    expect(result).toBeFalsy();
})

test("Deve retornar true para cpf válido com final 0", () => {
    const result = validateCpf("851.750.060-10");
    expect(result).toBeTruthy();
})

test("Deve retornar false para cpf com todos os dígitos iguais", () => {
    const result = validateCpf("111.111.111-11");
    expect(result).toBeFalsy();
});

test("Deve retornar false para cpf com quantidade de dígitos maior", () => {
    const result = validateCpf("137.517.420-772");
    expect(result).toBeFalsy();
});

test("Deve retornar false para cpf com quantidade de dígitos menor", () => {
    const result = validateCpf("137.517.420");
    expect(result).toBeFalsy();
});

test("Deve retornar false para cpf vazio", () => {
    const result = validateCpf("");
    expect(result).toBeFalsy();
});

test("Deve retornar false para cpf null", () => {
    const result = validateCpf(null!);
    expect(result).toBeFalsy();
});

test("Deve retornar false para cpf undefined", () => {
    const result = validateCpf(undefined!);
    expect(result).toBeFalsy();
});