const cropData = {
    WHEAT: `
      <h3 class="highlight">WHEAT</h3>
      <p>Wheat is one of the most important cereal crops globally, serving as a staple food for millions. Proper knowledge of its growth cycle, soil conditions, and disease management can significantly improve yield and quality.</p>
      
      <h4>🌱 Key Growing Requirements:</h4>
      <ul>
        <li>✅ <strong>Ideal Climate:</strong> Grows best in cool temperatures (10–25°C) with moderate rainfall.</li>
        <li>✅ <strong>Soil Type:</strong> Prefers well-drained loamy or clayey soil with pH between 6.0–7.5.</li>
        <li>✅ <strong>Water Requirement:</strong> Requires 4–6 irrigations, especially during root initiation, tillering, and grain filling.</li>
        <li>✅ <strong>Sowing Time:</strong> October–November (Rabi season in India).</li>
      </ul>
  
      <h4>🧪 Fertilizer & Nutrient Needs:</h4>
      <ul>
        <li>🌿 <strong>Nitrogen (N):</strong> Boosts leaf and grain development.</li>
        <li>🌿 <strong>Phosphorus (P):</strong> Strengthens root growth and plant establishment.</li>
        <li>🌿 <strong>Potassium (K):</strong> Enhances disease resistance and drought tolerance.</li>
      </ul>
  
      <h4>🛡 Common Diseases & Pests:</h4>
      <ul>
        <li>🟤 <strong>Rust (Yellow, Brown, Black):</strong> Use resistant varieties and fungicides like Propiconazole.</li>
        <li>🟣 <strong>Powdery Mildew:</strong> Ensure proper aeration and apply sulfur-based fungicides.</li>
        <li>⚫ <strong>Loose Smut:</strong> Treat certified seeds with Carbendazim.</li>
        <li>🪲 <strong>Aphids & Armyworms:</strong> Use neem oil or Imidacloprid-based sprays.</li>
      </ul>
  
      <h4>🌾 Yield & Harvesting:</h4>
      <ul>
        <li>✅ Matures in 110–150 days after sowing.</li>
        <li>✅ Harvest when the grains turn golden brown and moisture drops to 12–14%.</li>
        <li>✅ Proper threshing & storage to avoid pests.</li>
      </ul>
  
      <h4>💡 Tips for High Yield:</h4>
      <ul>
        <li>✔ Rotate crops (e.g., with pulses) for soil health.</li>
        <li>✔ Ensure timely irrigation and weed control.</li>
        <li>✔ Use disease-resistant certified wheat varieties.</li>
      </ul>
    `,
  
    RICE: `
      <h3 class="highlight">RICE</h3>
      <p>Rice is the staple food of more than half the global population and thrives in warm, humid climates. Efficient water management and pest control are crucial for optimum yields.</p>
      
      <h4>🌱 Key Growing Requirements:</h4>
      <ul>
        <li>✅ <strong>Ideal Climate:</strong> Warm and humid, 20–35°C.</li>
        <li>✅ <strong>Soil Type:</strong> Clayey soil with high water retention.</li>
        <li>✅ <strong>Water:</strong> Requires standing water, especially in the vegetative stage.</li>
        <li>✅ <strong>Sowing Time:</strong> May–July (Kharif), Nov–Feb (Rabi in some regions).</li>
      </ul>
  
      <h4>🧪 Fertilizer & Nutrient Needs:</h4>
      <ul>
        <li>🌿 <strong>Nitrogen:</strong> For lush green leaf growth.</li>
        <li>🌿 <strong>Phosphorus:</strong> For healthy roots and tillering.</li>
        <li>🌿 <strong>Potassium:</strong> Improves drought and disease tolerance.</li>
      </ul>
  
      <h4>🛡 Common Diseases & Pests:</h4>
      <ul>
        <li>⚠ <strong>Blast Disease:</strong> Treated with Tricyclazole or resistant varieties.</li>
        <li>⚠ <strong>Sheath Blight:</strong> Improve spacing and apply fungicides like Validamycin.</li>
        <li>🪲 <strong>Stem Borers:</strong> Use pheromone traps or neem-based biopesticides.</li>
      </ul>
  
      <h4>🌾 Yield & Harvesting:</h4>
      <ul>
        <li>✅ Maturity depends on variety: 100–150 days.</li>
        <li>✅ Harvest at 20–25% grain moisture; reduce to 13% for storage.</li>
      </ul>
    `,
  
    COTTON: `
      <h3 class="highlight">COTTON</h3>
      <p>Cotton is a fiber crop critical to the textile industry. Its cultivation requires warm temperatures, pest monitoring, and water-efficient practices.</p>
  
      <h4>🌱 Key Growing Requirements:</h4>
      <ul>
        <li>✅ <strong>Ideal Climate:</strong> Warm, 25–35°C with dry harvest conditions.</li>
        <li>✅ <strong>Soil Type:</strong> Deep black soil or well-drained sandy loam.</li>
        <li>✅ <strong>Water:</strong> Moderate irrigation, avoid waterlogging.</li>
        <li>✅ <strong>Sowing Time:</strong> April–June.</li>
      </ul>
  
      <h4>🧪 Fertilizer & Nutrient Needs:</h4>
      <ul>
        <li>🌿 Balanced NPK and micronutrients like zinc and boron.</li>
      </ul>
  
      <h4>🛡 Common Diseases & Pests:</h4>
      <ul>
        <li>⚠ <strong>Bollworm:</strong> Use Bt cotton or neem-based sprays.</li>
        <li>🪲 <strong>Whitefly:</strong> Imidacloprid or Flonicamid recommended.</li>
        <li>⚠ <strong>Leaf Curl Virus:</strong> Managed through resistant varieties.</li>
      </ul>
  
      <h4>🌾 Yield & Harvesting:</h4>
      <ul>
        <li>✅ Ready in 150–180 days after sowing.</li>
        <li>✅ Harvest in multiple pickings when bolls open fully.</li>
      </ul>
    `,
  
    POTATO: `
      <h3 class="highlight">POTATO</h3>
      <p>Potato is a key vegetable crop rich in starch. It thrives in cool conditions and well-prepared, loose soil with good moisture.</p>
  
      <h4>🌱 Key Growing Requirements:</h4>
      <ul>
        <li>✅ <strong>Ideal Climate:</strong> Cool, 15–20°C, frost-free.</li>
        <li>✅ <strong>Soil Type:</strong> Loose, loamy, well-drained soil with pH 5.5–6.5.</li>
        <li>✅ <strong>Water:</strong> Light, frequent irrigation especially during tuber formation.</li>
        <li>✅ <strong>Sowing Time:</strong> October–December in plains.</li>
      </ul>
  
      <h4>🧪 Fertilizer & Nutrient Needs:</h4>
      <ul>
        <li>🌿 Nitrogen + Phosphorus + Potassium, along with calcium and sulfur.</li>
      </ul>
  
      <h4>🛡 Common Diseases & Pests:</h4>
      <ul>
        <li>⚠ <strong>Late Blight:</strong> Spray Mancozeb or metalaxyl fungicide.</li>
        <li>🪲 <strong>Cutworms & Aphids:</strong> Use neem extract or light traps.</li>
      </ul>
  
      <h4>🌾 Yield & Harvesting:</h4>
      <ul>
        <li>✅ Ready in 90–120 days.</li>
        <li>✅ Harvest when leaves yellow and fall over.</li>
        <li>✅ Avoid bruising during harvest and store in a cool, dry place.</li>
      </ul>
    `
  };
  
  document.getElementById("cropSelect").addEventListener("change", function () {
    const selectedCrop = this.value;
    const contentDiv = document.getElementById("cropContent");
    contentDiv.innerHTML = cropData[selectedCrop] || "";
  });