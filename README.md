# Homework

## Found bugs and their description

1. App.tsx
    1. optimalization of imports
        - we can simplify the code by importing useState and useEffect directly with object destructuring so we do not have to use React keyword every time we use one of these hooks. Therefore we can delete React import, because we do not use it.
    2. todo fetching function
        - let's move this fc to useEffect and implement it much smoother
    3. block scope
        - let's just hop from function scope to block scope changing every var to const/let, we dont want any errors to occur
All little changes with my prefered coding style: exporting const as default function (makes me better visibly differentiate function component from other functions)