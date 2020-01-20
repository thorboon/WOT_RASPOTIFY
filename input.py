import RPi.GPIO as GPIO
import time
import sys
from pynput.keyboard import Key, Controller

keyboard = Controller()
# joystick
# geel: boven
# oranje: onder
# rood : rechts
# bruin : links
 
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(19, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(11, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(13, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(9, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(24, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(25, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(7, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(8, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(17,GPIO.OUT)

def upbutton_callback(channel):
   keyboard.press("z")
   keyboard.release("z")
   GPIO.output(17,GPIO.HIGH)
   print('up')
    
def downbutton_callback(channel):
    keyboard.press("s")
    keyboard.release("s")
    GPIO.output(17,GPIO.HIGH)
    print('down')
    
def leftbutton_callback(channel):
    keyboard.press("q")
    GPIO.output(17,GPIO.HIGH)
    print('left')

def rightbutton_callback(channel):
    keyboard.press("d")
    keyboard.release("d")
    GPIO.output(17,GPIO.HIGH)
    print('right')
    
def enterbutton_callback(channel):
    keyboard.press(Key.enter)
    keyboard.release(Key.enter)
    GPIO.output(17,GPIO.HIGH)
    print('enter')

def playbutton_callback(channel):
    keyboard.press(Key.space)
    keyboard.release(Key.space)
    GPIO.output(17,GPIO.HIGH)
    print('play')

def louderbutton_callback(channel):
    keyboard.press(Key.up)
    keyboard.release(Key.up)
    GPIO.output(17,GPIO.HIGH)
    print('louder')

def quietbutton_callback(channel):
    keyboard.press(Key.down)
    keyboard.release(Key.down)
    GPIO.output(17,GPIO.HIGH)
    print('quiet')
    
def nextbutton_callback(channel):
    keyboard.press(Key.right)
    keyboard.release(Key.right)
    GPIO.output(17,GPIO.HIGH)
    print('next')   

def prevbutton_callback(channel):
    keyboard.press(Key.left)
    keyboard.release(Key.left)
    GPIO.output(17,GPIO.HIGH)
    print('prev')   
          
GPIO.add_event_detect(19, GPIO.RISING, callback=upbutton_callback, bouncetime=500)
GPIO.add_event_detect(11, GPIO.RISING, callback=downbutton_callback, bouncetime=500)
GPIO.add_event_detect(13, GPIO.RISING, callback=leftbutton_callback, bouncetime=500)
GPIO.add_event_detect(9, GPIO.RISING, callback=rightbutton_callback, bouncetime=500)
GPIO.add_event_detect(23, GPIO.RISING, callback=enterbutton_callback, bouncetime=500)
GPIO.add_event_detect(24, GPIO.RISING, callback=playbutton_callback, bouncetime=500)
GPIO.add_event_detect(25, GPIO.RISING, callback=louderbutton_callback, bouncetime=500)
GPIO.add_event_detect(7, GPIO.RISING, callback=quietbutton_callback, bouncetime=500)
GPIO.add_event_detect(18, GPIO.RISING, callback=nextbutton_callback, bouncetime=500)
GPIO.add_event_detect(8, GPIO.RISING, callback=prevbutton_callback, bouncetime=500)

message = input("Press enter to quit")

try:
    while True:
        time.sleep(.01)
except KeyboardInterrupt:
    GPIO.cleanup()
        
#while True:
#    if GPIO.input(10) == GPIO.HIGH:
#        print("Button was pushed!")
#
#from gpiozero import Button
#from time import sleep
#
#button = Button(10)
#
#while True:
#    if button.is_pressed:
#        print("Released bro")
#    else:
#        print("pressed bro")
#    sleep(0.2)

#util.prompt_for_user_token('Thor Boonaert',scope,client_id='cb9f4b6e53f04222a35e5483f73c56bf',client_secret='c7def0c8964b46a89f44bcd13325eb16', redirect_uri='http://localhost