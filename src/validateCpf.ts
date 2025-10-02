export function validateCpf (cpf: string) {
	if (!cpf) return false;
    cpf = cleanCpf(cpf);
    if (cpf.length !== 11) return false;
    if (allDigitsAreEqual(cpf)) return false;

    const digit1 = calculateDigit(cpf, 10);
    const digit2 = calculateDigit(cpf, 11);
    return getVerificatorDigit(cpf) == `${digit1}${digit2}`;
}

function cleanCpf(cpf: string): string {
    return cpf.replace(/[^\d]+/g,'');
}

function allDigitsAreEqual(cpf: string) {
    return cpf.split("").every(c => c === cpf[0]);
}

function calculateDigit(cpf: string, factor: number){
    let total = 0;
    for(const digit of cpf){
        if(factor > 1) total += parseInt(digit) * factor; factor--;
    }
    return total % 11 < 2 ? 0 : 11 - (total%11)
}

const getVerificatorDigit = (cpf: string) => cpf.slice(9);