# Generated by Django 5.1.4 on 2025-01-17 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0004_alter_adminuser_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='LatestRFID',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(max_length=255, unique=True)),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'latest_rfid',
            },
        ),
    ]
