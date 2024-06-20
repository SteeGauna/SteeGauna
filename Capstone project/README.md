# Athlete Journal
## What I did? and Why I did it?
This project was created to provide any athlete the convience of journalling days and the training
program for the day. What was done in the day, the training program, how much sleep did the athlete
get, what did the athlete eat and so on. This projects gives the liberty to log in both the day and
the training program in one place. Which eliminates the trouble of joournalling logging in two
different places. This project uses the django framework in the backend and javascript in the
frontend. The project has been designed to be responsive to mobiles with different sizes in
viewports using media queries.

## How to run application
This application runs on django in visual studios. Typing in "python manage.py runserver" will
run the application in the given url.

## Distinctiveness and Complexity
This project is distinct from other projects in the course because this project was done with
respect to an athletes' need. Maybe there will be athletes that'll prefer to have two different
places to journal the day and log the training. But there are some that'll prefer to store them in
the same place so it gives them only one place to look at when journalling the day or logging the
training in the day.

This project is not a e-commerce site, not a social network site or
even a wikipedia site. It's more like a diary for journalling the day and logging the training
program if there is one.

The complexity of this project lies within the ease of communication between the javascript file
and views.py. Using the fetch API via GET and POST to get a logs infomation or to update the
database. This project is also designed to respond to the different sizes of viewports. Using
media queries in the css file to readjust the tags and classes for the page to suit the size of
the screen.

## Python files
### views.py
This file contains the index funcion to display all the logs the user journalled. When a log is
clicked, the view_log function is called to view the entire log. The table displays the logs from
newest to oldest. The login_view function to login the user, the signup function to register a
new user and a logout_view function to logout a user. It has a edit function to update the
database when a user edits a log or to display a table of all the logs typed by the user. Has a
add function to add a new log to the database and a view_log function to display the log
in its entirety. The last two functions is the ret_log to return a log to javascript and remove
function to delete a log when deleted by the user.

### urls.py
urls.py contains the links between the urls and the functions in views.py.

### models.py
This project uses two models. A user model which abstracts from the field attributes provided.
The second model is d-log model which stores the logs done by the user. This model has a
function serialize() to return the all the field attributes of an d-log object when the function
is called.

## Static Files
### athlete_journal.js
This file contains the javascript written for this project. An eventlistener is added when the
DOM is loaded to hide the views that is not needed to be displayed at first, within the
respected DOMs. function getcookie() manages the cookies when using the fetch API, hide_views()
hides the views when the DOM is loaded, add_log() queries the values of the input values and
sends the values to python via fetch to update the database. view_edit() displays the table in
edit.html, view_log() displays the log in log.html, clear_editforms() queries the specific divs
of the edit_log div in log.html then clears them to get the divs ready for the appending by
make_divs(). delete_log() sends a prompt to the user when the delete button is clicked and if
the response is yes then the data is sent to python to update the database else if the response
is no then the page reloads. edit_log() uses fetch via get to get the data of a log and calls
make_divs() in the promise to display the form to edit the log. make_divs() creates and sets
the classes for the input fields for the edit form and appends to log.html. The last function
save_edit() queries the values in the edit form and sends the values through fetch to update the
database .

### styles.css
This file contains the CSS for the project. With tags, classses and ids. style.css contains
three media queries. Each query changes the styling of specific tags and classes to suit the
size of the viewport. The first media query is for viewports with the minimum size of 320px
to maximum of 425px. The second media query is for viewports with the minimum size of 426px to
maximum of 1440px. The last query is for viewports above the width of 1440px.

### popper.min.js
popper.min.js is a javascript file downloaded from the internet to support the design of
the dropdown effect in the header of each html page. Because the dropdown is a class in
bootstrap this file had to be downloaded. The dropdown button is in layout.html for when the
viewport is small.

## Templates
### layout.html
layout.html loads the javascript files and css files including the bootstrap classes. This
html file contains the navigation bar for when the user is logged in and when the user is
not. When the user is logged in, "Journal" links to the index page, "edit journal" links to
edit.html, "logout" logs the user out. When the user is logged out, "log in" displays the
form for the user to log in and "Sign up" displays the form to sign up for a new account. It
also contains the dropdown div and is displayed when the viewport is small. Every other
html file extends to this layout.html.

### index.html
index.html displays a table of logs typed in by the user. The table is displayed from newest
to oldest. When a user clicks on a log in the table, the log is displayed in its entirety.

### edit.html
This html file contains two major divs. edit_table displays a table of all the logs to the
user with a delete button beside each log giving the option to delete the log. The add_log
div contains the form for the user to fill if the user desires to type a new log to add to
the journal.

### log.html
log.html displays all the information about the log. This page also contains a edit button to
edit the individual log. When this button is clicked, the edit_log div is displayed and
with the help of javascript the input forms are appended to the page, into its respective
divs.

### login.html
login.html displays a form to the user to log the user in.

### signup.html
signup.html displays a form to the user to fill if the user wants to register a new account.


## Additional Information
This projects targets specifically athletes with the interest to journal their everyday and
also log in their training program for the day.
