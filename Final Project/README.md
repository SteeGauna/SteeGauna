# Rugby 23
#### Video Demo:  <https://youtu.be/RzAzX3Pqnqk>
#### Description:
This project is targeted specifically to the sport of rugby. This project aims to provide the ease of team
management to rugby coaches in terms of viewing the extended squad, selecting the players for the next
match or the profiling of individual players. This project was programmed in python for the backend server,
javascript and html for the frontend. The project has app.py and helpers.py files for python, team.js for
javascript, final.db for the SQL database and the templates are in html. The styling of the pages are in
the styles.css file with the help of some bootstrap classes.


## <ins>app.py</ins>
app.py imported from a variety of libraries. They were os, datetime, json and cs50 to name a few. app.py
has an index function to view the team list(extended squad), a log in function and a logout function as
well as a sign up function to sign up new users. The project treats the user as a coach so the username is
taken in as the coaches name. The /edit_team route is used to edit the team. /edit_team views the team,
/edit_team/add_player is the route to add a player, /edit_team/delete_player is the route to delete a
player from the team. All with its different functions. /edit_player route deals with the update of the
players' profile whereas the profile/id route is to view the players profile. The /set_game_team is used to
to display the current team that's selected for the next game or was selected for the previous game
if there was ever a selection. The route /set_playing23 is used to interact with the SQL database to insert
the newly selected players for the next game taking into account that you can only select a minimum and
maximum of 23 players. Working on the set_playing function for the route /set_playing23 was a tough one.
Python seemed to be executing too fast for the "insert" calls to keep up. So when the location.reload()
function was called in javascript, the page wouldn't show the whole team cause the "select" call would
be selecting from a database that doesn't contain the whole team. The page would reload before all the data
was inserted. So the solution in place was to set a 3 second timer in javascript to give time to the
"insert" calls to insert all the data before reloading the page. /role route is used to return the name of
a player to javascript and the /confirm_role route is used to assign the roles to the selected players.

## <ins>helpers.py</ins>
helpers.py only contains the login_required function. Most of the functions are defined and used in the
app.py file.

## <ins>team.js</ins>
At the start there was a difficulty in understanding the implementation of the fetch API. After some
research it was then finally understood. An eventlistener is added for when the DOM is loaded. The function
hide_views() would be called. hide_views() is a function used to hide the views that are not needed at first
in the respected pages. The view_form() displays the form in the edit_team.html to add a player and the
add_player() function adds the player to the database using a fetch call to python. The delete_player()
function deletes a player from the team, also using a fetch call to python to interact with the database.
view_roles() displays the table for the user to select the players and which role the player would play. The
set_role() does not interact with the database instead it updates the page to show the user which player has
been chosen and for which role and it also stores the name of the player in a hidden div to act as a storage
for when the roles are confirmed. It was difficult trying to figure out a way to store the names in html and
submit all at once. The solution in place was to have a hidden div and append the selected name to it using
javascript. When the user confirms the names then javascript queries into the hidden div and grabs the names
from the div and updates the server. view_edit() displays the form of editing the profile of the player and
save_changes() uses fetch API to send the changes to python to update the server. select_gteam() displays
unto the user the table for the user to select the 23 players playing in the next match. player_selected()
just like in set_role() appends the player into a hidden div. The hidden div acts as a list in html and is
queried when confirm_gteam() is called. The id stored is then passed to python to update the database and
set the playing 23. view_23() displays unto the user his currently selected players if ever there was a
selection for a game.

## <ins>styles.css</ins>
This file is linked to all templates and is taking care of the aesthetics of the pages.

## <ins>Templates</ins>
### layout.html
layout.html contains the navbar for the pages. Loads the javascript, styles.css and the bootstrap link.
Every other template extends from layout.html.

### index.html
This template displays a table of all the players the user has. The top has the title and the users' name.
The table uses a class from bootstrap.

### edit_team.html
This template has 4 divs. The divs are displayed if the user wants to accomplish a task within that div.
Either than that they remain hidden. This is done with javascript to avoid reloading the whole page. The
first div(edit_table) displays a table of all the players with a button within the each row giving the
option to delete the player. There is also two buttons above the table, the first button to display the
second div(add_player) and the second button to display the div(set_roles). The second div(add_player)
displays the form to the user to add a player. The third div(set_roles) displays a table to set the roles
in the team. Javascript is used to update the labels above the table then when the confirm button is
pressed, it is then saved unto the database. The fourth div(storage) is hidden the whole time. This div
stores the ids of the players and with javascript ensures that no role is filled in with two players.

### login.html
login.html directly interacts with python to check whether the username or password used is correct. This
template just contains the form to login to the account.

### signup.html
This template displays a form to sign up for a new account. Has a box for input, password and another to
confirm the password. When submitted the information is sent to python and checked. If there is no error
then a new account is registered.

### profile.html
profile.html has 2 divs to display. The first div(profile) displays the players profile. When the edit
player button is clicked the second div(edit_profile) is displayed. The second div displays prefilled
input boxes to edit the profile of the player.

### set_playing23.html
set_playing.html has 4 divs. The first div(select_gteam) display the entire team and buttons to select the
23 players and to view the current 23 players that were selected. The second div(confirm_gteam) displays
the team with checkboxes beside the name to choose the player for the playing 23. With the confirm button.
The third div(view_23) responds to the button in the first div. This div displays the previously selected
23 players. The last div(selected_players) acts a list to store the ids of the players that are selected
to be the next 23 players. When the confirm button is clicked, all these ids stored will be queried then
passed to python to update the database. The last div(selected_players) is hidden at all times.
