# Convert hand positions to steering & speed

def calculate_steering(mid_x, screen_center):
    return (mid_x - screen_center) / screen_center

def calculate_speed(distance, min_d, max_d):
    return (distance - min_d) / (max_d - min_d)
