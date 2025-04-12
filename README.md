# Krishi-AI

Krishi AI is an intelligent farming assistant that leverages Machine Learning and Web Technologies to help farmers detect crop diseases and get recommendations for crop rotation.

Key Features
✅ Crop Disease Detection - Uses MobileNetV2 for accurate disease classification
✅ Crop Rotation Recommendations: Get optimized crop rotation suggestions
✅ Farmer-Friendly Interface - Easy-to-use web and mobile interface
✅ Data-Driven Insights - Connects to a database for storing and analyzing farm data

Technologies Used:

Machine Learning Models:
Disease Detection: MobileNetV2 (Transfer Learning)
Crop Rotation: Multiclass Classification

Frontend:
HTML, CSS, JavaScript - For responsive web design
Bootstrap - For UI enhancements

Backend & Database:
Node.js - Server-side logic
Express.js - REST API development

MySQL/PostgreSQL - Database for storing user and farm data

Server & Deployment
RESTful API - Connects frontend to ML models and database

JWT Authentication - Secure user login and data access

How It Works?
User Uploads Crop Image → ML model detects disease.
User provides the previoous crop details, soil type and future growing season → ML Model gives suggestion about the next crop to plant with reasoning.
