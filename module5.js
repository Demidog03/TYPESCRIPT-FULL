"use strict";
/**ADVANCED TYPING CONCEPTS*/
/**INTERSECTION TYPES*/
// type Admin = {
//   name: string
//   privileges: string[]
// }
//
// type Employee = {
//   name: string
//   startDate: Date
// }
//
// type ElevatedEmployee = Admin & Employee // similar to interface inheritance
// // intersection is also works for Interfaces
//
// const el: ElevatedEmployee = {
//   name: 'Max',
//   privileges: ['create-server'],
//   startDate: new Date()
// }
//
// console.log(el)
//
// type Combinable = string | number
// type Numeric = number | boolean
// type Universal = Combinable & Numeric
/**TYPE GUARDS*/
// type Combinable = string | number
// type Numeric = number | boolean
// type Universal = Combinable & Numeric
//
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === 'string' || typeof b === 'string') { //type guard using "typeof"
//     return a.toString() + b.toString()
//   }
//   return a + b
// }
//
// type Admin = {
//   name: string
//   privileges: string[]
// }
// type Employee = {
//   name: string
//   startDate: Date
// }
// type ElevatedEmployee = Admin & Employee
// type UnknownEmployee = Employee | Admin
//
// const e1: ElevatedEmployee = {
//   name: 'Max',
//   privileges: ['create-server'],
//   startDate: new Date()
// }
//
// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log('Name: ' + emp.name)
//   if ('privileges' in emp) { // type guard of intersection interfaces
//     console.log('Privileges: ' + emp.privileges)
//   }
//   if ('startDate' in emp) { // type guard of intersection interfaces
//     console.log('StartDate: ' + emp.startDate)
//   }
// }
// printEmployeeInformation(e1)
//
// const e2: Employee = {
//   name: 'Daniel',
//   startDate: new Date()
// }
// printEmployeeInformation(e2)
//
// // Class type guard
// class Car {
//   drive() {
//     console.log('Driving...')
//   }
// }
// class Truck {
//   drive() {
//     console.log('Driving a truck...')
//   }
//   loadCargo(amount: number) {
//     console.log('Loading cargo ...' + amount)
//   }
// }
//
// type Vehicle = Car | Truck // type of classes
//
// const v1 = new Car()
// const v2 = new Truck()
//
// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive() // ok, because it exists in both classes
//   // vehicle.loadCargo(1000) //error
//   // if('loadCargo' in vehicle) {
//   //   vehicle.loadCargo(1000)
//   // }
//
//   // it is ok, but there is elegant alternative way using "instanceof"
//   if(vehicle instanceof Truck) { // works only for classes
//     vehicle.loadCargo(1000)
//   }
// }
//
// useVehicle(v1)
// useVehicle(v2)
/**DISCRIMINATED UNIONS*/
// interface Bird {
//   type: 'bird'
//   flyingSpeed: number
// }
// interface Horse {
//   type: 'horse'
//   runningSpeed: number
// }
//
// type Animal = Bird | Horse
//
// function moveAnimal(animal: Animal) {
//   // if ('flyingSpeed' in animal) {
//   //   console.log('Moving with speed: ' + animal.flyingSpeed)
//   // } //this will work but there is an alternative way
//   let speed: number
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed
//       break
//     case 'horse':
//       speed = animal.runningSpeed
//       break
//   }
//
//   console.log('Moving with speed: ' + speed)
// }
//
// moveAnimal({type: 'bird', flyingSpeed: 50})
/**TYPE CASTING*/
// // const paragraph = document.querySelector("p") // type is "HTMLParagraphElement" or null
// // const paragraph = document.getElementById("message-output") // type is "HTMLElement" or null
// // const userInput = document.getElementById("user-input")! // type is "HTMLElement" or null
// // const userInput = <HTMLInputElement>document.getElementById("user-input")! //first approach
// const userInput = document.getElementById("user-input")! as HTMLInputElement //second approach
//
// //userInput.value = 'Hi there' //error because ts is not sure that this is the input element
// userInput.value = 'Hi there' //now it is ok
//
// //if userInput could be null
// const userInput2 = document.getElementById("user-input") //we should remove type casting because types casting means that it cannot be null
// if(userInput2){
//   (userInput2 as HTMLInputElement).value = 'Hi there'
// }
/**INDEX PROPERTIES*/
// interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character!' }
//   // id: string // cannot set "id: number" because we restricted type of the values to string
//   [prop: string]: string
//   // [prop: number]: string // it is ok but we cannot write key of string, only number like: 1: 'Not a valid email'
// }
//
// const errorBag: ErrorContainer = {
//   email: 'Not a valid email',
//   username: 'Must start with a capital character' // keys and values size is not limited
// }
/**FUNCTION OVERLOADS*/
// type Combinable = string | number
// type Numeric = number | boolean
// type Universal = Combinable & Numeric
//
// // function add(a: Combinable, b: Combinable) { // return type is type of Combinable (string or number)
// //   // technically it is true, but depending on params return type will vary
// //   if (typeof a === 'string' || typeof b === 'string') {
// //     return a.toString() + b.toString()
// //   }
// //   return a + b
// // }
//
// // const result = add(1, 3) // type is "string | number"
// // const result = add('Max', 'Daniel') // type is "string | number"
// // result.split() //cannot call split because type is Combinable
//
// // // Possible solution, we can use type casting
// // const result = add('Max', 'Daniel') as string // type is "string"
// // result.split(' ') // now split is callable
//
// // Better solution: using function overloads
// function add(a: number, b: number): number
// function add(a: string, b: string): string
// function add(a: string, b: number): string
// function add(a: number, b: string): string
// function add(a: Combinable, b: Combinable) { // return type is type of Combinable (string or number)
//                                              // technically it is true, but depending on params return type will vary
//   if (typeof a === 'string' || typeof b === 'string') {
//     return a.toString() + b.toString()
//   }
//   return a + b
// }
//
// const result = add('5', '5') // type is "string"
// const result2 = add('5', 5) // type is "string"
// const result3 = add(5, '5') // type is "string"
// const result4 = add(5, 5) // type is "number"
// result.split(' ')
/**OPTIONAL CHAINING*/
// const fetchedUserData = {
//   id: 'u1',
//   name: 'Max',
//   job: { title: 'CEO', description: 'My own company'}
// }
//
// // console.log(fetchedUserData.job.title) // if from backend we are not getting job info there will be an error
// // console.log(fetchedUserData.job && fetchedUserData.job.title) // js solution for this situations, not ts
// console.log(fetchedUserData?.job?.title) // ts solution for this situations
/**Nullish Coalescing*/
// // // const userInput = null // if it is null it is ok, but
// // const userInput = '' // what if there is empty string, it would be falsy value, means that storedData value will be "DEFAULT", however we want just empty string
// // const storedData = userInput || 'DEFAULT'
// // console.log(storedData)
//
// // Solution
// const userInput = ''
// const storedData = userInput ?? 'DEFAULT' // now we are not avoiding empty string, avoiding just null and undefined
// console.log(storedData)
//# sourceMappingURL=module5.js.map