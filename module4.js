"use strict";
/** INTERFACES */
// interface Person {
//   name: string
//   age: number
//
//   greet(phrase: string): void
//   // greet: (args: string) => void
// }
//
// let user1: Person;
// user1 = {
//   name: 'Max',
//   age: 30,
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name)
//   }
// }
//
// user1.greet('Hi, I am')
/**INTERFACES WITH CLASSES*/
// // types and interfaces are very similar
// // however in case of types, inside the type it is possible to store other things like, union types
// // it seems like types are mote flexible, but interfaces are clearer in case of structure
// // Interfaces could be implemented to classes
//
// interface Greetable {
//   name: string
//   greet(phrase: string): void
// }
//
// class Person implements Greetable{
//   constructor(public name: string) { // public age: string other fields also could be created beside interface fields
//   }
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name)
//   }
// }
//
// // let user1: Greetable;
// // user1 = {
// //   name: 'Max',
// //   greet(phrase: string) {
// //     console.log(phrase + ' ' + this.name)
// //   }
// // }
// // user1.greet('Hi, I am')
//
// const user1 = new Person('Max')
// user1.greet('Hello, I am')
/**READONLY*/
// interface Greetable {
//   readonly name: string
//   greet(phrase: string): void
// }
//
// class Person implements Greetable{
//   constructor(readonly name: string) { //also need readonly modifier
//   }
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name)
//   }
// }
//
// const user1 = new Person('Max')
// // user1.name = 'fdsfs' //error
// user1.greet('Hello, I am')
/**INHERITANCE OF INTERFACES*/ //MERGING THE INTERFACES
// interface Named {
//   readonly name: string
// }
// interface Greetable extends Named{
//   greet(phrase: string): void
// }
//
// class Person implements Greetable{
//   constructor(readonly name: string) {
//   }
//   greet(phrase: string) {
//     console.log(phrase + ' ' + this.name)
//   }
// }
//
// const user1 = new Person('Max')
// user1.greet('Hello, I am')
/**INTERFACES AS A FUNCTION TYPES*/
// // type AddFn = (a :number, b: number) => number
// interface AddFn {
//   (a: number, b: number): number // anonymous function
// }
// let add: AddFn
// add = (n1, n2) => {
//   return n1 + n2
// }
/**OPTIONAL PARAMETERS AND PROPERTIES*/
// interface Named {
//   readonly name?: string // optional
//   outputName?: string // optional
// }
// interface Greetable extends Named{
//   greet(phrase: string): void
// }
//
// class Person implements Greetable{
//   constructor(readonly name?: string) { // optional
//     if(name) {
//       this.name = name
//     }
//   }
//   greet(phrase: string) {
//     if(this.name) {
//       console.log(phrase + ' ' + this.name)
//     }
//     else {
//       console.log('Hi') // if there is no name
//     }
//   }
// }
//
// const user1 = new Person() // output: Hello, I am undefined
// user1.greet('Hello, I am')
//# sourceMappingURL=module4.js.map