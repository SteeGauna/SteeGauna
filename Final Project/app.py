import os
import datetime
import json

from time import sleep
from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, jsonify, make_response, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from helpers import login_required
from django.http import JsonResponse

app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#loading the database
db = SQL("sqlite:///final.db")

@app.route("/", methods=["GET", "POST"])
@login_required
def index():
    row = db.execute("SELECT * FROM users WHERE id=?", session["user_id"])
    team = db.execute("SELECT * FROM players WHERE coach=?", row[0]["username"])

    return render_template("index.html", team=team, logged=True, name=row[0]["username"])


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return render_template("login.html")

        # Ensure password was submitted
        elif not request.form.get("password"):
            return render_template("login.html")

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return render_template("login.html")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        return redirect("/")
    else:
        return render_template("login.html")


@app.route("/logout", methods=["GET", "POST"])
def logout():

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    # checking for username
    if request.method == "POST":
        u_name = request.form.get("username")
        if not u_name:
            return render_template("signup.html")

        # checking for password
        password = request.form.get("password")
        if not password:
            return render_template("signup.html")

        # checking for confirmation
        c_password = request.form.get("confirm")
        if not c_password:
            return render_template("signup.html")

        # checking if passwords match
        elif c_password != password:
            return render_template("signup.html")

        # checking if usernamme exists
        row = db.execute("SELECT * FROM users WHERE username = ?", u_name)
        if len(row) != 0:
            return render_template("signup.html")

        # hash password and storing user if passes checks
        pword_hash = generate_password_hash(password)
        db.execute(
            "INSERT INTO users (username, hash) VALUES(?, ?)", u_name, pword_hash
        )
        row = db.execute("SELECT * FROM users WHERE username=?", u_name)

        session["user_id"] = row[0]["id"]

        return redirect("/")
    else:
        return render_template("signup.html")


@app.route("/edit_team")
@login_required
def edit_team():
    row = db.execute("SELECT * FROM users WHERE id=?", session["user_id"])
    team = db.execute("SELECT * FROM players WHERE coach=?", row[0]["username"])

    # Getting leaders
    cap = db.execute("SELECT * FROM roles WHERE coach=? AND role=?", row[0]["username"], 'cap')
    vice = db.execute("SELECT * FROM roles WHERE coach=? AND role=?", row[0]["username"], 'vice')
    goalk = db.execute("SELECT * FROM roles WHERE coach=? AND role=?", row[0]["username"], 'goalk')
    placek = db.execute("SELECT * FROM roles WHERE coach=? AND role=?", row[0]["username"], 'placek')

    cap = cap[0]["name"]
    vice = vice[0]["name"]
    goalk = goalk[0]["name"]
    placek = placek[0]["name"]

    return render_template("edit_team.html", team=team, logged=True, cap=cap, vice=vice, goalk=goalk, placek=placek)



@app.route("/edit_team/add_player", methods=["POST"])
@login_required
def add_player():

    req = request.get_json()
    row = db.execute(
        "SELECT * FROM users WHERE id=?",
        session["user_id"]
        )
    db.execute(
        "INSERT INTO players(name, weight, coach, age, height, ethnicity, medical, position) VALUES(?, ?,?,?,?,?,?,?)",
        req["name"],
        req["weight"],
        row[0]["username"],
        req["age"],
        req["height"],
        req["ethnicity"],
        req["medical"],
        req["position"],
    )

    # Getting rows for display
    team = db.execute("SELECT * FROM players WHERE coach=?", row[0]["username"])

    return render_template("edit_team.html", team=team, logged=True)


@app.route("/edit_team/delete_player", methods=["POST"])
@login_required
def delete_player():
    # Obtaining json
    req = request.get_json()

    # Deleting Player
    db.execute("DELETE FROM players WHERE id=?", req)

    # Getting rows for display
    row = db.execute("SELECT * FROM users WHERE id=?", session["user_id"])
    team = db.execute("SELECT * FROM players WHERE coach=?", row[0]["username"])

    return render_template("edit_team.html", team=team, logged=True)


@app.route("/edit_player", methods=["POST"])
@login_required
def edit_player():
    req = request.get_json()
    db.execute(
        "UPDATE players SET name=?, weight=?, age=?, height=?, ethnicity=?, medical=?, position=? WHERE id=?",
        req['name'],
        req['weight'],
        req['age'],
        req['height'],
        req['ethnicity'],
        req['medical'],
        req['position'],
        req['id']
        )

    player = db.execute(
        "SELECT * FROM players WHERE id=?",
        req['id']
        )

    return render_template("profile.html", logged=True, player=player[0])


@app.route("/profile/<id>", methods=["GET", "POST"])
@login_required
def profile(id):
    player = db.execute("SELECT * FROM players WHERE id=?", id)
    print(player)

    return render_template("profile.html", logged=True, player=player[0])


@app.route("/set_game_team", methods=["GET", "POST"])
@login_required
def set_team():

    # Getting rows for display
    row = db.execute("SELECT * FROM users WHERE id=?", session["user_id"])
    team = db.execute("SELECT * FROM players WHERE coach=?", row[0]["username"])
    game_team = db.execute("SELECT * FROM gameteam WHERE coach=?", row[0]["username"])

    # Check if game team already exists
    if (len(game_team) == 0):
        gteam = False
        message = "Select Game Team"
    else:
        gteam = True
        message = "Update Team"

    return render_template("set_playing23.html", gameteam=game_team, logged=True, team=team, message=message, gteam=gteam)


@app.route("/set_playing23", methods=["POST"])
@login_required
def set_playing():

    list = request.get_json()

    # Deleting the existing the team
    row = db.execute("SELECT * FROM users WHERE id=?",session["user_id"])
    db.execute(
        "DELETE FROM gameteam WHERE coach=?",
        row[0]["username"]
        )

    # Inserting players in database
    for player in list:
        indi = db.execute("SELECT * FROM players WHERE id=?", player)
        db.execute("INSERT INTO gameteam(name, weight, coach, age, height, ethnicity, medical, position) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", indi[0]["name"], indi[0]["weight"], indi[0]["coach"], indi[0]["age"], indi[0]["height"], indi[0]["ethnicity"], indi[0]["medical"], indi[0]["position"])

    return jsonify("")


@app.route("/role", methods=["POST"])
@login_required
def role():
    id = request.get_json()
    player = db.execute("SELECT * FROM players WHERE id=?", id)

    return jsonify(player[0]["name"])


@app.route("/confirm_role", methods=["POST"])
@login_required
def confirm_role():
    # Getting the leaders from JS
    leaders = request.get_json()

    # Resetting the tables in SQL
    row = db.execute(
        "SELECT * FROM users WHERE id=?",
        session["user_id"]
        )
    db.execute(
        "DELETE FROM roles WHERE coach=?",
        row[0]["username"]
        )

    # Inserting in the new leaders
    db.execute("INSERT INTO roles(name, coach, role) VALUES(?, ?, 'cap')",
            leaders["cap"], row[0]["username"]
            )
    db.execute("INSERT INTO roles(name, coach, role) VALUES(?, ?, 'vice')",
            leaders["vice"], row[0]["username"]
            )
    db.execute("INSERT INTO roles(name, coach, role) VALUES(?, ?, 'goalk')",
            leaders["goalk"], row[0]["username"]
            )
    db.execute("INSERT INTO roles(name, coach, role) VALUES(?, ?, 'placek')",
            leaders["placek"], row[0]["username"]
            )

    # Getting info to display
    team = db.execute("SELECT * FROM players WHERE coach=?", row[0]["username"])

    return render_template("edit_team.html", team=team, logged=True, message="Updated Roles")
