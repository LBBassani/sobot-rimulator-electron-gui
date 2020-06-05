# Python code

def echo(text):
    """echo any text"""
    return text

from simulation.rimulatorcore.srimulatorcore.rimulators_samples.rimulator import Rimulator
from simulation.rimulatorcore.srimulatorcore.gui.viewer import Viewer
from simulation.rimulatorcore.srimulatorcore.sobots_samples.kheperaiii.kheperaiii import Kheperaiii
from random import random

rimulator = None

def new_rimulator():
    global rimulator
    init_pos = [random(), random()]
    rimulator = Rimulator([(Kheperaiii, init_pos)])
    rimulator.add_viewer(Viewer(rimulator))
    rimulator.initialize_sim(True)
    return True


def get_frame():
    global rimulator
    rimulator.step_sim_once()
    rimulator.draw_world()
    return rimulator.viewer.current_frame.draw_list

