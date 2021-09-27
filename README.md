
# Frontend Homework 
As part of our application process, we'd like to see what you can produce by giving you a small assignment. We are not trying to waste your time or cause confusion with this assignment. Part of this assignment is actually used in one of our apps. It should take you no more than a few hours to complete the assignment, but any extra polish or features you might want to put in will not go unnoticed.


## The assignment

Please create a simple signup form to allow users to create an account with us. The signup form should include 6 form fields. 
The form feilds are as follows:

- [ ] First Name (required).
- [ ] Last Name (required).
- [ ] Work Email Address (required). 
    - Only allow work email address. Public emails like google, yahoo, outlook, etc. should be considered invalid. 
- [ ] Password (required). 
    - Password should be at least 8 characters long.
    - Include at least 1 uppercase letter.
    - Include at least 1 number.
    - Include at least 1 special character e.g., ! @ # ? ] .
- [ ] Phone (optional).
    - Assume US phone numbers are being used.
- [ ] Confrimation Checkbox (required).
- [ ] Post form data to an api.
    - The node api will have a post endpoint http://localhost:8000/api/create to post the data too. 
    - On success show a succuss message and clear all form data. 
 
The form will post to an api but the data does not need to be saved or stored anywhere. We have setup an example node api in this repo, however you are welcome to use whatever backend you want. 

## Requirements
- Use any new front end framework to complete this task. Anuglar, vue, react, whatever you are most comfortable with. 
- Include unit tests
- To complete your homework, please fork this repo and commit your work to your fork. When you are ready for us to look at it, give us access to your fork so we can review and run it.
- Create a README.md with instructions on how to run the app and tests. 


## Considerations 
- Design is not a strong consideration for this homework, but you are welcome to use bootstrap, material design, or any design system you like. 
- Use best practices for input validation.
- Is your app web accessible? Is there something simple you can do to check for ADA compliance? 


# API Setup
1) make sure node is installed. Go download it [here](https://nodejs.org/en/) 
2) run npm i
3) node server.js (starts node api)
4) ng serve (starts angular app)


If you have any questions, please ask!