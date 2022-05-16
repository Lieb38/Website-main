# Website-main

## Questions:

Questions is a page on my personal website in which visitors may ask me any question they like. Myself or another administrator, or currently, any other user is able to post a response. To ask a question a visitor must first log in. Once logged in, questions can be asked through a textbox interface on the page. When the user hits submit a blurb will appear on the page with the name of the user followed by "asks..." and the text of the question they had previously typed. This blurb in turn contains buttons to reply, edit, and delete. Users can hit reply and and submit and answer which will populate a blurb within the question blurb with the responding user's name and answer text. (nesting())

The purpose of this section is to act as a guestbook for visitors who - for what ever reason - wish to engage in a dialogue with me, or anyone else who frequents the site. To clarfify, a guestbook is almost always located at any gallery and provides visitors the option to leave feedback on their experience or, at the least, be put on the gallery's email list. This questions page is meant to act as a digital version of that.

Currently, the page has the capability to list questions and answers in an organized manner. It also keeps track of which user said what and when.

The features currently accessable in this version:

- A user may login or if returning, register at the site.

- A user may also edit or delete their account on the profile page.

- A user's may add, edit or delete thier questions and answers.

- A user must be logged in to add, edit or delete a question or answer.

- The site has a homepage with an image of one of my paintings, though in the future there will be many more.


In the future I would like to add a number of key features that were cut for time in this release.




Those features include:

- The works tab will expand to an organised archive of my previous artistic works

- The projects tab will provide links to online projects I plan to complete in the future.

- The title will link to the homepage and will also hover slowly like the title in the questions section

- Once logged in, there will be an option to submit an email address to be kept up to date on 

## Questions page:

- users will be able to see when a question or answer was posted

- A rating button will be added and the page organization will allow positivly rated posts to be displayed higher on the page

- I'm considering adding a feature to submit images.

# Bugs:

Currently, users are able to edit and delete each other's posts

When the page is squished very narrowly, the website title spills into the main section, making it difficult to select each page.

Currently, the backend doesn't have direct access to the id's of answers or questions, making the fetch requests rely\
on the content of questions/answers. This means if the same user asks the same question verbatim twice, if they delete one, the other will be deleted too.


# technologies / frameworks:

## The front end

HTML, CSS & JavaScript were used to design and script the front end of the website.

## The back end

Mysql2, node.js, nodemon, express.js, json, and JavaScript were used on the backend, with the addition of Heroku coming soon.

# ERD

<img width="564" alt="Screen Shot 2022-05-16 at 6 23 25 PM" src="https://user-images.githubusercontent.com/57721845/168692165-8264a1ab-f6c1-46a6-8ad5-3358ed10ec21.png">

# How to download & use:

To use the site you will need to have javascript, node.js, mysql & mysql2, and nodemon installed on your device.
If you are using a mac, you will need to set the file path in your terminal to this file.

In terminal, type: npm install node.js\
then install mysql, then install nodemon, then install mysql2, then install javascript if you haven't already.

download dependancies using the command: node index.js
Then you want to run it: npm run dev.\
Open it in your local host.

set up your mysql. Create a database to hold the backend files. I called mine questions_db. 
With the same tables located at the top of my server/models section: create a new table in mysql for each. Just copy and paste between the backticks in the 'createTable()' function.

That should do it. Oh yeah, set up your file path for mysql, if it's giving you trouble. There are a number of ways to do it, I made it work after spending a few hours on stack exchange: just look up setting up your bash_profile, it will depend on your terminal configuration. Good Luck!

... windows users: do the same thing, it will be easier so skip the bash_profile part.

# images:

Landign Page!
<img width="857" alt="Screen Shot 2022-05-16 at 6 34 16 PM" src="https://user-images.githubusercontent.com/57721845/168693825-5e254d18-13aa-4fea-a22e-f8f44bda948e.png">

Log in!.. dont already have an account?
<img width="1203" alt="Screen Shot 2022-05-16 at 6 30 16 PM" src="https://user-images.githubusercontent.com/57721845/168693540-66e4e3dc-fddd-4cc5-b393-682d6acca777.png">

Register! make sure your password is correct... I do NOT know how to change it ;)
<img width="1186" alt="Screen Shot 2022-05-16 at 6 44 37 PM" src="https://user-images.githubusercontent.com/57721845/168694523-0da61cd7-90b5-40b2-b3ce-8b275912e414.png">
Ask me Anything! ... But DO NOT BE A STRANGER
<img width="1165" alt="Screen Shot 2022-05-16 at 6 44 51 PM" src="https://user-images.githubusercontent.com/57721845/168694517-711ee5ed-fa50-4e39-98d2-c19f831b3c81.png">

Am I me or am I someone else... Be sure to ask yourself this question before changing your username.
<img width="1172" alt="Screen Shot 2022-05-16 at 6 33 51 PM" src="https://user-images.githubusercontent.com/57721845/168693787-92ae2839-6e9f-462f-88ae-8683a18ef8be.png">

Having second thoughts about that answer...
<img width="1240" alt="Screen Shot 2022-05-16 at 5 42 00 PM" src="https://user-images.githubusercontent.com/57721845/168687292-5bc4b1a0-e560-4cbf-9763-64331ab9e57a.png">

Let me hit EDIT and fix that before he sees.
<img width="699" alt="Screen Shot 2022-05-16 at 5 49 52 PM" src="https://user-images.githubusercontent.com/57721845/168693499-0e16c914-9532-4671-a802-a769f139889e.png">

He'll never know... He'll never know.
<img width="707" alt="Screen Shot 2022-05-16 at 5 49 58 PM" src="https://user-images.githubusercontent.com/57721845/168693524-bcdc8598-8e2f-4bca-b3fb-cbd85c744ba7.png">













