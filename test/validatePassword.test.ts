import { validatePassword } from "../src/validatePassword"

test("Deve conter maiúsculas", () => {
    expect(validatePassword("senha123")).toBeFalsy()
})

test("Deve conter minúsculas", () => {
    expect(validatePassword("SENHA123")).toBeFalsy()
})

test("Deve conter números", () => {
    expect(validatePassword("SenhaUmDoisTres")).toBeFalsy()
})

test("Deve conter no mínimo 8 caracteres", () => {
    expect(validatePassword("Se123")).toBeFalsy()
})

test("Deve validar maiúsculas, minúsculas e números", () => {
    expect(validatePassword("Senha123")).toBeTruthy()
})