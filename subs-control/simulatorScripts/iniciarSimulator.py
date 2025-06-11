import subprocess

Number = '001'

workdir = "scripts/simulatorDocker"

subprocess.run(['python3', f'{workdir}/iniciarEntidades2.py', Number])
subprocess.run(['python3', f'{workdir}/subscribeActuators.py', Number])
subprocess.run(['python3', f'{workdir}/subscribeDraco.py', Number])