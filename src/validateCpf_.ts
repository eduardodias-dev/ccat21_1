export function validateCpf (cpf: string) {
	if (!cpf) return false;
    cpf = cleanCpf(cpf);
    if (cpf.length !== 11) return false;
    if (allDigitsAreEqual(cpf)) return false;

    let d1, d2;
    let dg1, dg2, rest;
    let digito; 
    let nDigResult;
    d1 = d2 = 0;
    dg1 = dg2 = rest = 0;

    for (let nCount = 1; nCount < cpf.length -1; nCount++) {
        digito = parseInt(cpf.substring(nCount -1, nCount));
        d1 = d1 + ( 11 - nCount ) * digito;
        d2 = d2 + ( 12 - nCount ) * digito;
    };

    rest = (d1 % 11);
    dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;
    d2 += 2 * dg1;
    rest = (d2 % 11);
    if (rest < 2)
        dg2 = 0; 
    else
        dg2 = 11 - rest;
    let nDigVerific = cpf.substring(cpf.length-2, cpf.length);
    nDigResult = "" + dg1 + "" + dg2;
    return nDigVerific == nDigResult;
}

function cleanCpf(cpf: string): string {
    return cpf.replace(/[^\d]+/g,'');
}
function allDigitsAreEqual(cpf: string) {
    return cpf.split("").every(c => c === cpf[0]);
}

/*
    Regra CPF:
    para o digito 1: multiplica os 9 primeiros dígitos por 10,9,8,7,6,5,4,3,2 respectivamente
    para o digito 2: multiplica os 10 primeiros dígitos verificador por 11,10,9,8,7,6,5,4,3,2
    para ambos os dígitos:
    soma os resultados encontra o resto da divisão por 11 se menor que 2 o dígito é 0 senão é 11 - resto
*/