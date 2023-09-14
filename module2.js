"use strict";
/**TS COMPILING SETTINGS (--watch)*/
// let userName: string = "Max"
// console.log(userName)
//tsc --init - to compile entire project (all ts files)
//creates tsconfig.json
/**TSCONFIG*/
//  "exclude": [ //would be the default
//    "node_modules"
//  ],
//  "include": [ //all files that not listed here would be excluded
//    "module2.ts"
//  ]
//  "files": [ //include only files not folders
//    "module2.ts"
//  ]
//lib: []
// const button = document.querySelector('button')! //! means not nullable (it will exist)
// button.addEventListener('click', () => {
//   console.log('Clicked!')
// })
//if "lib": [] is not assigned by default all global es6 docs are available
//by default ->
//    "lib": [
//      "DOM",
//      "ES6",
//      "DOM.Iterable",
//      "ScriptHost"
//    ],
//"sourceMap": true // allow watching adn debugging ts files in sources tab in browser
// "outDir" - saving path of compiled js files
// "rootDir" - it makes sure that ts compiler does not look to other external and other folders, for example "./src"
// "removeComments" - removes commented code (makes file size less)
// "noEmit" - if do not want to generate js files
// "noEmitOnError" - do not create js file if an ts error
// "strict": true - turns on all strict options
//# sourceMappingURL=module2.js.map