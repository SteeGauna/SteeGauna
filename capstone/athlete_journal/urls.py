from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("signup", views.signup, name="signup"),
    path("edit", views.edit, name="edit"),
    path("add", views.add, name="add"),
    path("view_log/<int:id>", views.view_log, name="view_log"),
    path("view_log/ret_log/<int:id>", views.ret_log, name="ret_log"),
    path("remove/<int:id>", views.remove, name="remove")
]
