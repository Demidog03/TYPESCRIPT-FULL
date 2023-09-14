"use strict";
/**DECORATORS and DECORATOR FACTORIES*/
// function Logger(logString: string) {
//   return function (constructor: Function) {
//     console.log(logString)
//     console.log(constructor)
//   }
// }
//
// // function WithTemplate(template: string, hookId: string){
// //   return function (_: Function){
// //     const hookEl = document.getElementById(hookId)
// //     if(hookEl){
// //       hookEl.innerHTML = template
// //     }
// //   }
// // }
//
// function WithTemplate(template: string, hookId: string){
//   return function (constructor: any){
//     const hookEl = document.getElementById(hookId)
//     const p = new constructor()
//     if(hookEl){
//       hookEl.innerHTML = template
//       document.querySelector("h1")!.innerText = p.name
//     }
//   }
// }
//
// // @Logger('LOGGING - PERSON')
// @WithTemplate('<h1>My Person Object</h1>', 'app')
// class Person {
//   constructor(public name = 'Max') {
//     console.log('Creating person object')
//   }
// }
//
// const pers = new Person()
// console.log(pers)
/**ADDING MULTIPLE DECORATORS*/
// function Logger(logString: string) {
//   console.log('LOGGER FACTORY') // to catch moment of decorator factory rendering
//   return function (constructor: Function) {
//     console.log(logString)
//     console.log(constructor)
//   }
// }
//
// function WithTemplate(template: string, hookId: string){
//   console.log('WITHTEMPLATE FACTORY') // to catch moment of decorator factory rendering
//   return function (constructor: any){
//     console.log('Rendering template') // to catch moment of decorator rendering
//     const hookEl = document.getElementById(hookId)
//     const p = new constructor()
//     if(hookEl){
//       hookEl.innerHTML = template
//       document.querySelector("h1")!.innerText = p.name
//     }
//   }
// }
//
// // Decorators render from bottom to top
// // However decorator factories runs from top to bottom
// @Logger('LOGGING - PERSON')
// @WithTemplate('<h1>My Person Object</h1>', 'app')
// class Person {
//   constructor(public name = 'Max') {
//     console.log('Creating person object')
//   }
// }
//
// const pers = new Person()
// console.log(pers)
/**PROPERTY DECORATOR*/
// function Log(target: any, propertyName: string | Symbol) {
//   // target - prototype of the object
//   // if target is static instance field it will refer to constructor itself
//   console.log('Property decorator')
//   console.log(target, propertyName)
// }
// class Product {
//   @Log
//   title: string
//
//   constructor(title: string, private _price: number) {
//     this.title = title
//   }
//   set price(val: number){
//     if (val > 0) {
//       this._price = val
//     }
//     else {
//       throw new Error('Invalid price - should be positive')
//     }
//   }
//   getPriceWithTax(tax: number){
//     return this._price * (1 + tax)
//   }
// }
/**ACCESSORS and PARAMETER DECORATORS*/
// function Log(target: any, propertyName: string | Symbol) {
//   console.log('Property decorator')
//   console.log(target, propertyName)
// }
// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log('Accessor decorator')
//   console.log(target)
//   console.log(name)
//   console.log(descriptor)
// }
// function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
//   console.log('Method decorator')
//   console.log(target)
//   console.log(name)
//   console.log(descriptor)
// }
// function Log4(target: any, name: string | Symbol, position: number) {
//   console.log('Parameter decorator')
//   console.log(target)
//   console.log(name) // not the name of the parameter, name of the method itself
//   console.log(position)
// }
// class Product {
//   @Log
//   title: string
//
//   constructor(title: string, private _price: number) {
//     this.title = title
//   }
//   @Log2
//   set price(val: number){
//     if (val > 0) {
//       this._price = val
//     }
//     else {
//       throw new Error('Invalid price - should be positive')
//     }
//   }
//   @Log3
//   getPriceWithTax(@Log4 tax: number){
//     return this._price * (1 + tax)
//   }
// }
/**Returning (and changing) a Class in a Class Decorator*/
// function Logger(logString: string) {
//   console.log('LOGGER FACTORY') // to catch moment of decorator factory rendering
//   return function (constructor: Function) {
//     console.log(logString)
//     console.log(constructor)
//   }
// }
// function WithTemplate(template: string, hookId: string){
//   console.log('WITHTEMPLATE FACTORY') // to catch moment of decorator factory rendering
//   return function<T extends {new(...args: any[]): {name: string}}> (originalConstructor: T){
//     return class extends originalConstructor {
//       constructor(..._: any[]) { // instead of ...args use _ to tell ts that we may not use the args
//         super()
//         console.log('Rendering template') // to catch moment of decorator rendering
//         const hookEl = document.getElementById(hookId)
//         // const p = new originalConstructor() // now it is not necessary to call original constructor
//         if(hookEl){
//           hookEl.innerHTML = template
//           document.querySelector("h1")!.innerText = this.name // change p.name to this.name
//         }
//       }
//     } // returning new class (constructor function)
//   }
// }
// // by this we are just expanding our class by adding element into DOM
// // however now it will only work if we create the instance of our class
//
// @Logger('LOGGING - PERSON')
// @WithTemplate('<h1>My Person Object</h1>', 'app')
// class Person {
//   constructor(public name = 'Max') {
//     console.log('Creating person object')
//   }
// }
//
// // const pers = new Person()
// // console.log(pers)
// // if we do not create the instance of the class DOM wont change
// // because only instance creation triggers the DOM manipulation
/**OTHER DECORATOR RETURN TYPES*/
// function Log(target: any, propertyName: string | Symbol) {
//   console.log('Property decorator')
//   console.log(target, propertyName)
// }
// function Log2(target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
//   console.log('Accessor decorator')
//   console.log(target)
//   console.log(name)
//   console.log(descriptor)
//
//   return {}
// }
// function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
//   console.log('Method decorator')
//   console.log(target)
//   console.log(name)
//   console.log(descriptor)
//
//   return {}
// }
// function Log4(target: any, name: string | Symbol, position: number) {
//   console.log('Parameter decorator')
//   console.log(target)
//   console.log(name)
//   console.log(position)
// }
// class Product {
//   @Log
//   title: string
//
//   constructor(title: string, private _price: number) {
//     this.title = title
//   }
//   @Log2
//   set price(val: number){
//     if (val > 0) {
//       this._price = val
//     }
//     else {
//       throw new Error('Invalid price - should be positive')
//     }
//   }
//   @Log3
//   getPriceWithTax(@Log4 tax: number){
//     return this._price * (1 + tax)
//   }
// }
/**Creating an 'Autobind' Decorator*/
// function Autobind(_: any, _2: string | Symbol | number, descriptor: PropertyDescriptor) {
//   const originalMethod = descriptor.value
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     enumerable: false,
//     get() { // getter is an extra layer between our function and object and event listener
//       const boundFn = originalMethod.bind(this) // this of "get" method always refers to the instance of the class
//       return boundFn
//     }
//   }
//   return adjDescriptor
// }
//
// class Printer {
//   constructor(private message: string = 'This works') {
//   }
//   @Autobind
//   showMessage() {
//     console.log(this.message)
//   }
// }
//
// const p = new Printer()
//
// const button = document.querySelector("button")
// if(button){
//   // button.addEventListener('click', p.showMessage) // undefined - when we're referring to the instance method this keyword does not work
//   // possible solution is to use bind method
//   // button.addEventListener('click', p.showMessage.bind(p))
//   // but we can create decorator that will automatically bind the method to instance
//   button.addEventListener('click', p.showMessage)
// }
/**DECORATORS FOR VALIDATION*/
// interface ValidatorConfig {
//   [property: string]: {
//     [validatableProperty: string]: string[] // ['required', 'positive']
//   }
// }
//
// const registerValidators: ValidatorConfig = {}
//
// function Required(target: any, propertyName: string) {
//   registerValidators[target.constructor.name] = { // registerValidators['Course'] = {}
//     ...registerValidators[target.constructor.name],
//     [propertyName]: ['required'] // title: ['required']
//   }
// }
// function PositiveNumber(target: any, propertyName: string) {
//   registerValidators[target.constructor.name] = { // registerValidators['Course'] = {}
//     ...registerValidators[target.constructor.name],
//     [propertyName]: ['positive'] // price: ['positive']
//   }
// }
// function validate(obj: any) {
//   const objValidatorConfig = registerValidators[obj.constructor.name]
//   if(!objValidatorConfig) {
//     return true
//   }
//   let isValid = true
//   for(const prop in objValidatorConfig) {
//     for (const validator of objValidatorConfig[prop]) {
//       switch(validator) {
//         case 'required':
//           isValid = isValid && !!obj[prop]
//           break
//         case 'positive':
//           isValid = isValid && obj[prop] > 0
//           break
//       }
//     }
//   }
//   return isValid
// }
//
//
// class Course {
//   @Required
//   title: string
//   @PositiveNumber
//   price: number
//
//   constructor(title: string, price: number) {
//     this.title = title
//     this.price = price
//   }
// }
//
// const courseForm = document.querySelector("form")
// if(courseForm){
//   courseForm.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const titleEl = document.getElementById("title") as HTMLInputElement
//     const priceEl = document.getElementById("price") as HTMLInputElement
//     const title = (titleEl as HTMLInputElement).value
//     const price = +(priceEl as HTMLInputElement).value
//     const createdCourse = new Course(title, price)
//     console.log(registerValidators)
//     if(!validate(createdCourse)){
//       alert('Invalid input, please try again')
//       return
//     }
//     console.log(createdCourse)
//   })
// }
//# sourceMappingURL=module7.js.map