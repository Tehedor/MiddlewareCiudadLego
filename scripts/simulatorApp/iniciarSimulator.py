import subprocess

Number = '001'

subprocess.run(['python3', './iniciarEntidades2.py', Number])
subprocess.run(['python3', './subscribeActuators.py', Number])
subprocess.run(['python3', './subscribeDraco.py', Number])

