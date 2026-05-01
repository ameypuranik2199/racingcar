
import pygame

pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Gesture Racing Prototype")

clock = pygame.time.Clock()

car_x = WIDTH // 2
car_y = HEIGHT - 100
speed = 0

running = True

while running:
    screen.fill((30, 30, 30))

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()

    if keys[pygame.K_LEFT]:
        car_x -= 5
    if keys[pygame.K_RIGHT]:
        car_x += 5

    if keys[pygame.K_UP]:
        speed += 0.2
    if keys[pygame.K_DOWN]:
        speed -= 0.2

    speed = max(0, min(speed, 10))

    # Move background (fake motion)
    car_y -= speed * 0.1

    pygame.draw.rect(screen, (0, 200, 255), (car_x, HEIGHT-100, 50, 80))

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
