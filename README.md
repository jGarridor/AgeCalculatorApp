# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Links

- Solution URL: https://github.com/jGarridor/Frontend-Mentor-Age-calculator-app
- Live Site URL: [https://jgarridor.github.io/Frontend-Mentor-Age-calculator-app/](https://jgarridor.github.io/AgeCalculatorApp/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla Javascript
- Asynchronous programming


### What I learned

For this project it was necessary a comprehension and correct structure of the algorithms used to determined the diference between two dates. If the user introduced date is defined as "target date", the difference between this and the 'actual date' is defined by the result of the following calculations:

- result1 = actual_year - target_year
- result2 = actual_month - target_month
- result3 = actual_day - target_day

Of course, the results of these calculations by themselves were not as important as 'how' were the results, if they were greater, less or equal to 0; specially the result2 and result3. 

Depending of "how" the result2 and result3 were, the proper calculations were made, in order to determine the desired output. For example, lets say that result2 was less than 0 and result3 equal to 0, this means that a year has not passed yet and the target month is greater than the actual one. So, the solutions are the follow:

- sol1 = result1 - 1 --> A year has not passed yet.
- sol2 = 12 - target_month + actual_month = result2 + 12
- sol3 = result3 = 0

As it can be seen, substracting target_month from 12, tell us how many months passed in the year of target_month, after it. The result is then added to actual month, so it may be known how many months have transcurred. Of course, this latter calculation is less than 12, and that is because 'a year' has yet to be fulfilled. Hence, why 1 was substracted from result1.

Similar thought process were used to define the rest of the situations.

By the way, the calculations were made, taking into consideration that a month gets fulffiled when an 'x' day of such month happen the next month. For example, let say it's june 30, a month would have passed in july 30, not in july 31.  

### Continued development

In order to create the animation, of printing the outputs, asynchronous programming techniques were required to accomplish the task. Unfortunately, it was necessary to define three syntactically async functions expressions, with different counters each. It was wished, to only declared a function and invoke it when needed. However, when using this procedure, it happen that the outputs were not as expected. It was wanted a synchronized output. Each result would be printed synchronously, so that if they were the same they would finish at the same time and printing each number until the final one. This only was gotten, using the three async functions expressions. I suspect that this behavior is, due to the fact that one and only one execution context is executed.

When the async functions are called, would they share the same execution context? Is there any way to achieve the animation making use of only one function?

More research and practice of async programming and the use of promises is needed.


### Useful resources

- https://www.calculator.net/ - This app helped me to keep track, if the algorithms and program were playing correctly
- https://www.freecodecamp.org/news/asynchronous-programming-in-javascript/ - This article gave me an insight of what are the async programming techniques used in javascript.


## Author

- Frontend Mentor - [@jGarridor](https://www.frontendmentor.io/profile/jGarridor)


