# Regular Expressions Exercises

A React application for Regular Expression exercises.

# Prerequisites

- NodeJS 8+
- NPM
- Yarn

# Add/remove exercises

Edit src/exercises.json to change the exercises on offer by filling in the following fields:
 
- `currentId`: a unique identifier for this exercise
- `title`: the title that will appear at the top of the page 
- `text`: the text used for the exercise
- `instructions`: the instructions that appear above the text
- `expected`: the result that should be returned by applying the student's answer to the text using Regex.match
- `last`: [optional] indicate that this is the last exercise in this section, to display a message inviting students to wait for the instructor before continuing

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
