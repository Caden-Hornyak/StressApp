# Generated by Django 4.2.6 on 2024-02-13 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stressapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userattribute',
            name='tags',
            field=models.ManyToManyField(to='stressapp.interest'),
        ),
    ]
