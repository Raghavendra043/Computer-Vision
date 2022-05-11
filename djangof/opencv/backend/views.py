from django.http import HttpResponse
from django.shortcuts import render
import cv2
from django.shortcuts import render
from numpy import imag
import json
import random
import numpy as np
import os



# Create your views here.

def home(request):
    return HttpResponse({'Home'})

def find12(pixcel, i, j):
    c=0
    for k in pixcel:
        if(abs(k[0]-i) <=15 and abs(k[1]-j) <=20):
            c=1
    return c 

def get_number_of_nodes(image1):
    a= 0 
    color = [(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)) for j in range(160+10)]
    


    # image1 = cv2.imread('test_color.jpg')
    

    image1 = cv2.resize(image1, (960, 540))
    
    imag230 = image1.copy()

    image2 = cv2.cvtColor(image1, cv2.COLOR_BGR2HSV)

    # cv2.imwrite('test_hsv.jpg', image2)        

    lower = np.array([0,180,0], dtype="uint8")
    upper = np.array([255, 255, 255], dtype="uint8")


    lower1 = np.array([0,63,0], dtype="uint8")
    upper1 = np.array([179,111,255], dtype="uint8")

    mask = cv2.inRange(image2, lower, upper)



    cnts = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    mask1 = cv2.inRange(image2, lower1, upper1)
    cnts1 = cv2.findContours(mask1, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts1 = cnts1[0] if len(cnts1) == 2 else cnts1[1]

    
    print( len(cnts), len(cnts[0]),len(cnts[1]))

    cnts = cnts[0] if len(cnts) == 2 else cnts[1]

    #cv2.drawContours(imag230, [cnts1], 0, (0, 0, 255), 5)

    



    pixcel = []
    arr = []
    image10 = image1.copy()
    image11 = image1.copy()
    count=0
    for c in cnts:
        x,y,w,h = cv2.boundingRect(c)
        if(find12(pixcel, x, y) == 1):
            continue
        count+=1
        pixcel.append([x, y])
        avgx = 0
        avgy = 0
        for j in c:
            avgx+=j[0][0]
            avgy+=j[0][1]
        avgx = int(avgx/len(c))
        avgy = int(avgy/len(c))
        arr.append([avgx, avgy])
        #cv2.rectangle(image10, (avgx, avgy), (avgx + 2, avgy + 2), color[count], 2)

        image10 = cv2.putText(image10, str(count), (avgx, avgy),cv2.FONT_HERSHEY_SIMPLEX,0.3,(255, 0, 0),1,cv2.LINE_AA)
        cv2.rectangle(image1, (x, y), (x + w, y + h), color[count], 2)

    cont = []
    for c in cnts1:
        for b in c:
            x = b[0][0]
            y = b[0][1]
            cont.append([x, y])
            cv2.circle(image11, (x,y),3, (36,255,12), -1)
    # cv2.imshow('labels',image10)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # cv2.waitKey(1)
    return arr, count


def findP(ar, j):
    P=[]
    
#     P[find(arr, ar[j])] = ar[j]
    P.append(ar[j])
    y= ar[j][1]
    co=1
    j+=1
    while(j<len(ar)):
        if(abs(ar[j][1] - y) <16):
#             P[find(arr, ar[j])] = ar[j]
            P.append(ar[j])
            y= y*co + ar[j][1]
            co+=1
            y/=co
            del ar[j]
        else:
            j+=1
    return ar, P


def sort(points):
    for j in points.keys():
        for k in range(len(points[j])-1, 0, -1):
            for m in range(k):
                if(points[j][m+1][0] < points[j][m][0]):
                    p = points[j][m+1]
                    points[j][m+1]= points[j][m]
                    points[j][m]= p
    return points

def get_trajectory(points,loc):

    print(points)
    color = [(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)) for j in range(len(points))]
    trajectory = {}
    
    for j in range(len(points)):
        trajectory[j] = {
            "point":points[j],
            "color":color[j],
            "trajectory":[points[j]]
        }
        
    
    points = np.array(points, dtype="float32")
    
    new_pts= [0 for j in range(points.shape[0])]

    cap = cv2.VideoCapture(loc)

    mask = np.zeros_like((960, 540))

    mask1 = np.zeros_like((960, 540))
    cnts1 = []



    lower1 = np.array([0,63,0], dtype="uint8")
    upper1 = np.array([179,85,255], dtype="uint8")

    frm = np.zeros_like((960, 540))
    i=0
    success, frm = cap.read()
    traj_images= []
    while success:
        print("Frame :", i)
        if(i==0):
            
            frm = cv2.resize(frm, (960, 540))    
            #cv2.imwrite('test_color.jpg', frm)        
            old_gray = cv2.cvtColor(frm, cv2.COLOR_BGR2GRAY)
    #         cv2.imwrite('test.jpg', old_gray)

            i=i+1
            mask = np.zeros_like(frm)
            continue
        i=i+1
        
        success, frame2 = cap.read()
        # if(i<390):
        #     continue
        if(not success):
            break
        frame2 = cv2.resize(frame2, (960, 540))
        mask2 = np.zeros_like(frame2)
        
        image2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2HSV)
        mask1 = cv2.inRange(image2, lower1, upper1)
        cnts1 = cv2.findContours(mask1, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts1 = cnts1[0] if len(cnts1) == 2 else cnts1[1]
        image11 = frame2.copy()

        for c in cnts1:
            for b in c:
                x = b[0][0]
                y = b[0][1]
                cv2.circle(image11, (x,y),3, (36,255,12), -1)
                cv2.circle(mask2 , (x,y),1, (36,255,12), -1)


        new_gray = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)

        new_gray = cv2.resize(new_gray, (960, 540))

        for j in range(points.shape[0]):
            old_pts = points[j].reshape(-1, 1, 2)

            new_pts[j], status, err = cv2.calcOpticalFlowPyrLK(old_gray, 
                                         new_gray, 
                                         old_pts, 
                                         None, maxLevel=1,
                                         criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT,
                                                                         15, 0.08))

            points[j] = new_pts[j]
            trajectory[j]['trajectory'].append(new_pts[j])
            #print(new_pts[j],'\n')
            cv2.circle(mask, (int(new_pts[j][0][0][0]) ,int(new_pts[j][0][0][1])), 1, color[j], 1)
        
        


        combined = cv2.addWeighted(frame2, 0.7, mask, 0.3, 0.1)
        
        com = cv2.addWeighted(mask, 0.7, mask2, 0.3, 0.1)
        # s= 'img'+str(i)+'.jpg'
        # cv2.imwrite(s, com)

        traj_images.append(com)

        combined1 = cv2.addWeighted(mask1, 0.7, new_gray, 0.3, 0.1)

        combined2 = cv2.addWeighted(combined, 0.7, image11, 0.3, 0.1)

        stacked = np.hstack((combined, image11))
        mask3 = cv2.cvtColor(mask, cv2.COLOR_BGR2GRAY)
        stacked1 = np.hstack((mask3, combined1))

