import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'email@gmail.com' },
    update: {},
    create: {
      id: '1',
      email: 'email@gmail.com',
      name: 'Admin',
      emailVerified: true,
      role: 'admin',
    },
  })

  await prisma.challenge.createMany({
    data: [
      {
        title: 'Hello World',
        description: 'Write a function that returns the string "Hello World".',
        level: 0,
        boilerplate: `function sayHello() {\n  // Your code here\n}`,
        tips: `1. Use the return keyword to return a string
2. Make sure to use the exact string "Hello World"`,
        tests: `describe('sayHello', [
  test('Should return Hello World', () => {
    expect(sayHello()).toBe('Hello World')
  })
])`,
        userId: admin.id,
      },
      {
        title: 'Reverse String',
        description: 'Write a function that reverses a string.',
        level: 0,
        boilerplate: `function reverseString(str) {\n  // Your code here\n}`,
        tips: `1. You can convert a string to an array of characters using split('')
2. Arrays have methods that can help reverse elements
3. Remember to join the characters back into a string`,
        tests: `describe('reverse', [
  test('Reverse a simple string', () => {
    expect(reverseString('hello')).toBe('olleh')
  }),
  test('Handle empty string', () => {
    expect(reverseString('')).toBe('')
  }),
  test('Handle single character', () => {
    expect(reverseString('a')).toBe('a')
  })
])`,
        userId: admin.id,
      },
      {
        title: 'Case Insensitive String Comparison',
        description:
          'Write a function that compares two strings case-insensitively.',
        level: 1,
        boilerplate: `function compareStringsIgnoreCase(str1, str2) {\n  // Your code here\n}`,
        tips: `1. Convert both strings to the same case before comparison
2. JavaScript provides a method to change the case of a string
3. The strict equality operator (===) can be used for comparison`,
        tests: `describe('compareStringsIgnoreCase', [
  test('Compare same words with different cases', () => {
    expect(compareStringsIgnoreCase('hello', 'HELLO')).toBe(true);
  }),
  test('Different words should return false', () => {
    expect(compareStringsIgnoreCase('JavaScript', 'Python')).toBe(false);
  }),
  test('Generated random test', () => {
    function getRandomString() {
      const chars = 'abcdefghijklmnopqrstuvxyz12345667890';
      let str = '';
      for(let i = 0; i < 10; i++) {
        str += Math.random() < 0.5 ? chars[Math.floor(chars.length * Math.random())] : chars[Math.floor(chars.length * Math.random())].toUpperCase();
      }
      return str;
    }
    
    const randomString = getRandomString();
    expect(compareStringsIgnoreCase(randomString, randomString.toLowerCase())).toBe(true);
  })
])`,
        userId: admin.id,
      },
      {
        title: 'Alternate Case String',
        description:
          'Write a function that transforms a string by alternating uppercase and lowercase letters, starting with uppercase.',
        level: 2,
        boilerplate: `function alternateCase(str) {\n  // Your code here\n}`,
        tips: `1. Iterate over the string and modify each character based on its index.
  2. Use JavaScript methods to convert characters to uppercase or lowercase.
  3. Consider handling spaces and special characters appropriately.`,
        tests: `describe('alternateCase', [
    test('Transform a simple word', () => {
      expect(alternateCase('javascript')).toBe('JaVaScRiPt');
    }),
    test('Handle spaces and special characters', () => {
      expect(alternateCase('Hello world!')).toBe('HeLlO WoRlD!');
    })
  ])`,
        userId: admin.id,
      },
      {
        title: 'Capitalize Names',
        description:
          'Write a function that takes a string as an argument and returns a new string where the first letter of each word is capitalized, and the rest of the letters in each word remain lowercase.',
        level: 1,
        boilerplate: `function capitalizeNames(text) {\n  // Your code here\n}`,
        tips: `1. Split the text into words.
  2. Capitalize the first letter of each word.
  3. Keep the other letters of each word in lowercase.
  4. Join the words back into a single string.`,
        tests: `describe('capitalizeNames', [
    test('Capitalize the first letter of each word', () => {
      expect(capitalizeNames('anna andersson')).toBe('Anna Andersson');
    }),

    test('Capitalize the first letter of each word with mixed case', () => {
      expect(capitalizeNames('johan svensson')).toBe('Johan Svensson');
    })
  ])`,
        userId: admin.id,
      },
      {
        title: 'Calculate Average',
        description:
          'Write a function that takes an array of numbers and calculates the average of the elements in the array.',
        level: 1,
        boilerplate: `function calculateAverage(numbers) {\n  // Your code here\n}`,
        tips: `1. Use the reduce method to sum the elements in the array.
  2. Divide the sum by the length of the array to get the average.
  3. Handle edge cases, such as an empty array, appropriately.`,
        tests: `describe('calculateAverage', [
    test('Calculate average of [2, 4, 6, 8]', () => {
      expect(calculateAverage([2, 4, 6, 8])).toBe(5);
    }),

    test('Randomized test', () => {
      function generateRandomArray() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
          arr.push(Math.floor(Math.random() * 100));
        }
        return arr;
      }

      function expectedAverage(arr) {
        return arr.reduce((acc, val) => acc + val, 0) / arr.length;
      }

      const randomArr = generateRandomArray();
      expect(calculateAverage(randomArr)).toBe(expectedAverage(randomArr));
    })
  ])`,
        userId: admin.id,
      },
      {
        title: 'Second Largest Number',
        description:
          'Write a function that returns the second largest number in an array of numbers.',
        level: 1,
        boilerplate: `function secondLargest(numbers) {\n  // Your code here\n}`,
        tips: `1. Consider sorting the array first
2. Remember that arrays might contain duplicate numbers`,
        tests: `describe('secondLargest', [
  test('Find second largest in simple array', () => {
    expect(secondLargest([20, 5, 8, 10])).toBe(10)
  }),
  test('Handle array with duplicates', () => {
    expect(secondLargest([20, 20, 8, 10])).toBe(10)
  }),
  test('Array with negative numbers', () => {
    expect(secondLargest([-5, -2, -10, -1])).toBe(-2)
  }),
])`,
        userId: admin.id,
      },
      {
        title: 'Remove Duplicates',
        description:
          'Write a function that takes an array as an argument and returns a new array where all duplicates have been removed, so that each element only appears once. For example, if the input is [1,2,2,3,4,4,5], the function should return [1,2,3,4,5].',
        level: 0,
        boilerplate: `function removeDuplicates(arr) {\n  // Your code here\n}`,
        tips: `1. Consider using Set to remove duplicates
2. Alternatively, you can use array methods like filter`,
        tests: `describe('removeDuplicates', [
  test('Remove duplicates from number array', () => {
    expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5])
  }),
  test('Handle array with no duplicates', () => {
    expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3])
  }),
  test('Handle empty array', () => {
    expect(removeDuplicates([])).toEqual([])
  }),
  test('Handle array with all duplicates', () => {
    expect(removeDuplicates([1, 1, 1, 1])).toEqual([1])
  })
])`,
        userId: admin.id,
      },
      {
        title: 'Find Missing Number',
        description:
          'Write a function that takes an array of integers in ascending order and finds the missing number in the sequence. For example, if the array is [1,2,3,5], the function should return 4.',
        level: 1,
        boilerplate: `function findMissingNumber(numbers) {\n  // Your code here\n}`,
        tips: `1. Consider that the numbers are in ascending order
2. You can assume the first and last numbers are not missing`,
        tests: `describe('findMissingNumber', [
  test('Find missing number in simple sequence', () => {
    expect(findMissingNumber([1, 2, 3, 5])).toBe(4)
  }),
  test('Find missing number in larger sequence', () => {
    expect(findMissingNumber([1, 2, 3, 4, 5, 6, 8, 9])).toBe(7)
  }),
  test('Find missing number with negative values', () => {
    expect(findMissingNumber([-3, -2, -1, 1])).toBe(0)
  }),
  test('Find missing number in small sequence', () => {
    expect(findMissingNumber([1, 3])).toBe(2)
  })
])`,
        userId: admin.id,
      },
      {
        title: 'Anagram Checker',
        description:
          'Write a function that takes two strings as arguments and determines if they are anagrams. Two strings are anagrams if they contain the same letters in the same quantity but in a different order. For example, "listen" and "silent" are anagrams. But "Hello" and "World" is not.',
        level: 1,
        boilerplate: `function areAnagrams(str1, str2) {\n  // Your code here\n}`,
        tips: `1. Consider converting strings to lowercase to make comparison case-insensitive
2. Try sorting the characters of both strings
3. Remember to handle spaces and special characters`,
        tests: `describe('areAnagrams', [
  test('Basic anagram test', () => {
    expect(areAnagrams('listen', 'silent')).toBe(true)
  }),
  test('Non-anagram test', () => {
    expect(areAnagrams('hello', 'world')).toBe(false)
  }),
  test('Different length strings', () => {
    expect(areAnagrams('hello', 'world!')).toBe(false)
  }),
  test('Case insensitive test', () => {
    expect(areAnagrams('Debit', 'Bited')).toBe(true)
  })
])`,
        userId: admin.id,
      },
      {
        title: 'Fibonacci sequence',
        description:
          'Write a function that takes an integer and returns an array of as many numbers from the Fibonacci sequence.',
        level: 1,
        boilerplate: `function fibonacciSequence(count) {\n  // Your code here\n}`,
        tips: `1. Start with an array containing the first two numbers: [0, 1]
2. Use a loop to generate the next number by adding the last two numbers in the array`,
        tests: `describe('fibonacciSequence', [
  test('Generate first 5 Fibonacci numbers', () => {
    expect(fibonacciSequence(5)).toEqual([0, 1, 1, 2, 3]);
  }),
  test('Generate first 3 Fibonacci numbers', () => {
    expect(fibonacciSequence(3)).toEqual([0, 1, 1]);
  }),
  test('Generate no Fibonacci numbers', () => {
    expect(fibonacciSequence(0)).toEqual([]);
  }),
  test('Generate first 1 Fibonacci number', () => {
    expect(fibonacciSequence(1)).toEqual([0]);
  })
])
`,
        userId: admin.id,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
