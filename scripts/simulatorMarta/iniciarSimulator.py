import subprocess

Number = '001'

workdir = "scripts/simulatorMarta"

subprocess.run(['python', f'{workdir}/iniciarEntidades2.py', Number])
subprocess.run(['python', f'{workdir}/subscribeActuators.py', Number])
subprocess.run(['python', f'{workdir}/subscribeDraco.py', Number])