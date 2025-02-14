export function expect<T extends Comparable>(received: T) {
    return {
        toBe: (expected: T) => {
            if (received !== expected) {
                throw new Error(`Expected ${expected} but received ${received}`);
            }
            return true;
        },
        toEqual: (expected: T) => {
            const receivedStr = JSON.stringify(received);
            const expectedStr = JSON.stringify(expected);
            if (receivedStr !== expectedStr) {
                throw new Error(`Expected ${expectedStr} but received ${receivedStr}`);
            }
            return true;
        }
    };
}

export function describe(description: string, testCases: TestCase[]): TestResult[] {
    const result = testCases.map((testCase) => {
        try {
            testCase.fn();
            return {
                description: testCase.description,
                passed: true,
            };
        } catch (error) {
            return {
                description: testCase.description,
                passed: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    });
    console.log(result)
    return result;
}

export function test(description: string, fn: () => void): TestCase {
    return { description, fn };
}