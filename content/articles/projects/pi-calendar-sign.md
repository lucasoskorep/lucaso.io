Title: Pi Calendar Sign
Date: 2022-07-22
Category: projects
ProjectStatus: inactive
Authors: Lucas Oskorep
Gitlab: https://gitlab.com/lucasoskorep/pi-calendar-sign
UseReadme: true

[//]: # (anchor)
# Pi Calendar Sign

Assumes python3 as the base:
* python -m venv ./venv
* pip install -r requirements.txt
* sudo pip install adafruit-circuitpython-charlcd
* create your .auth.json file with a corresponding API key from GCP
* edit config.json to have a list of all the emails you want to track
* edit pi-calendar-sign.py to have the calendar names that you would like to receive events for. 
* python pi-calendar-sign.py

