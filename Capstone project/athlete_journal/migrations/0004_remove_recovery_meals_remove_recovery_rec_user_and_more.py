# Generated by Django 5.0.1 on 2024-02-06 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "athlete_journal",
            "0003_meal_rename_user_d_log_log_user_d_log_feeling_log_and_more",
        ),
    ]

    operations = [
        migrations.RemoveField(
            model_name="recovery",
            name="meals",
        ),
        migrations.RemoveField(
            model_name="recovery",
            name="rec_user",
        ),
        migrations.AddField(
            model_name="d_log",
            name="meals",
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name="d_log",
            name="sleep_hrs",
            field=models.IntegerField(null=True),
        ),
        migrations.DeleteModel(
            name="meal",
        ),
        migrations.DeleteModel(
            name="recovery",
        ),
    ]
