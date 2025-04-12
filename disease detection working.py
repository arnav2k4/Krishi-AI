import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import matplotlib.pyplot as plt

# Load your .h5 model
model = load_model(r"C:\Users\Param\Desktop\PRACTICUM\Model\all_3_classification_mobilenetv2.h5")

# Define input size expected by the model
img_size = (224, 224)

# Class labels
class_labels = [
    "Cotton Bacterial Blight", "Cotton Boll Rot", "Cotton Healthy", "Cotton Mildew",
    "Potato Common Scab", "Potato Dry Rot", "Potato Healthy", "Potato Scab",
    "Rice Leaf Blight", "Rice Healthy", "Rice Leaf Scald", "Rice Sheath Blight",
    "Wheat Black Rust", "Wheat Head Blight", "Wheat Healthy", "Wheat Mildew", "Wheat Smut"
]

# Folder path
folder_path = r'C:\Users\Param\Desktop\PRACTICUM\Model\Test'

# Loop through all image files
for filename in os.listdir(folder_path):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        img_path = os.path.join(folder_path, filename)

        # Load and preprocess image
        img = image.load_img(img_path, target_size=img_size)
        img_array = image.img_to_array(img)
        img_array_expanded = np.expand_dims(img_array, axis=0)
        img_array_expanded = img_array_expanded / 255.0  # Normalize

        # Predict
        prediction = model.predict(img_array_expanded)
        predicted_class_idx = np.argmax(prediction, axis=1)[0]
        predicted_label = class_labels[predicted_class_idx]

        # Display image with prediction
        plt.imshow(np.array(img))
        plt.title(f"{filename}\nPredicted: {predicted_label}")
        plt.axis('off')
        plt.show()
