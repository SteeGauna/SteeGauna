from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass


class d_log(models.Model):
    log_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="log_owner", null=True)
    date = models.DateTimeField(auto_now_add=True, null=True)
    log = models.TextField(null=True)
    train_log = models.TextField(null=True)
    train_sess = models.IntegerField(null=True)
    meals = models.TextField(null=True)
    sleep_hrs = models.IntegerField(null=True)
    feeling_log = models.TextField(null=True)

    def serialize(self):
        return {
            "id": self.id,
            "log_user": self.log_user.username,
            "date": self.date,
            "log": self.log,
            "train_log": self.train_log,
            "train_sess": self.train_sess,
            "meals": self.meals,
            "sleep_hrs": self.sleep_hrs,
            "feeling_log": self.feeling_log
        }
