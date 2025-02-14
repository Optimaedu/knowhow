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
        title: 'Second Largest Number',
        description: 'Write a function that returns the second largest number in an array of numbers.',
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
        userId: admin.id
      },
      {
        title: 'Remove Duplicates',
        description: 'Write a function that takes an array as an argument and returns a new array where all duplicates have been removed, so that each element only appears once. For example, if the input is [1,2,2,3,4,4,5], the function should return [1,2,3,4,5].',
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
        userId: admin.id
      },
      {
        title: 'Find Missing Number',
        description: 'Write a function that takes an array of integers in ascending order and finds the missing number in the sequence. For example, if the array is [1,2,3,5], the function should return 4.',
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
        userId: admin.id
      },
      {
        title: 'Anagram Checker',
        description: 'Write a function that takes two strings as arguments and determines if they are anagrams. Two strings are anagrams if they contain the same letters in the same quantity but in a different order. For example, "listen" and "silent" are anagrams. But "Hello" and "World" is not.',
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