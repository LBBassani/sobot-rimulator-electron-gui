# Python code

def echo(text):
    """echo any text"""
    return text

from simulation.rimulatorcore.srimulatorcore.rimulators_samples.rimulator import Rimulator
from simulation.rimulatorcore.srimulatorcore.gui.viewer import Viewer
from simulation.rimulatorcore.srimulatorcore.sobots_samples.kheperaiii.kheperaiii import Kheperaiii
from random import random

robots_type = {
    "khepera3" : Kheperaiii
}

rimulator = None

def new_rimulator():
    global rimulator
    init_pos = [random(), random()]
    rimulator = Rimulator([(Kheperaiii, init_pos)])
    rimulator.add_viewer(Viewer(rimulator))
    rimulator.initialize_sim(True)
    return True

def draw_world():
    global rimulator
    rimulator.draw_world()
    return rimulator.viewer.current_frame.draw_list

def get_frame():
    global rimulator
    rimulator.step_sim_once()
    return draw_world()

def step_sim():
    global rimulator
    rimulator.step_sim_once()
    return draw_world()

def initialize_sim( random = False ):
    global rimulator
    rimulator.initialize_sim(random)
    return draw_world()

def play_sim():
    global rimulator
    rimulator.play_sim()
    return rimulator.is_running

def pause_sim():
    global rimulator
    return rimulator.pause_sim()

def get_sim_period():
    global rimulator
    return rimulator.period

def save_map( filename ):
    global rimulator
    rimulator.save_map( filename )

def load_map( filename ):
    global rimulator
    rimulator.load_map( filename )

def add_robot( robot_type , position):
    global rimulator
    try:
        rimulator.add_robot(robot_type)
        rimulator.update_robot((robot_type, position))
    except KeyError:
        return "Error : Not such robot"

def get_robots():
    global rimulator
    return rimulator.robot_type

def delete_robot ( robot_pos ):
    global rimulator
    try: 
        rimulator.delete_robot(robot_pos)
    except IndexError:
        return "Error : Not a robot in the simulation"

