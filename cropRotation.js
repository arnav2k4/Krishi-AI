function getRecommendation() {
    const previousCrop = document.getElementById("previousCrop").value;
    const soilType = document.getElementById("soilType").value;
    const season = document.getElementById("season").value;
    let crop = "";
    let reason = "";
  
    // Rule-based logic
    if (["Wheat", "Corn", "Rice", "Maize", "Sugarcane"].includes(previousCrop)) {
      reason += "The previous crop depleted nitrogen, so the suggested crop helps restore soil fertility. ";
    } else if (["Peas", "Lentils", "Soybean", "Groundnut"].includes(previousCrop)) {
      reason += "Since the previous crop fixed nitrogen, the suggested crop can utilize the enriched soil. ";
    }
  
    if (soilType === "Clay") {
      reason += "Clay soil retains moisture well, so the suggested crop is chosen for such conditions. ";
    } else if (soilType === "Sandy") {
      reason += "Sandy soil drains quickly, so the crop should be drought-resistant. ";
    } else if (soilType === "Loam") {
      reason += "Loam is ideal for most crops due to its balanced nature. ";
    }
  
    if (season === "Kharif") {
      reason += "The crop should thrive in monsoon conditions. ";
    } else if (season === "Rabi") {
      reason += "The crop should be suitable for cooler, drier conditions. ";
    }
  
    // Example suggestions (simplified)
    if (previousCrop === "Rice" && soilType === "Clay" && season === "Rabi") {
      crop = "Wheat";
    } else if (previousCrop === "Peas" && soilType === "Loam" && season === "Kharif") {
      crop = "Corn";
    } else if (previousCrop === "Soybean" && soilType === "Sandy" && season === "Rabi") {
      crop = "Barley";
    } else {
      crop = "Lentils"; // default
    }
  
    // ✅ Proper DOM update using template literal
    document.getElementById("result").innerHTML = `🌱 Recommended Crop: <strong>${crop}</strong><br>📌 Reason: ${reason}`;
  }
  