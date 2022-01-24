# Homework

## Found bugs and their description

1. Bugs
    1. optimalization of imports
        - we can simplify the code by importing useState and useEffect directly with object destructuring so we do not have to use React keyword every time we use one of these hooks. Therefore we can delete React import, because we do not use it.
    1. block scope
        - let's just hop from function scope to block scope changing every var to const/let, we dont want any errors to occur
    1. map functions
        - when we are mapping elements to document, we need unique key for every element
    1. class based component
        - not really bug, but we want to be consistent throughout our project
    1. too complicated array merge
        - if we want to merge 2 arrays we don't have to cycle through new array and add elems one by one, we can use our spread operator like this `setState([...oldArray, ...newArray])`
1. Features
    1. context
        - todo fetching - let's move this fc to useEffect and implement it much smoother in app context with help of `https://jsonplaceholder.typicode.com/` website, providing us 200 todos ( we take only 10, enough for function showcase )
        - while we at it, we can implement bunch of core todo app functions: CRUD functions
        - we save done todos for some progress, and in case we want to undone them
    1. routing
        - we make sure, each todo has unique id and then we match slug with todo id for todo detail page when we can perform CRUD functions
        - main layout is on empty route, after new react-router-dom should make sure we dont match paths we dont want to match
        
Little change with my prefered coding style: exporting const as default function (makes me better visibly differentiate function component from other functions)
And last thing, messy css is not really my usual style, normaly I would use Sass and go for nesting, variables and generating bootstrap classes. 
Hope u like my custom design with twitter-like colors 😀