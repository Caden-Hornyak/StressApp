# Generated by Django 4.2.6 on 2024-02-21 03:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stressapp', '0010_alter_friend_request_to_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='chat_messages',
        ),
        migrations.AddField(
            model_name='chat',
            name='chat_messages',
            field=models.ManyToManyField(blank=True, related_name='chat_messages', to='stressapp.message'),
        ),
    ]