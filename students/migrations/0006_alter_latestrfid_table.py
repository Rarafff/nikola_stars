# Generated by Django 5.1.4 on 2025-01-17 03:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0005_latestrfid'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='latestrfid',
            table='student_latest_rfid',
        ),
    ]
