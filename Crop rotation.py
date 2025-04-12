import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2
import joblib

# 🔹 Fix Random Seed for Consistency
np.random.seed(50)
tf.random.set_seed(50)

# 🌾 Expanded Training Data
data = {
    "previous_crop": [
        "Rice", "Wheat", "Potato", "Tomato", "Corn", "Barley", "Peas", "Rice", "Wheat", "Peas",
        "Soybean", "Sugarcane", "Cotton", "Groundnut", "Millet", "Rice", "Wheat", "Maize", "Peas", "Barley"
    ],
    "soil_type": [
        "Clay", "Loam", "Sandy", "Loam", "Clay", "Sandy", "Loam", "Loam", "Clay", "Sandy",
        "Sandy", "Clay", "Loam", "Sandy", "Loam", "Clay", "Loam", "Sandy", "Clay", "Loam"
    ],
    "season": [
        "Kharif", "Rabi", "Rabi", "Kharif", "Kharif", "Rabi", "Rabi", "Rabi", "Kharif", "Kharif",
        "Kharif", "Kharif", "Kharif", "Kharif", "Rabi", "Rabi", "Rabi", "Kharif", "Rabi", "Rabi"
    ],
    "suggested_crop": [
        "Lentils", "Mustard", "Cabbage", "Spinach", "Peas", "Carrot", "Wheat", "Mustard", "Lentils", "Corn",
        "Chickpea", "Sugar Beet", "Sunflower", "Sesame", "Oats", "Soybean", "Barley", "Sorghum", "Rye", "Flaxseed"
    ]
}
df = pd.DataFrame(data)

# 🔹 One-Hot Encode Categorical Data
encoder = OneHotEncoder()
X = encoder.fit_transform(df[["previous_crop", "soil_type", "season"]]).toarray()

y_encoder = OneHotEncoder()
y = y_encoder.fit_transform(df[["suggested_crop"]]).toarray()

# 🔹 Split Data for Better Generalization
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=50)

# 🔥 Optimized Deep Learning Model
model = Sequential([
    Dense(128, activation='relu', kernel_regularizer=l2(0.001), input_shape=(X.shape[1],)),
    BatchNormalization(),
    Dropout(0.1),
    
    Dense(64, activation='relu', kernel_regularizer=l2(0.001)),
    BatchNormalization(),
    Dropout(0.1),
    
    Dense(y.shape[1], activation='softmax')
])

# 🔹 Compile Model with Accuracy Tracking
optimizer = Adam(learning_rate=0.001)
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])

# 🚀 Train Model with Validation Accuracy Tracking
history = model.fit(X_train, y_train, epochs=100, batch_size=16, validation_data=(X_test, y_test), verbose=1)

# ✅ Save the Trained Model & Encoders
model.save("crop_rotation_model.keras")
joblib.dump(encoder, "feature_encoder.pkl")
joblib.dump(y_encoder, "label_encoder.pkl")

# ✅ Display Final Training & Validation Accuracy
final_train_acc = history.history['accuracy'][-1]
final_val_acc = history.history['val_accuracy'][-1] if 'val_accuracy' in history.history else "N/A"

print(f"\n✅ Final Training Accuracy: {final_train_acc:.4f}")

# 🔹 Manually Compute Validation Accuracy if Not Displayed
if final_val_acc == "N/A":
    val_predictions = model.predict(X_test)
    val_pred_classes = np.argmax(val_predictions, axis=1)
    val_true_classes = np.argmax(y_test, axis=1)

    val_accuracy = np.mean(val_pred_classes == val_true_classes)
    print(f"🔹 Computed Validation Accuracy: {val_accuracy:.4f}")
