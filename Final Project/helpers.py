import csv
import datetime
import pytz
import requests
import subprocess
import urllib
import uuid

from cs50 import SQL
from flask import redirect, render_template, session
from functools import wraps

def login_required(f):
    
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function
