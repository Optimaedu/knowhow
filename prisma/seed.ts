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
            role: 'admin'
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
                userId: admin.id
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
                userId: admin.id
            },
            {
              title: 'Case Insensitive String Comparison',
              description: 'Write a function that compares two strings case-insensitively.',
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
    userId: admin.id
},
{
    title: 'Alternate Case String',
    description: 'Write a function that transforms a string by alternating uppercase and lowercase letters, starting with uppercase.',
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
  userId: admin.id
},
{
  title: 'Capitalize Names',
  description: 'Write a function that takes a string as an argument and returns a new string where the first letter of each word is capitalized, and the rest of the letters in each word remain lowercase.',
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
  userId: admin.id
},
{
    title: 'Calculate Average',
    description: 'Write a function that takes an array of numbers and calculates the average of the elements in the array.',
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
  ]);`,
  userId: admin.id
}
  ]
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