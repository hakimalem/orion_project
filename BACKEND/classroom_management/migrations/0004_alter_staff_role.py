# Generated by Django 4.0.3 on 2022-06-14 14:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('classroom_management', '0003_alter_staff_lastonline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='staff',
            name='role',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='StaffRoles', to='classroom_management.role'),
        ),
    ]
