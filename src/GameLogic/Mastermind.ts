
export type colors = 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'black';
export const colorOptions: colors[] = ['red', 'yellow', 'green', 'blue', 'purple', 'black'];

export interface GradeResult {
    correctColorCorrectPos: number;
    correctColorWrongPos: number;
}
    
export class Mastermind {
    code: colors[];
    attempts: colors[][];
    gradeResults: GradeResult[];
    currAttempt: (colors | null)[];
    attemptLimit: number = 12;

    gameOver: boolean = false;
    isWin: boolean = false;

    updateFn: () => void;

    constructor(updateFn: () => void) {
        this.code = Array.from({ length: 4 }, () => 1)
            .map(() => colorOptions[Math.floor(Math.random() * colorOptions.length)]);
        this.attempts = [];
        this.gradeResults = [];
        this.currAttempt = Array<colors | null>(4).fill(null);
        this.updateFn = updateFn;
    }

    grade(attempt: colors[], code: colors[]): GradeResult {
        const used = Array.from({ length: 4 }, () => false);
        const result: GradeResult = { correctColorCorrectPos: 0, correctColorWrongPos: 0 };
        
        for (let i = 0; i < attempt.length; i++) {
            if (attempt[i] == code[i]) {
                used[i] = true;
                result.correctColorCorrectPos++;
            }
        }

        for (let i = 0; i < attempt.length; i++) {
            if (attempt[i] == code[i]) continue;
            for (let j = 0; j < attempt.length; j++) {
                if (used[j]) continue;
                if (attempt[i] == code[j]) {
                    result.correctColorWrongPos++;
                    used[j] = true;
                }
            }
        }

        return result;
    }

    addColor(color: colors) {
        const emptyIdx = this.currAttempt.findIndex(v => v == null);
        if (emptyIdx == -1) return;
        this.currAttempt[emptyIdx] = color;
        this.updateFn();
    }

    addColorIdx(i: number, color: colors) {
        this.currAttempt[i] = color;
        this.updateFn();
    }

    popColor(i: number) {
        this.currAttempt[i] = null;
        this.updateFn();
    }

    clearCurrAttempt() {
        this.currAttempt = Array<colors | null>(4).fill(null);
        this.updateFn();
    }

    // all colors must be filled.
    submit() {
        if (this.gameOver) return;
        if (this.currAttempt.findIndex(v => v == null) != -1) return;

        const result = this.grade(this.currAttempt as colors[], this.code);
        this.attempts.push(structuredClone(this.currAttempt) as colors[]);
        this.gradeResults.push(result);

        if (result.correctColorCorrectPos == 4) {
            this.gameOver = true;
            this.isWin = true;
        } else if (this.attempts.length == this.attemptLimit) {
            this.gameOver = true;
            this.isWin = false;
        }

        this.currAttempt = Array(4).fill(null);

        this.updateFn();  
    }
}