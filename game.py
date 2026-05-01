
import pygame
import sys

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("SPYDARR RACING")

clock = pygame.time.Clock()

# Colors
WHITE = (255,255,255)
GRAY = (50,50,50)
GREEN = (0,150,0)
YELLOW = (255,255,0)
BLUE = (0,200,255)

# Car
car_x = WIDTH//2 - 25
car_y = HEIGHT - 120
car_width = 50
car_height = 80

speed = 5
road_scroll = 0

running = True

while running:
    screen.fill(GREEN)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()

    if keys[pygame.K_LEFT]:
        car_x -= 6
    if keys[pygame.K_RIGHT]:
        car_x += 6

    if keys[pygame.K_UP]:
        speed += 0.1
    if keys[pygame.K_DOWN]:
        speed -= 0.1

    speed = max(2, min(speed, 15))

    # Draw road
    road_width = 400
    road_x = WIDTH//2 - road_width//2
    pygame.draw.rect(screen, GRAY, (road_x, 0, road_width, HEIGHT))

    # Road lines animation
    road_scroll += speed
    if road_scroll > 40:
        road_scroll = 0

    for i in range(0, HEIGHT, 40):
        pygame.draw.rect(screen, YELLOW, (WIDTH//2 - 5, i + road_scroll, 10, 20))

    # Draw car
    pygame.draw.rect(screen, BLUE, (car_x, car_y, car_width, car_height))

    # Boundaries
    if car_x < road_x:
        car_x = road_x
    if car_x > road_x + road_width - car_width:
        car_x = road_x + road_width - car_width

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
sys.exit()
