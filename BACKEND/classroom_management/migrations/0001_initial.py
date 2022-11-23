# Generated by Django 4.0.3 on 2022-06-14 12:37

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('Is_admin', models.BooleanField(default=False, verbose_name='is admin')),
                ('ppic', models.ImageField(default='Images/lilgohst.png', upload_to='Images')),
                ('lastonline', models.DateTimeField()),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Activity_type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Classroom',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cycle', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(2)])),
                ('classroom_name', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('TP', 'TP'), ('TD', 'TD'), ('Amphi', 'Amphi'), ('Other', 'Other')], default='Other', max_length=10)),
                ('Capacity', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Permission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('description', models.CharField(blank=True, max_length=50)),
                ('group', models.IntegerField(blank=True, default=0)),
                ('ActivityType', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='SessionActivityTypes', to='classroom_management.activity_type')),
                ('SessionSubject', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='SessionSubjects', to='classroom_management.subject')),
                ('classroom_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='SessionClassrooms', to='classroom_management.classroom')),
                ('sessionlead', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Staffsession', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('roleName', models.CharField(max_length=30)),
                ('permission', models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='classroom_management.permission')),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Approved', 'Approved'), ('On Waiting', 'On Waiting'), ('Desapproved', 'Desapproved')], default='On Waiting', max_length=16)),
                ('start', models.DateTimeField()),
                ('end', models.DateTimeField()),
                ('group', models.IntegerField(blank=True, default=0)),
                ('description', models.CharField(max_length=100)),
                ('request_time', models.DateField(auto_now_add=True)),
                ('Frequency', models.CharField(choices=[('Week', 'Week'), ('Month', 'Month'), ('Year', 'Year')], default='Week', max_length=6)),
                ('Repition', models.PositiveIntegerField(blank=True, default=1)),
                ('Classrooms', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='RequestClassroom', to='classroom_management.classroom')),
                ('ReqActivityType', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Req_ActivityType', to='classroom_management.activity_type')),
                ('Subject', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='requestSubjects', to='classroom_management.subject')),
                ('requester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='RequesterFromStaff', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='staff',
            name='Subjects',
            field=models.ManyToManyField(blank=True, default=None, related_name='StaffSubjects', to='classroom_management.subject'),
        ),
        migrations.AddField(
            model_name='staff',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='staff',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='StaffRoles', to='classroom_management.role'),
        ),
        migrations.AddField(
            model_name='staff',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]