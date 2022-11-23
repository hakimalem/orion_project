from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser

# for choices field still in development
ClassroomType = (
    ("TP", "TP"),
    ("TD", "TD"),
    ("Amphi", "Amphi"),
    ("Other", "Other")
)

frequency = (
    ("Week", "Week"),
    ("Month", "Month"),
    ("Year", "Year")
)


RequestStatus = (
    ("Approved", "Approved"),
    ("On Waiting", "On Waiting"),
    ("Desapproved", "Desapproved")
)


class Activity_type(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Permission(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Classroom(models.Model):
    cycle = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(2)])
    classroom_name = models.CharField(max_length=100)
    type = models.CharField(
        max_length=10,
        choices=ClassroomType,
        default='Other'
    )
    Capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.classroom_name


class Subject(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Role(models.Model):
    roleName = models.CharField(max_length=30)
    permission = models.ForeignKey(
        Permission, on_delete=models.CASCADE, default=2)

    def __str__(self):
        return self.roleName


class Staff(AbstractUser):
    #uname = models.CharField(_('uname'),max_length=100)
    # email = models.EmailField(_('email'),max_length=30)
    #Is_admin = models.BooleanField(_('is admin'),default = False)
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    # password = models.CharField(max_length=100)
    role = models.ForeignKey(
        Role, on_delete=models.CASCADE, related_name="StaffRoles", null=True, blank=True)
    ppic = models.ImageField(upload_to='Images', height_field=None,
                             width_field=None, max_length=100, default='Images/lilgohst.png')

    def __str__(self):
        return self.first_name + ' ' + self.last_name
class Request(models.Model):
    requester = models.ForeignKey(
        Staff, on_delete=models.CASCADE, related_name="RequesterFromStaff")
    status = models.CharField(
        max_length=16,
        choices=RequestStatus,
        default='On Waiting'
    )
    start = models.DateTimeField()
    end = models.DateTimeField()
    group = models.IntegerField(default=0, blank=True)
    description = models.CharField(max_length=100)
    # repetition = models.IntegerField()
    request_time = models.DateField(auto_now_add=True)
    Classrooms = models.ForeignKey(
        Classroom, default=None, on_delete=models.CASCADE, related_name="RequestClassroom")
    ReqActivityType = models.ForeignKey(
        Activity_type, default=None, on_delete=models.CASCADE, related_name="Req_ActivityType", null=True)
    Subject = models.ForeignKey(
        Subject,  default=None, on_delete=models.CASCADE, related_name="requestSubjects", null=True, blank=True)
    Frequency = models.CharField(
        max_length=6,
        choices=frequency,
        default='Week'
    )
    Repition = models.PositiveIntegerField(default=1, blank=True)

    def __str__(self):
        return self.requester.uname + " | " + str(self.group) + " | " + str(self.Classrooms) + " |" + str(self.id)


class Session(models.Model):
    SessionSubject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name="SessionSubjects", null=True, blank=True)
    sessionlead = models.ForeignKey(
        Staff,  on_delete=models.CASCADE, related_name="Staffsession"
    )
    classroom_id = models.ForeignKey(
        Classroom,  on_delete=models.CASCADE, related_name="SessionClassrooms"
    )
    start = models.DateTimeField()
    end = models.DateTimeField()
    ActivityType = models.ForeignKey(
        Activity_type, on_delete=models.CASCADE, related_name="SessionActivityTypes", null=True
    )
    description = models.CharField(max_length=50, blank=True)
    group = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.ActivityType.name + " | " + self.sessionlead.username
