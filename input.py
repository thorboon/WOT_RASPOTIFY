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


def button_callback(channel):
   keyboard.press(">")
   keyboard.release(">")
   print('gay')
    
def button2_callback(channel):
    keyboard.press("+")
    keyboard.release("+")
    
def button3_callback(channel):
    keyboard.press("a")
    keyboard.release("a")
    print('quinten')

def button4_callback(channel):
    keyboard.press("q")
    keyboard.release("q")
    print('quinten')

GPIO.add_event_detect(19, GPIO.RISING, callback=button_callback, bouncetime=500)
GPIO.add_event_detect(11, GPIO.RISING, callback=button3_callback, bouncetime=500)
GPIO.add_event_detect(13, GPIO.RISING, callback=button2_callback, bouncetime=500)
GPIO.add_event_detect(9, GPIO.RISING, callback=button4_callback, bouncetime=500)
GPIO.add_event_detect(23, GPIO.RISING, callback=button_callback, bouncetime=500)
GPIO.add_event_detect(24, GPIO.RISING, callback=button2_callback, bouncetime=500)
GPIO.add_event_detect(25, GPIO.RISING, callback=button3_callback, bouncetime=500)
GPIO.add_event_detect(7, GPIO.RISING, callback=button3_callback, bouncetime=500)
GPIO.add_event_detect(18, GPIO.RISING, callback=button3_callback, bouncetime=500)
GPIO.add_event_detect(8, GPIO.RISING, callback=button3_callback, bouncetime=500)

message = input("Press enter to quitbegay")

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

