import { sum } from "../src/sum";

test("Deve Somar dois números", () => {
    var result = sum(2, 2);
    expect(result).toBe(4);
})