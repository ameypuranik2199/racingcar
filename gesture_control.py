
# OPTIONAL: Gesture detection (prints values)

import cv2
import mediapipe as mp
import math

mp_hands = mp.solutions.hands
cap = cv2.VideoCapture(0)

with mp_hands.Hands() as hands:
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(image)

        if results.multi_hand_landmarks:
            print("Hands detected")

        cv2.imshow("Feed", frame)
        if cv2.waitKey(1) & 0xFF == 27:
            break

cap.release()
cv2.destroyAllWindows()
