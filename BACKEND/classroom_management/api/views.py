from django.db.models import Count
from rest_framework.response import Response
# from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from ..models import *
from rest_framework import mixins
from rest_framework import generics
from datetime import datetime
from .serializers import *
from datetime import datetime
from rest_framework import viewsets
from datetime import date, timedelta
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import json

from .utility import *


class ApiOverviewAV(APIView):
    def get(self, request):
        api_urls = {

            'jwt-api-token': 'http://127.0.0.1:8000/api/token/',
            'jwt-api-token-refresh': 'http://127.0.0.1:8000/api/token/refresh/',
            'Status': 'Running...',
            'Staff(Read only)': 'http://127.0.0.1:8000/staff',
            'Staff(Write)': 'http://127.0.0.1:8000/staff/modify',

            'request(Read only)': 'http://127.0.0.1:8000/request',
            'request (Write)': 'http://127.0.0.1:8000/request/modify',


            'classroom': 'http://127.0.0.1:8000/classroom',

            'roles': 'http://127.0.0.1:8000/role/',
            'session': 'http://127.0.0.1:8000/sessions',

            ''
            'request_of_a_classroom (add a pk at the end)': 'http://127.0.0.1:8000/classroom/1/request',



            'Site_Analytics': 'http://127.0.0.1:8000/analytics',


            'Site_Most_Requested_Classroom': 'http://127.0.0.1:8000/mostreq',

            'Staff timetable (add a pk in the end) ': 'http://127.0.0.1:8000/stafftt/',

            'Classroom timetable (add a pk in the end) ': 'http://127.0.0.1:8000/classroomtt/',


            'Admin Request Listing (only shows waiting requests)': 'http://127.0.0.1:8000/adminreqlist/',
            'Admin Request Edting/change status to Approved (add pk at the end)': 'http://127.0.0.1:8000/approve/',

        }
        return Response(api_urls)


