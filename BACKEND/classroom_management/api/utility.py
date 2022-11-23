from ..models import *
import datetime


def DeleteOutdatedRequest():
    today = datetime.datetime.today().date()
    p = Request.objects.filter(start__lt=today)
    for item in p:
        item.delete()
    q = Request.objects.filter(status="Approved")

# today = date.today()


def MoveToSessions():
    q = Request.objects.filter(status="Approved")
    for item in q:
        requester = item.requester
        group = item.group
        start = item.start
        end = item.end
        Classrooms = item.Classrooms
        ReqActivityType = item.ReqActivityType
        subject = item.Subject
        description = item.description
        if item.Frequency == "Week":
            k = 1
        elif item.Frequency == "Month":
            k = 4
        for j in range(item.Repition):
            for i in range(k):
                start = start + datetime.timedelta(days=7*i)
                end = end + datetime.timedelta(days=7*i)
                print(start, end)
                sess = Session(SessionSubject=subject, ActivityType=ReqActivityType,
                               sessionlead=requester, classroom_id=Classrooms, start=start, end=end,
                               group=group, description=description)
                sess.save()
