import datetime
import json

from django.core.paginator import Paginator
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from .models import User, d_log


# Create your views here.
@login_required(login_url='/login')
def index(request):
    user = User.objects.get(username=request.user.username)
    logs = d_log.objects.filter(log_user=user).order_by('id').reverse()
    return render(request, "athlete_journal/index.html", {
        "logs": logs
    })


def login_view(request):
    if request.method == "POST":
        # Try to log user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Authenticate
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "athlete_journal/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))


def signup(request):
    if request.method == "POST":
        username = request.POST["username"]

        # Check if password match confirmation
        password = request.POST["password"]
        confirm = request.POST["confirmation"]
        if password != confirm:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, password)
            user.save()
        except IntegrityError:
            return render(request, "athlete_journal/signup.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "athlete_journal/signup.html")


@login_required(login_url='/login')
def edit(request):
    if request.method == "POST":
        data = json.loads(request.body)

        # updating database
        log = d_log.objects.get(pk=data["content"]["id"])
        log.log = data["content"]["log"]
        log.train_log = data["content"]["train_log"]
        log.train_sess = data["content"]["train_sess"]
        log.meals = data["content"]["meals"]
        log.sleep_hrs = data["content"]["sleep_hrs"]
        log.feeling_log = data["content"]["feeling_log"]
        log.save()

        return JsonResponse({"message":"successful"})
    else:
        user = User.objects.get(username=request.user.username)
        logs = d_log.objects.filter(log_user=user).order_by('id').reverse()

        return render(request, "athlete_journal/edit.html", {
            "logs":logs
        })


@login_required(login_url='/login')
def add(request):
    if request.method == "POST":
        # loading js data
        data = json.loads(request.body)

        # adding the log
        user = User.objects.get(username=request.user.username)
        first = d_log(log_user=user,
                        log=data["content"]["log"],
                        train_log=data["content"]["train_log"],
                        train_sess=data["content"]["train_sess"],
                        meals=data["content"]["meals"],
                        sleep_hrs=data["content"]["sleep_hrs"],
                        feeling_log=data["content"]["feeling_log"]
                        )
        first.save()

        return JsonResponse({})


@login_required(login_url='/login')
def view_log(request, id):
    log = d_log.objects.get(pk=id)

    return render(request, "athlete_journal/log.html", {
        "log":log
    })


# return the log object to js to prefill edit boxes
def ret_log(request, id):
    log = d_log.objects.get(pk=id)

    return JsonResponse(log.serialize())


def remove(request, id):
    log = d_log.objects.get(pk=id)
    log.delete()

    return JsonResponse({"message":"fetch successful"})
