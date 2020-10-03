import { StrengthPipe } from "./strength.pipe";

describe('strength pipe', () => {
    it('should return weak if strength < 10', () => {
        let pipe = new StrengthPipe();
        let strengthVal = 5;

        expect(pipe.transform(strengthVal)).toBe(`${strengthVal} (weak)`)
    })

    it('should return strong if strength > 10', () => {
        let pipe = new StrengthPipe();
        let strengthVal = 12;

        expect(pipe.transform(strengthVal)).toBe(`${strengthVal} (strong)`)
    })

    it('should return strong if strength > 20', () => {
        let pipe = new StrengthPipe();
        let strengthVal = 25;

        expect(pipe.transform(strengthVal)).toBe(`${strengthVal} (unbelievable)`)
    })
})