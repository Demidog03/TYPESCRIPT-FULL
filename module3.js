"use strict";
/** CLASSES */
// CLASSES - blueprints for objects
// OBJECTS - instances of classes
// class Department {
//   name: string
//
//   constructor(n: string) {
//     this.name = n
//   }
//
//   // describe() {
//   //   console.log(`Department: ${this.name}`)
//   // }
//   describe(this: Department) { // "this" typing
//     console.log(`Department: ${this.name}`)
//   }
// }
//
// const accounting = new Department('Accounting')
// console.log(accounting)
// accounting.describe()
//
// // const accountingCopy = { describe: accounting.describe }
// // accountingCopy.describe() //Department: undefined - cannot get name from instance because it is just a simple object, not an instance of class
// // //does not refer to name of the instance
// // //if this is typed Department type is required
// // // const accountingCopy = { name: '', describe: accounting.describe } // can be fixed by adding name field
/**PRIVATE AND PUBLIC*/
// class Department {
//   private name: string
//   private employees: string[] = [] //private - MODIFIER
//
//   constructor(n: string) {
//     this.name = n
//   }
//
//   describe(this: Department) { // "this" typing
//     console.log(`Department: ${this.name}`)
//   }
//
//   addEmployee(this: Department, employee: string) {
//     this.employees.push(employee)
//   }
//
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// const accounting = new Department('Accounting')
//
// accounting.addEmployee('Max')
// accounting.addEmployee('Manu')
//
// // accounting.employees = [] //accessible from instance (not private)
// // //adding private keyword solves the problem
//
// console.log(accounting)
// accounting.describe()
// accounting.printEmployeeInformation()
/**BETTER CONSTRUCTOR*/
// class Department {
//   // private id: string
//   // private name: string
//   private employees: string[] = [] //private - MODIFIER
//
//   constructor(private id: string, public name: string) { //explicit fields creation
//
//   } //avoiding double initialization
//
//   describe(this: Department) { // "this" typing
//     console.log(`Department ${this.id}: ${this.name}`)
//   }
//
//   addEmployee(this: Department, employee: string) {
//     this.employees.push(employee)
//   }
//
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// const accounting = new Department('d1', 'Accounting')
// accounting.addEmployee('Max')
// accounting.addEmployee('Manu')
//
// console.log(accounting)
// accounting.describe()
// accounting.printEmployeeInformation()
/**READ ONLY and INHERITANCE*/
// class Department {
//   private employees: string[] = []
//
//   constructor(private readonly id: string, public name: string) { //id should not be changed
//     //cannot add employees explicitly because it is already predefined and has an empty array
//   }
//
//   describe(this: Department) { // "this" typing
//     console.log(`Department ${this.id}: ${this.name}`)
//   }
//
//   addEmployee(this: Department, employee: string) {
//     // this.id = 'd2' //error caused by readonly
//     this.employees.push(employee)
//   }
//
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// class ITDepartment extends Department{
//   constructor(id: string, public admins: string[]) {
//     super(id, 'IT')
//   }
// }
//
// class AccountingDepartment extends Department {
//
//   constructor(id: string, private reports: string[]) {
//     super(id, "Accounting")
//   }
//
//   addReport(report: string) {
//     this.reports.push(report)
//   }
//
//   getReports() {
//     console.log(this.reports)
//   }
// }
//
// const itDepartment = new ITDepartment('d1',  ['MAX'])
// itDepartment.addEmployee('Max')
// itDepartment.addEmployee('Manu')
// console.log(itDepartment)
// itDepartment.describe()
// itDepartment.printEmployeeInformation()
//
// const accountingDepartment = new AccountingDepartment('d2', ['First report'])
// accountingDepartment.addReport('Second report')
// accountingDepartment.getReports()
// console.log(accountingDepartment)
/**OVERWRITING METHODES and PROTECTED MODIFIER*/
// class Department {
//   // private employees: string[] = []
//   protected employees: string[] = []
//   constructor(private readonly id: string, public name: string) {
//
//   }
//   describe(this: Department) { // "this" typing
//     console.log(`Department ${this.id}: ${this.name}`)
//   }
//   addEmployee(this: Department, employee: string) {
//     this.employees.push(employee)
//   }
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// class ITDepartment extends Department{
//   constructor(id: string, public admins: string[]) {
//     super(id, 'IT')
//   }
// }
//
// class AccountingDepartment extends Department {
//   constructor(id: string, private reports: string[]) {
//     super(id, "Accounting")
//   }
//   addEmployee(employee: string) {
//     if (employee === 'Max') {
//       return
//     }
//     // this.employees.push(employee) //it is private, so it is accessible only inside main class, not inheriting
//     // however if it is protected, not private, it is possible to access
//     this.employees.push(employee)
//   }
//   addReport(report: string) {
//     this.reports.push(report)
//   }
//   getReports() {
//     console.log(this.reports)
//   }
// }
//
// const itDepartment = new ITDepartment('d1',  ['MAX'])
// itDepartment.addEmployee('Max')
// itDepartment.addEmployee('Manu')
// console.log(itDepartment)
// itDepartment.describe()
// itDepartment.printEmployeeInformation()
//
// const accountingDepartment = new AccountingDepartment('d2', ['First report'])
// accountingDepartment.addReport('Second report')
// accountingDepartment.getReports()
// accountingDepartment.addEmployee('Dan')
// console.log(accountingDepartment)
/**GETTERS AND SETTERS*/
// class Department {
//   protected employees: string[] = []
//   constructor(private readonly id: string, public name: string) {
//   }
//   describe(this: Department) { // "this" typing
//     console.log(`Department ${this.id}: ${this.name}`)
//   }
//   addEmployee(this: Department, employee: string) {
//     this.employees.push(employee)
//   }
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// class ITDepartment extends Department{
//   constructor(id: string, public admins: string[]) {
//     super(id, 'IT')
//   }
// }
//
// class AccountingDepartment extends Department {
//   private lastReport: string
//   get mostRecentReport() { //getter allows accessing the private field from class outside the class
//     if(this.lastReport) {
//       return this.lastReport
//     }
//     throw new Error('No report found')
//   }
//   set mostRecentReport(value: string) {
//     if(!value){
//       throw new Error('Please pass in a valid value')
//     }
//     this.addReport(value)
//   }
//   constructor(id: string, private reports: string[]) {
//     super(id, "Accounting")
//     this.lastReport = reports[0]
//   }
//   addEmployee(employee: string) {
//     if (employee === 'Max') {
//       return
//     }
//     this.employees.push(employee)
//   }
//   addReport(report: string) {
//     this.reports.push(report)
//     this.lastReport = report
//   }
//   getReports() {
//     console.log(this.reports)
//   }
// }
//
// const itDepartment = new ITDepartment('d1',  ['MAX'])
// itDepartment.addEmployee('Max')
// itDepartment.addEmployee('Manu')
// console.log(itDepartment)
// itDepartment.describe()
// itDepartment.printEmployeeInformation()
//
// const accountingDepartment = new AccountingDepartment('d2', ['First report'])
// console.log(accountingDepartment.mostRecentReport) // output: First report
// accountingDepartment.addReport('Second report')
// accountingDepartment.getReports()
// accountingDepartment.addEmployee('Dan')
// console.log(accountingDepartment)
// console.log(accountingDepartment.mostRecentReport) // output: Second report
// // accountingDepartment.mostRecentReport = '' // setter will be triggered by equal operator
// accountingDepartment.mostRecentReport = 'Third report' // setter will be triggered by equal operator
// // An empty string ( '' ), the number 0 , null , NaN , a boolean false , and undefined variables are all “falsy”
// console.log(accountingDepartment.mostRecentReport)
/**STATIC METHODS AND PROPERTIES*/
// // static classes are classes that are globally accessible without creating the instance of the class, and can store some constant values
// // For example: Math.PI, Math.pow(), do not need new Math()
// class Department {
//   static fiscalYear = 2020
//   protected employees: string[] = []
//   constructor(private readonly id: string, public name: string) {
//     // console.log(this.fiscalYear) //cannot access inside the class
//     // non-static methods cannot access to static fields
//     // console.log(Department.fiscalYear) //could be accessible by the class name
//   }
//   describe(this: Department) { // "this" typing
//     console.log(`Department ${this.id}: ${this.name}`)
//   }
//   static createEmployee(name: string) {
//     return {name}
//   }
//   addEmployee(this: Department, employee: string) {
//     this.employees.push(employee)
//   }
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// class ITDepartment extends Department{
//   constructor(id: string, public admins: string[]) {
//     super(id, 'IT')
//   }
// }
//
// class AccountingDepartment extends Department {
//   private lastReport: string
//   get mostRecentReport() {
//     if(this.lastReport) {
//       return this.lastReport
//     }
//     throw new Error('No report found')
//   }
//   set mostRecentReport(value: string) {
//     if(!value){
//       throw new Error('Please pass in a valid value')
//     }
//     this.addReport(value)
//   }
//   constructor(id: string, private reports: string[]) {
//     super(id, "Accounting")
//     this.lastReport = reports[0]
//   }
//   addEmployee(employee: string) {
//     if (employee === 'Max') {
//       return
//     }
//     this.employees.push(employee)
//   }
//   addReport(report: string) {
//     this.reports.push(report)
//     this.lastReport = report
//   }
//   getReports() {
//     console.log(this.reports)
//   }
// }
//
// const employee1 = Department.createEmployee('Max')
// console.log(employee1)
// console.log(Department.fiscalYear)
//
// const itDepartment = new ITDepartment('d1',  ['MAX'])
// itDepartment.addEmployee('Max')
// itDepartment.addEmployee('Manu')
// console.log(itDepartment)
// itDepartment.describe()
// itDepartment.printEmployeeInformation()
//
// const accountingDepartment = new AccountingDepartment('d2', ['First report'])
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.addReport('Second report')
// accountingDepartment.getReports()
// accountingDepartment.addEmployee('Dan')
// console.log(accountingDepartment)
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.mostRecentReport = 'Third report'
// console.log(accountingDepartment.mostRecentReport)
/**ABSTRACT CLASSES*/
// // Abstract class means that some methods "must" be implemented in inheriting classes
// abstract class Department { // abstract class
//   static fiscalYear = 2020
//   protected employees: string[] = []
//   constructor(protected readonly id: string, public name: string) { // changed private id to protected id to make it accessible inside inheriting classes
//   }
//   // describe(this: Department) { // "this" typing
//   //   console.log(`Department ${this.id}: ${this.name}`)
//   // }
//   abstract describe(this: Department): void // abstract method, should remove the body of the method, only return type is needed
//   static createEmployee(name: string) {
//     return {name}
//   }
//   addEmployee(this: Department, employee: string) {
//     this.employees.push(employee)
//   }
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// class ITDepartment extends Department{
//   constructor(id: string, public admins: string[]) {
//     super(id, 'IT')
//   }
//   describe() {
//     console.log('IT Department with ID: ' + this.id)
//   }
// }
//
// class AccountingDepartment extends Department {
//   private lastReport: string
//   get mostRecentReport() {
//     if(this.lastReport) {
//       return this.lastReport
//     }
//     throw new Error('No report found')
//   }
//   set mostRecentReport(value: string) {
//     if(!value){
//       throw new Error('Please pass in a valid value')
//     }
//     this.addReport(value)
//   }
//   constructor(id: string, private reports: string[]) {
//     super(id, "Accounting")
//     this.lastReport = reports[0]
//   }
//   addEmployee(employee: string) {
//     if (employee === 'Max') {
//       return
//     }
//     this.employees.push(employee)
//   }
//   addReport(report: string) {
//     this.reports.push(report)
//     this.lastReport = report
//   }
//   describe() {
//     console.log('Accounting department with ID: ' + this.id) // overwriting the describe method
//   }
//
//   getReports() {
//     console.log(this.reports)
//   }
// }
//
// const employee1 = Department.createEmployee('Max')
// console.log(employee1)
// console.log(Department.fiscalYear)
//
// const itDepartment = new ITDepartment('d1',  ['MAX'])
// itDepartment.addEmployee('Max')
// itDepartment.addEmployee('Manu')
// console.log(itDepartment)
// itDepartment.describe()
// itDepartment.printEmployeeInformation()
//
// const accountingDepartment = new AccountingDepartment('d2', ['First report'])
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.addReport('Second report')
// accountingDepartment.getReports()
// accountingDepartment.addEmployee('Dan')
// console.log(accountingDepartment)
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.mostRecentReport = 'Third report'
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.describe() // describe
/**SINGLETON PATTERN and PRIVATE CONSTRUCTORS*/
// abstract class Department { // abstract class
//   static fiscalYear = 2020
//   protected employees: string[] = []
//   protected constructor(protected readonly id: string, public name: string) {
//   }
//   abstract describe(this: Department): void
//   static createEmployee(name: string) {
//     return {name}
//   }
//   addEmployee(this: Department, employee: string) {
//     this.employees.push(employee)
//   }
//   printEmployeeInformation(this: Department) {
//     console.log(`"${this.name}" department employees: ${this.employees.join(", ")}`)
//   }
// }
//
// class ITDepartment extends Department{
//   constructor(id: string, public admins: string[]) {
//     super(id, 'IT')
//   }
//   describe() {
//     console.log('IT Department with ID: ' + this.id)
//   }
// }
//
// class AccountingDepartment extends Department {
//   private lastReport: string
//   private static instance: AccountingDepartment
//   get mostRecentReport() {
//     if(this.lastReport) {
//       return this.lastReport
//     }
//     throw new Error('No report found')
//   }
//   set mostRecentReport(value: string) {
//     if(!value){
//       throw new Error('Please pass in a valid value')
//     }
//     this.addReport(value)
//   }
//   private constructor(id: string, private reports: string[]) { //could be only 1 instance (object) of this class
//     super(id, "Accounting")
//     this.lastReport = reports[0]
//   }
//   static getInstance(){
//     // in static method by "this" we can access to the static fields
//     // alternative is AccountingDepartment.instance
//     if (this.instance){
//       return this.instance
//     } // in this case only 1 new instance will be created
//     this.instance = new AccountingDepartment('d2', [])
//     return this.instance
//   }
//   addEmployee(employee: string) {
//     if (employee === 'Max') {
//       return
//     }
//     this.employees.push(employee)
//   }
//   addReport(report: string) {
//     this.reports.push(report)
//     this.lastReport = report
//   }
//   describe() {
//     console.log('Accounting department with ID: ' + this.id)
//   }
//
//   getReports() {
//     console.log(this.reports)
//   }
// }
//
// const employee1 = Department.createEmployee('Max')
// console.log(employee1)
// console.log(Department.fiscalYear)
//
// const itDepartment = new ITDepartment('d1',  ['MAX'])
// itDepartment.addEmployee('Max')
// itDepartment.addEmployee('Manu')
// console.log(itDepartment)
// itDepartment.describe()
// itDepartment.printEmployeeInformation()
//
// // const accountingDepartment = new AccountingDepartment('d2', ['First report']) //error
// const accountingDepartment = AccountingDepartment.getInstance()
// accountingDepartment.addReport('First report')
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.addReport('Second report')
// accountingDepartment.getReports()
// accountingDepartment.addEmployee('Dan')
// console.log(accountingDepartment)
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.mostRecentReport = 'Third report'
// console.log(accountingDepartment.mostRecentReport)
// accountingDepartment.describe()
//# sourceMappingURL=module3.js.map