"use strict";
// NUMBERS, STRINGS AND BOOLEANS
// function add(num1: number, num2: number) {
//   return num1 + num2
// }
//
// const number1 = 5
// const number2 = 2.8
//
// const result = add(number1, number2)
// console.log(result)
/**ONLY TS TYPES*/
/**1. TUPLES - fixed length array*/
// const person: {
//   name: string
//   age: number
//   hobbies: string[]
//   role: [number, string] //tuple type
// } = {
//   name: 'Olzhas',
//   age: 20,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author'] //should have exact 2 elements
// }
//
// person.role.push('admin')//typescript cannot catch push, so push is exceptional
//
// person.role[1] = 10 //it is ok, despite the second element is string in initial array
// //because "role: (string | number)[]" means array could contain both string or number
//
// person.role[1] = 10 //after tuple type the structure of an array changes, so second element should be string
// person.role = [0, 'admin', 'user'] //only 2 elements will be accepted
/**ENUMS*/
// 1
// const person = {
//   name: 'Olzhas',
//   age: 20,
//   hobbies: ['Sports', 'Cooking'],
//   role: 'READ ONLY ADMIN'
// }
//
// if(person.role === "READ-ONLY-ADMIN"){
//   console.log('read only admin') //strings mismatch when checking
// }
// 2
// const ADMIN = 'ADMIN' //possible solution to avoid mismatching
// const READ_ONLY = 'READ_ONLY'
// const AUTHOR = 'AUTHOR'
// const person = {
//   name: 'Olzhas',
//   age: 20,
//   hobbies: ['Sports', 'Cooking'],
//   role: ADMIN
// }
//
// if(person.role === ADMIN){
//   console.log('read only admin') //now it works
// }
// 3
//BUT ENUMS ARE BETTER SOLUTION - managing constant variables
// enum Role {
//   ADMIN,
//   READ_ONLY,
//   AUTHOR
// } //by default values are indexes (0, 1, 2)
// enum Role {
//   ADMIN = 5,
//   READ_ONLY,
//   AUTHOR
// } //when index of first element changes other enums values also change (5, 6, 7)
// enum Role {
//   ADMIN = "ADMIN",
//   READ_ONLY = "READ_ONLY",
//   AUTHOR = "AUTHOR"
// } //text is also allowed
//
// const person = {
//   name: 'Olzhas',
//   age: 20,
//   hobbies: ['Sports', 'Cooking'],
//   role: Role.ADMIN
// }
//
// if(person.role === Role.ADMIN){
//   console.log('read only admin') //now it works
// }
/**ANY*/
// let favouriteActivities: any
// favouriteActivities = ['Sports']
// let favouriteActivities: any[]
// favouriteActivities = 5 //error: any values but should be an array
/**UNION*/
// function add(n1: number, n2: number) {
//   return n1 + n2
// }
//
// //should be more flexible, can accept number and strings
// function combine(input1: number | string, input2: number | string) {
//   if(typeof input1 === 'number' && typeof input2 === 'number'){
//     return input1 + input1
//   }
//   else{
//     return input1.toString() + input2.toString()
//   }
// }
//
// const combinedAges = combine(30, 26)
// const combinedNames = combine("Daniel", "Max")
//
// console.log(combinedAges)
// console.log(combinedNames)
/**LITERAL TYPES*/
// const number1 = 2.8 //type is not number, type is 2.8, because of const declaration
// let number2 = 2.8 //if variable declared with let, type is number not literal typed
// 1
// function combine(input1: number | string, input2: number | string, resultConversion: string) {
//   let result: number | string
//
//   if(typeof input1 === 'number' && typeof input2 === 'number'){
//     result = input1 + input1
//   }
//   else{
//     result = input1.toString() + input2.toString()
//   }
//
//   if(resultConversion === 'as-number'){
//     return +result
//   }
//   else{
//     return result.toString()
//   }
// }
//
// const combinedAges = combine(30, 26, 'as-number')
// const combinedStringAges = combine("30", "26", 'as-number')
// const combinedNames = combine("Daniel", "Max", 'as-text')
//
// console.log(combinedAges)
// console.log(combinedStringAges)
// console.log(combinedNames)
// 2 - second approach
// function combine(input1: number | string, input2: number | string, resultConversion: "as-number" | "as-text") {
//   //resultConversion: "as-number" | "as-text" with union (could improve with
//   let result: number | string
//
//   //??LOGIC MISMATCH
//   if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === "as-number"){
//     result = +input1 + +input2
//   }
//   else{
//     result = input1.toString() + input2.toString()
//   }
//
//   if(resultConversion === 'as-number'){
//     return +result
//   }
//   else{
//     return result.toString()
//   }
// }
//
// const combinedAges = combine(30, 26, 'as-number')
// const combinedStringAges = combine("30", "26", 'as-number')
// const combinedNames = combine("Daniel", "Max", 'as-text')
//
// console.log(combinedAges)
// console.log(combinedStringAges)
// console.log(combinedNames)
/**CUSTOM TYPES*/
// type Combinable = number | string
// type ConversionDescriptor = "as-number" | "as-text"
// function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) {
//   let result: number | string
//
//   //??LOGIC MISMATCH
//   if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === "as-number"){
//     result = +input1 + +input2
//   }
//   else{
//     result = input1.toString() + input2.toString()
//   }
//
//   if(resultConversion === 'as-number'){
//     return +result
//   }
//   else{
//     return result.toString()
//   }
// }
//
// const combinedAges = combine(30, 26, 'as-number')
// const combinedStringAges = combine("30", "26", 'as-number')
// const combinedNames = combine("Daniel", "Max", 'as-text')
//
// console.log(combinedAges)
// console.log(combinedStringAges)
// console.log(combinedNames)
/**RETURN TYPES (FUNCTION)*/
// function add(n1: number, n2: number): number {
//   return n1 + n2
// }
//VOID
// function printResult(num: number): void {
//   console.log('Result: ' + num)
// } //technically it returns undefined
//
// function printResult2(num: number): undefined {
//   console.log('Result: ' + num)
//   return
// } //if there is no return undefined is not allowed, however if return only it is allowed
//
// printResult(add(5, 12))
//
// console.log(printResult(add(5, 12))) //undefined
// //because of function does not return anything undefined returned
/**FUNCTION AS A TYPE*/
// function add(n1: number, n2: number): number {
//   return n1 + n2
// }
//
// function printResult(num: number): void {
//   console.log('Result: ' + num)
// }
//
// printResult(add(5, 12))
//
// //"Function" type
// // let combineValues: Function;
// // combineValues = add
// //
// // console.log(combineValues(8, 8))
//
// //Function types
// let combineValues: (a: number, b: number) => number; //not arrow function, but type
// combineValues = add
// //combineValues = printResult() //reveals error because type mismatch
//
// console.log(combineValues(8, 8))
/**CALLBACK TYPES*/
// function add(n1: number, n2: number): number {
//   return n1 + n2
// }
//
// function printResult(num: number): void {
//   console.log('Result: ' + num)
// }
//
// function addAndHandle(n1: number, n2: number, cb: (num: number) => void){
//   const result = n1 + n2
//   cb(result)
// }
//
// printResult(add(5, 12))
//
// addAndHandle(10, 20, (result) => {
//   console.log(result)
//   return result //not an error or bug despite return type is void
//   //"void" does not mean that function is not allowed to return something, it means that anything function might return can not be used
// })
// //or
// addAndHandle(10, 20, printResult)
/**UNKNOWN TYPE*/
// let userInput: unknown
// //similar to any or undefined
// let userName: string
// userInput = 5
// userInput = "Max"
// //userName = userInput //getting error
// //if there is any type, all type checking will be turned off
// //but unknown is restrictive
// //unknown is better than any
// //to avoid error it is needed additional type checking
// if(typeof userInput === 'string'){
//   userName = userInput
// }
/**NEVER TYPE*/
// function generateError(message: string, code: number): never{
//   throw {message, errorCode: code}
//   //return //after throwing error next code is unreachable
//   //while(true){} //also never
// }
//
// const result = generateError('An error occurred', 500)
// console.log(result)
//
// //in case of void there will be undefined
// //but "never" means that function actually does not return anything
//# sourceMappingURL=module1.js.map