#         Show this stacked frame at 40% of the size.
        # cv2.imshow('Final',cv2.resize(stacked,None,fx=0.4,fy=0.4))

        #cv2.imshow('Final1',cv2.resize(stacked1,None,fx=0.4,fy=0.4))

        #cv2.imshow("mask", mask)

        #cv2.imshow("new win", image11)

        print(i)
        # cv2.imshow("wind", com)

        old_gray = new_gray.copy()

    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # cv2.waitKey(1)
    print('came out')
    for j in trajectory.keys():
        X= [trajectory[j]['trajectory'][0][0]]
        Y = [trajectory[j]['trajectory'][0][1]]
        for k in range(1, len(trajectory[j]['trajectory'])):
            trajectory[j]['trajectory'][k] = trajectory[j]['trajectory'][k].reshape(2) 
            X.append(trajectory[j]['trajectory'][k][0])
            Y.append(trajectory[j]['trajectory'][k][1])
        trajectory[j]['X'] = X
        trajectory[j]['Y'] = Y
        trajectory[j]['trajectory'] = 0

    return trajectory,traj_images
def get_data(body):
    loc = body['loc']
    x = body['x']
    
    #image = cv2.imread('C:/Users/raghavendra/Documents/computer vision/ImagesZ/1.jpg')
    #loc='C:/Users/raghavendra/Documents/computer vision/video.mp4'
    cap = cv2.VideoCapture(loc)
    
    _, frm = cap.read()
    frm = cv2.resize(frm, (960, 540))
    arr, points_number= get_number_of_nodes(frm)
    
    Points = {}
    j=0
    count=0
    while(j<len(arr)):
        
        arr,P = findP(arr,j)
        del arr[j]
        count+=1
        Points[count] = P

    Points = sort(Points)

    Pointsy = {}    ## all y axis points
    count = 1
    for j in range(len(Points[1])):
        L=[]
        for k in Points.keys():
            L.append(Points[k][j])
        Pointsy[count]  = L
        count+=1

    if(x==1):
        return {"array":arr,"count":points_number, "rows":len(list(Points.keys())), "cols":len(list(Pointsy.keys())), "X":Points, "Y":Pointsy}
    elif(x==2):
        rows = len(list(Points.keys()))
        cols = len(list(Pointsy.keys()))
        print(rows, cols)
        res = []
        print(body)
        nodes = body['nodes']
        for j in nodes:
            a = 0
            b = 0
            a = j%rows 
            a = int((j - a) / cols)+1
            b = j%cols -1
            res.append(Points[a][b])
            print(a,b)
        traj,traj_images = get_trajectory(res,loc)



        loca = 'D:/Users/raghavendra/Desktop/New folder (2)/front/src' + '/project.mp4'

        # fourcc = cv2.VideoWriter_fourcc('m', 'p', '4', 'v')
        # out  = cv2.VideoWriter(loca, fourcc, 20,(960, 540))
        
        
        print(loca)
        #out = cv2.VideoWriter(loca,cv2.VideoWriter_fourcc(*'DIVX'), 15, )
 
        # for i in range(len(traj_images)):
        #     out.write(traj_images[i])
        # out.release()
        
        # print('this -:',os.getcwd(), '-end')

        return {"traj":traj} 
    
        
    
  
from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
  
class ReactView(APIView):

    def get(self, request):
        
        data = get_data(0)
        detail =  {"name": data} 
        return Response(detail)

    def post(self, request):
        
        # print(request.body)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        data = get_data(body)
        print("here also")
         
        return Response(data)

