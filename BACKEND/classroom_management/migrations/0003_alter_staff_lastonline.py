# Generated by Django 4.0.3 on 2022-06-14 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classroom_management', '0002_alter_staff_lastonline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staff',
            name='lastonline',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]