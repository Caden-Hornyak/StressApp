# Generated by Django 5.0.2 on 2024-02-23 21:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stressapp', '0012_userattribute_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='friend_request',
            name='to_user',
        ),
        migrations.AddField(
            model_name='friend_request',
            name='to_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='to_user', to='stressapp.userattribute'),
        ),
    ]
