# Website-main
#Questions:

Questions is a section of my personal website in which visitors may ask me any question they like, and I or another user is able to post a response. To ask a question a visitor must first log in. Once logged in, questions can be asked through a textbox interface on the page. When the user hits submit a blurb will appear on the page with the name of the user followed by "asks..." and the text of the question they had previously typed. This blurb in turn contains buttons to reply, edit, and delete. Users can hit reply and and submit and answer which will populate a blurb within the question blurb with the responding user's name and answer text.

The purpose of this section is to act as a guestbook for visitors who - for what ever reason - wish to engage in a dialogue with me, or anyone else who frequents the site. To clarfify, a guestbook is almost always located at any gallery and provides visitors the option to leave feedback on their experience or, at the least, be put on the gallery's email list. This questions page is meant to act as a digital version of that.

Currently, the page has the capability of listing questions and answers in an organized manner. It also keeps track of which user said what and when.

The features currently accessable in this version:

- A user may login or if returning, register at the site.

- A user may also delete their account on the profile page.

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

Currently, users are able to edit and delete eachother's posts

When the page is squished very narrowly, the website title spills into the main section, making it difficult to select each page.

Currently, the backend doesn't have direct access to the id's of answers or questions, making the fetch requests rely\
on the content of questions/answers. this means if the same user asks the same question verbatum twice, if they delete one, the other will be deleted too.

# technologies / frameworks:

## The front end

HTML, CSS & JavaScript were used to design and script the front end of the website.

## The back end

Mysql2, node.js, nodemon, express.js, and JavaScript were used on the backend, with the addition of Heroku coming soon.

# ERD

# How to download & use:

To use the site you will need to have javascript, node.js, mysql & mysql2, and nodemon installed on your device.
If you are using a mac, you will need to set the file path in your terminal to this file.

open mysql and make sure to copy the databases in the server/models to the new, matching mysql tables.

To run the project, initialize the server with node by entering npm run dev.

# images:

<img width="1240" alt="Screen Shot 2022-05-16 at 5 42 00 PM" src="https://user-images.githubusercontent.com/57721845/168687292-5bc4b1a0-e560-4cbf-9763-64331ab9e57a.png">




