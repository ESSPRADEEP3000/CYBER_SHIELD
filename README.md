# CyberShield: Real-Time XAI-Powered IP Threat Detection and Prevention System

CyberShield is a real-time threat detection and prevention system designed to analyze IP activity using explainable AI (XAI) models. It provides accurate risk assessments with transparent explanations, allowing users to mitigate cyber threats effectively.

## 🚀 **Features**
- Real-time IP analysis using AI-powered risk scoring.
- Integration with AbuseIPDB for threat intelligence.
- SHAP-based explainability for transparent risk explanations.
- Interactive dashboard for monitoring and managing threats.
- Automated prevention with rule-based blocking.

---

## 🧑‍💻 **Prerequisites**
Ensure the following are installed before running the system:
- **Node.js** (Backend & Frontend)
- **MongoDB** (Database)
- **Python 3.x** (For AI Model)
- **AbuseIPDB API Key**
- **Postman** (For API testing, optional)

---

## ⚙️ **Installation and Execution Steps**

### ✅ **1. Start Frontend (React.js)**
```bash
cd frontend
npm i
npm run dev
```
- Access the dashboard at: `http://localhost:5713`

---

### ✅ **2. Start Backend (Node.js + Express.js)**
```bash
cd backend
npm i
npm start
```
- API will be available at: `http://localhost:5000`

---

### ✅ **3. Start AI Model (Python)**
Confirm Python dependencies are installed using:
  ```bash
  pip install -r requirements.txt
  ```
```bash
cd ai_model
python ./model/generate_synthetic_data.py
```
```bash
python train_model.py
```
```bash
python app.py
```
- Ensure the model listens for incoming requests from the backend.

---

## 🧪 **Testing the System**
1. **Login to Dashboard**: Access `http://localhost:3000` and log in with your credentials.
2. **Analyze IPs**: Enter an IP address for analysis. The system will fetch data from AbuseIPDB and pass it to the AI model.
3. **View Results**: Check the risk score, detailed SHAP-based explanations, and IP reputation.
4. **Prevent Threats**: Block malicious IPs directly from the dashboard.

---

## 🛡️ **Troubleshooting**
- **Backend Errors**: Ensure API keys are correctly set in `.env` and MongoDB is running.
- **Frontend Not Loading**: Check for port conflicts and ensure React app builds using:
  ```bash
  npm run build
  ```

---

## 📫 **Contributing**
Feel free to contribute by submitting issues or pull requests. Ensure that your code follows the contribution guidelines.

---

## 📝 **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**CyberShield - Defend with Confidence!**

