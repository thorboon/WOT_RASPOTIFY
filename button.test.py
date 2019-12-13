import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(13, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(18, GPIO.OUT)

def button_callback(channel):
    print('pressed')
    GPIO.output(18,GPIO.HIGH)    
def button2_callback(channel):
    print('unpressed')   
    GPIO.output(18,GPIO.LOW)
    
GPIO.add_event_detect(10, GPIO.RISING, callback=button_callback, bouncetime=500)
GPIO.add_event_detect(13, GPIO.RISING, callback=button2_callback, bouncetime=500)
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

