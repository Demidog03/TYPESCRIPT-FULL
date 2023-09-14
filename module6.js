"use strict";
/**GENERICS*/
// const names: Array<string> = ['Max', 'Manuel'] // by default it is just an array type
// names[0].toLowerCase()
// const promise: Promise<any> = new Promise((resolve, reject) => { // const promise: Promise<unknown>
//   setTimeout(() => {
//     resolve('This is done')
//   }, 2000)
// })
//
// promise.then(data => {
//   data.toLowerCase() // IDE does not suggest string methods because Promise generic type is any
//   // but if we switch it to Promise<string> it works
// })
/**CUSTOM GENERICS*/
// // function merge(objA: object, objB: object) {
// //   return Object.assign(objA, objB)
// // }
//
// // console.log(merge({name: 'Max'}, {age: 30})) // works fine
// // const mergedObj = merge({name: 'Max'}, {age: 30}) // but when we store it, we cannot access to keys of the merged object
// // mergedObj.age //error
//
// // //Possible solution is type casting
// // const mergedObj = merge({name: 'Max'}, {age: 30}) as {name: string, age: number}  // but when we store it, we cannot access to keys of the merged object
// // mergedObj.age // works fine
//
// // Better solution is generics
// // function merge<T, U>(objA: T, objB: U) {
// //   return Object.assign(objA, objB)
// // }
//
// // 1
// // function merge<T, U>(objA: T, objB: U) {
// //   return Object.assign({}, objA, objB)
// // }    // or
// function merge<T extends object, U extends object>(objA: T, objB: U) {
//   return Object.assign(objA, objB)
// }
// // const mergedObj = merge({name: 'Max'}, {age: 30}) // // type is intersection - {name: string} & {age: number}
// // also we can specifically mention the types of objects
// // const mergedObj = merge<{name: string}, {age: number}>({name: 'Max'}, {age: 30}) // but it is redundant
// const mergedObj = merge({name: 'Max'}, {age: 30})
// interface Lengthy {
//   length: number
// }
//
// function countAndDescribe<T extends Lengthy>(element: T): [T, string] { // instead of (string | T)[] it is better to be tuple [T, string]
//   let descriptionText = 'Got no value.'
//   if(element.length === 1) {
//     descriptionText = 'Got 1 elements'
//   }
//   else if(element.length > 1) {
//     descriptionText = `Got ${element.length} elements`
//   }
//   return [element, descriptionText]
// }
//
// console.log(countAndDescribe(['Hi there!']))
// console.log(countAndDescribe('Hi there!'))
// console.log(countAndDescribe(5)) // number does not has length property
/**KEYOF CONSTRAINT*/
// // function extractAndConvert(obj: object, key: string) {
// //   return obj[key] // ts does not know if the object contains the key like in params
// // }
//
// // solution
// function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
//   return obj[key] // ts does not know if the object contains the key like in params
// }
//
// // console.log(extractAndConvert({}, 'name')) // there is not 'name' key
// console.log(extractAndConvert({name: 'Max'}, 'name'))
/**GENERIC CLASSES*/
// class DataStorage<T> {
//   constructor(private data: Array<T> = []) {
//   }
//   addItem(item: T) {
//     this.data.push(item)
//   }
//   removeItem(item: T) {
//     if(this.data.indexOf(item) === -1) { // if we did not find the item just remove
//       return
//     }
//     this.data.splice(this.data.indexOf(item), 1) // not good for objects, overall if we did not find the item the last item is removing
//   }
//   getItems() {
//     return [...this.data]
//   }
// }
//
// const textStorage = new DataStorage<string>()
// // textStorage.addItem(5) // error, generic type is string
// textStorage.addItem("Hello")
// textStorage.addItem("Hi")
// textStorage.removeItem("Hello")
// console.log(textStorage)
//
// const numberStorage = new DataStorage<number>()
// numberStorage.addItem(2)
//
// // const objStorage = new DataStorage<object>()
// // objStorage.addItem({name: 'Hello'})
// // objStorage.addItem({name: 'Hi'})
// // objStorage.removeItem({name: 'Hello'}) //problem, obj is reference types, we are technically passing new object with different address
// // console.log(objStorage)
//
// // Solution
// const objStorage = new DataStorage<object>()
// const obj1 = {name: 'Hello'}
// objStorage.addItem(obj1)
// objStorage.addItem({name: 'Hi'})
// objStorage.removeItem(obj1) //how it is removing
// console.log(objStorage)
/**GENERIC UTILITY TYPES (Partial and Readonly)*/
// interface CourseGoal {
//   title: string
//   description: string
//   completeUntil: Date
// }
//
// function creatCourseGoal(title: string, description: string, date: Date): CourseGoal {
//   let courseGoal: Partial<CourseGoal> = {}
//   courseGoal.title = title //ts complaining because object is empty
//   courseGoal.description = description
//   courseGoal.completeUntil = date
//   return courseGoal as CourseGoal
// }
//
// const names: Readonly<Array<string>> = ['Max', 'Sports'];
// names.push('Manu') // to block changing the initial array
//# sourceMappingURL=module6.js.map