class StaffSV(mixins.ListModelMixin,
              mixins.RetrieveModelMixin,
              viewsets.GenericViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffListingSerializer


class StaffCSV(mixins.CreateModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
               mixins.RetrieveModelMixin,
               viewsets.GenericViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class ClassroomsSV(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer


class RequestsSV(mixins.ListModelMixin,
                 mixins.RetrieveModelMixin,
                 viewsets.GenericViewSet):
    queryset = Request.objects.all().order_by('start')
    serializer_class = RequestsListingSerializer
    # DeleteOutdatedRequest()
    # MoveToSessions()


class RequestsCSV(mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestsSerializer


class SessionsSV(viewsets.ModelViewSet):
    queryset = Session.objects.all().order_by('start')
    serializer_class = SessionsSerializer
    # DeleteOutdatedRequest()
    # MoveToSessions()


class ActivityTypeSV(viewsets.ModelViewSet):
    queryset = Activity_type.objects.all()
    serializer_class = ActivitytypeSerializer


class PermissionSV(mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   viewsets.GenericViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionsSerializer


class SubjectSV(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class RoleSV(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class ClassroomRequests(generics.ListAPIView):
    serializer_class = RequestsSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Request.objects.filter(Classrooms=pk)


class RequestCreate(generics.CreateAPIView):
    serializer_class = RequestsSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Request.objects.filter(Request=pk)


class StaffCreate(generics.CreateAPIView):
    serializer_class = RequestsSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Staff.objects.filter(Request=pk)


class Analytics(APIView):
    def get(self, request):
        nrequests = Request.objects.all().count()
        ndisapprouved = Request.objects.filter(
            status="Desapproved").count()
        nhold = Request.objects.filter(status="On Waiting").count()
        napprouved = Request.objects.filter(status="Approved").count()
        nstaff = Staff.objects.all().count()
        nteacher = Staff.objects.filter(role=1).count()
        nclub = Staff.objects.filter(role=2).count()
        other = nstaff - nteacher - nclub
        classrooms = Classroom.objects.all().count()
        ntd = Classroom.objects.filter(
            type="TD").count()
        ntp = Classroom.objects.filter(type="TP").count()
        namphi = Classroom.objects.filter(type="Amphi").count()
        nother = Classroom.objects.filter(type="Other").count()

        # current_datetime = datetime.now()
        # date = str(current_datetime)[:10]
        # month = date[:7]
        # weekstart = int(date[8:])
        given_date = datetime.datetime.today().date()
        first_day_of_month = given_date.replace(day=1)
        last_day_of_month = given_date.replace(day=30)
        print(last_day_of_month)
        print(first_day_of_month)
        today = date.today()
        start_week = today - timedelta(days=today.weekday())
        end_week = start_week + timedelta(days=6)
        req_td_month = Request.objects.filter(
            request_time__range=[first_day_of_month, last_day_of_month]).filter(Classrooms__type="TD").count()

        req_tp_month = Request.objects.filter(
            request_time__range=[first_day_of_month, last_day_of_month]).filter(Classrooms__type="TP").count()

        req_amphi_month = Request.objects.filter(
            request_time__range=[first_day_of_month, last_day_of_month]).filter(Classrooms__type="Amphi").count()

        req_td_week = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(Classrooms__type="TD").count()

        req_tp_week = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(Classrooms__type="TP").count()

        req_amphi_week = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(Classrooms__type="Amphi").count()

        sunday = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(request_time__week_day=1).count()
        monday = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(request_time__week_day=2).count()
        tuesday = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(request_time__week_day=3).count()
        wednesday = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(request_time__week_day=4).count()
        thursday = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(request_time__week_day=5).count()
        friday = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(request_time__week_day=6).count()
        saturday = Request.objects.filter(
            request_time__range=[start_week, end_week]).filter(request_time__week_day=7).count()

        resp = {
            'Circular Chart': "--------------------------",
            'Number_of_requests': nrequests,
            'Number_of_approved_requests': napprouved,
            'Number_of_disapproved_requests': ndisapprouved,
            'Number_of_Waiting_requests': nhold,
            'Total Staff': "--------------------------",
            'Number_of_Staff': nstaff,
            'Teachers': nteacher,
            'Clubs': nclub,
            'Other': other,
            'Classrooms': "--------------------------",
            'number_of_classrooms': classrooms,
            'number_of_td': ntd,
            'number_of_tp': ntp,
            'number_of_amphi': namphi,
            'number_of_others': nother,
            'ignore': "--------------------------",
            'first_day_of_month': first_day_of_month,
            'last_day_of_month': last_day_of_month,
            'start_week': start_week,
            'end_week': end_week,
            'Requests Chart in months': "--------------------------",
            'request_td_month': req_td_month,
            'request_tp_month': req_tp_month,
            'request_amphi_month': req_amphi_month,
            'Requests Chart in weeks': "--------------------------",


            'request_td_week': req_td_week,
            'request_tp_week': req_tp_week,
            'request_amphi_week': req_amphi_week,


            'Total Requests in weekdays': "--------------------------",

            'request sunday': sunday,
            'request monday': monday,
            'request tuesday': tuesday,
            'request wednesday': wednesday,
            'request thursday': thursday,
            'request friday': friday,
            'request saturday': saturday,




            # 'month': month,

            # 'weekstart': start,
            # 'weekend': end,


        }
        return Response(resp)


class MostRequested(APIView):
    def get(self, request):
        q = Classroom.objects.annotate(requestscount=Count(
            'RequestClassroom')).order_by('-requestscount')[:5]
        serializer = ClassroomSerializer(q, many=True)

        i = 0
        for element in serializer.data:
            element["Times Requested"] = q[i].requestscount
            json.dumps(element)
            i = i+1

        return Response(serializer.data)


class StaffTimeTable(APIView):
    def get(self, request, pk):
        q = Session.objects.filter(sessionlead=pk)
        serializer = SessionsListingSerializer(q, many=True)
        return Response(serializer.data)


class ClassroomTimeTable(APIView):
    def get(self, request, pk):
        q = Session.objects.filter(classroom_id=pk)
        serializer = SessionsListingSerializer(q, many=True)
        return Response(serializer.data)


class RequestApprouvalAV(APIView):
    def get(self, request, pk):
        try:
            req = Request.objects.get(pk=pk)
        except Request.DoesNotExist:
            return Response({'error': 'Request does not exist'}, status=status.HTTP_404_NOT_FOUND)
        serializer = RequestsListingSerializer(req)
        return Response(serializer.data)

    def patch(self, request, pk):

        req = Request.objects.get(pk=pk)
        serializer = RequestsListingSerializer(
            req, data=request.data, partial=True)

        if serializer.is_valid():
            if serializer.validated_data['status'] == "Approved":
                MoveToSessions()

            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    def delete(self, request, pk):
        req = Request.objects.get(pk=pk)
        req.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RequestAdminListAV(APIView):
    def get(self, request):
        req = Request.objects.filter(status="On Waiting")  # default
        serializer = RequestsListingSerializer(req, many=True)
        # DeleteOutdatedRequest()
        # MoveToSessions()
        return Response(serializer.data)
