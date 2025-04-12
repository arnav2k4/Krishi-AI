import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import BatchNormalization
from sklearn.metrics import classification_report, confusion_matrix
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Define paths
data_dir = r'C:\Users\Param\Desktop\PRACTICUM\Wheat\Train'
img_size = (224, 224)
batch_size = 16

# Data Augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=15,
    width_shift_range=0.15,
    height_shift_range=0.15,
    zoom_range=0.15,
    shear_range=0.15,
    brightness_range=[0.95, 1.15],
    fill_mode='nearest',
    validation_split=0.2
)

train_dataset = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='sparse',
    subset='training'
)

val_dataset = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='sparse',
    subset='validation',
    shuffle=False
)

# Load Pretrained MobileNetV2
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = True  # Unfreeze the base model for fine-tuning

# Fine-tune specific layers
for layer in base_model.layers[:-25]:  # Freeze all layers except the last 25
    layer.trainable = False

# Custom Model on Top of MobileNetV2
x = GlobalAveragePooling2D()(base_model.output)
x = Dense(256, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.0035))(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)
x = Dense(128, activation='relu', kernel_regularizer=tf.keras.regularizers.l2(0.0035))(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)

output_layer = Dense(len(train_dataset.class_indices), activation='softmax')(x)

# Define Model
model = Model(inputs=base_model.input, outputs=output_layer)

# Compile Model
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.00004),
              loss='sparse_categorical_crossentropy', 
              metrics=['accuracy'])


# Train Model
history = model.fit(
    train_dataset,
    epochs=45,
    validation_data=val_dataset,
    verbose=1  # Ensures training accuracy is shown in the logs
)

# Print Final Training Accuracy
print(f"Final Training Accuracy: {history.history['accuracy'][-1]:.2%}")

# Evaluate Model
test_loss, test_acc = model.evaluate(val_dataset)
print(f"Validation Accuracy: {test_acc:.2%}")

# Generate Predictions for Classification Report
val_labels = np.array([])
val_preds = np.array([])

for images, labels in val_dataset:
    preds = model.predict(images)
    preds = np.argmax(preds, axis=1)
    val_labels = np.append(val_labels, labels)
    val_preds = np.append(val_preds, preds)
    if len(val_labels) >= val_dataset.samples:
        break

class_names = list(train_dataset.class_indices.keys())
print("\nClassification Report:")
print(classification_report(val_labels, val_preds, target_names=class_names))

# Confusion Matrix
conf_matrix = confusion_matrix(val_labels, val_preds)
plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, cmap="Blues", fmt="d", xticklabels=class_names, yticklabels=class_names)
plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.title("Confusion Matrix")
plt.show()

plt.figure(figsize=(8, 6))
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.title('Accuracy vs. Epoch')
plt.legend()
plt.grid()
plt.show()

# Save Model
model.save("all_3_classification_mobilenetv2.h5")
print("Model saved successfully!")
