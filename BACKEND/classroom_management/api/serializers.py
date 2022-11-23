from rest_framework import serializers
from ..models import *
from .utility import *
from rest_framework.validators import UniqueValidator


class PermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class SessionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = '__all__'

    def validate(self, data):
        MoveToSessions()
        if data['start'] > data['end']:
            raise serializers.ValidationError("finish must occur after start")
        q = Session.objects.filter(classroom_id=data['classroom_id']).filter(
            start__lte=data['end'], end__gte=data['start'])
        print(q)
        if q.exists():
            raise serializers.ValidationError(
                "Time is already taken by a session, Check the timetable")
        return data


class RequestsSerializer(serializers.ModelSerializer):
    # requester = serializers.StringRelatedField()
    class Meta:
        model = Request
        exclude = ('status',)
        # fields = "__all__"

    def validate(self, data):
        if data['start'] > data['end']:
            raise serializers.ValidationError("finish must occur after start")
        q = Session.objects.filter(classroom_id=data['Classrooms']).filter(
            start__lte=data['end'], end__gte=data['start'])
        print(q)
        if q.exists():
            raise serializers.ValidationError(
                "Time is already taken by a session, Check the timetable")
        return data


class RoleSerializer(serializers.ModelSerializer):
    #  staff = StaffSerializer(many=True, read_only=True)
    # StaffRoles = StaffSerializer(many=True, read_only=True)

    class Meta:
        model = Role
        fields = '__all__'
        extra_kwargs = {
            'roleName': {
                'validators': [
                    UniqueValidator(
                        queryset=Role.objects.all()
                    )
                ]
            }
        }


class ClassroomSerializer(serializers.ModelSerializer):
    # RequestClassroom = RequestsSerializer(many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = "__all__"
        depth = 1
        extra_kwargs = {
            'classroom_name': {
                'validators': [
                    UniqueValidator(
                        queryset=Classroom.objects.all()
                    )
                ]
            }
        }


class ActivitytypeSerializer(serializers.ModelSerializer):
    # Req_ActivityType = RequestsSerializer(many=True, read_only=True)

    class Meta:
        model = Activity_type
        fields = '__all__'

    def validate_name(self, value):

        if value and Activity_type.objects.filter(name=value).exists():
            raise serializers.ValidationError(
                "Activity Type name already exists!")
        return value


class SubjectSerializer(serializers.ModelSerializer):
    # StaffSubjects = serializers.StringRelatedField(many=True)

    class Meta:
        model = Subject
        fields = "__all__"

    def validate_name(self, value):

        if value and Subject.objects.filter(name=value).exists():
            raise serializers.ValidationError("Subject already exists! ")
        return value


class StaffSerializer(serializers.ModelSerializer):

    # RequesterFromStaff = RequestsSerializer(many=True, read_only=True)

    class Meta:
        model = Staff
        # fields = "__all__"
        exclude = ("password", )
        extra_kwargs = {
            'username': {
                'validators': [
                    UniqueValidator(
                        queryset=Staff.objects.all()
                    )
                ]
            },
            'email': {
                'validators': [
                    UniqueValidator(
                        queryset=Staff.objects.all()
                    )
                ]
            }
        }


class RequestsListingSerializer(serializers.ModelSerializer):
    # requester = serializers.StringRelatedField()
    requester = serializers.StringRelatedField()
    requester_id = serializers.StringRelatedField()
    Classrooms = serializers.StringRelatedField()
    ReqActivityType = serializers.StringRelatedField()
    staffrole = serializers.SerializerMethodField()
    Subject = serializers.StringRelatedField()
    cycle = serializers.SerializerMethodField()
    classroom_id = serializers.SerializerMethodField()

    def get_requester_id(self, obj):
        return obj.requester.id

    def get_classroom_id(self, obj):
        return obj.Classrooms.id

    def get_duration(self, obj):
        return obj.end - obj.start

    def get_staffrole(self, obj):
        return obj.requester.role.roleName

    def get_cycle(self, obj):
        DeleteOutdatedRequest()
        MoveToSessions()
        return obj.Classrooms.cycle

    class Meta:
        model = Request
        fields = '__all__'


class StaffListingSerializer(serializers.ModelSerializer):
    role = serializers.StringRelatedField()
    # RequesterFromStaff = RequestsSerializer(many=True, read_only=True)

    class Meta:
        model = Staff
        # fields = "__all__"
        exclude = ("password", )


class SessionsListingSerializer(serializers.ModelSerializer):
    SessionSubject = serializers.StringRelatedField()
    SessionLead = serializers.StringRelatedField()
    classroom_id = serializers.StringRelatedField()
    ActivityType = serializers.StringRelatedField()

    class Meta:
        model = Session
        fields = '__all__'


class AdminReqSerializer(serializers.ModelSerializer):
    # requester = serializers.StringRelatedField()

    class Meta:
        model = Request
        fields = "__all__"
