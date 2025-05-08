# 🔍 Aadhaar OCR System – Backend (Google Cloud Vision API)

This is the backend server for the **Aadhaar OCR System**, built using **Node.js** and **Express**, powered by **Google Cloud Vision API** for highly accurate OCR.

The backend receives Aadhaar card images (front and back), processes them through Google's OCR, and returns the extracted text to the frontend.

---

## ⚙️ What It Does

✅ Accepts image uploads via a REST API  
✅ Uses Google Cloud Vision to extract Aadhaar details  
✅ Sends extracted info (name, DOB, Aadhaar number, etc.) back to the frontend  
✅ Handles file validation and errors gracefully

---

## 🧰 Tech Stack

- 🟢 Node.js + Express
- ☁️ Google Cloud Vision API
- 📂 Multer (for handling file uploads)
- 🌍 CORS (cross-origin requests)
- 🔒 dotenv (for config)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DilfaThayyil/aadharXtract-Server.git
cd aadharXtract-Server
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Your .env File
Create a .env in the root folder:

env
Copy
Edit
PORT=5000
GOOGLE_APPLICATION_CREDENTIALS=./path-to-your-service-account.json
GOOGLE_APPLICATION_CREDENTIALS should point to the service account key file from Google Cloud.

🛠 Google Cloud Setup
Go to Google Cloud Console

Enable the Vision API

Create a Service Account

Generate and download the JSON key

Place it in your project directory and reference it in your .env

🧪 API Usage
📤 POST /api/ocr
Request:

Content-Type: multipart/form-data

Fields:

frontImage: Aadhaar front image file

backImage: Aadhaar back image file (optional but recommended)

Response:

json
Copy
Edit
{
  "frontData": { ...extractedText },
  "backData": { ...extractedText }
}
📁 Project Structure
bash
Copy
Edit
aadhaar-ocr-backend/
├── controllers/
│   └── ocrController.js
├── routes/
│   └── ocrRoutes.js
├── services/
│   └── googleVision.js
├── uploads/
├── .env
├── app.js
└── package.json
💡 Notes
Accepts only image files (JPG, PNG)

Frontend must send valid image data via multipart/form-data

Make sure your Google Cloud credentials are not pushed to GitHub!

🛡 Security Tips
Sanitize file names & validate file types

Limit file size uploads using multer

Always keep .env and service account JSON in .gitignore

📬 Feedback & Contributions
Feel free to fork, open issues, or submit PRs! Whether it's bug fixes, new features, or documentation updates — it's all welcome 🙌

📄 License
This project is open-source under the MIT License.

yaml
Copy
Edit

---

Let me know if you'd like:
- A `.gitignore` for the backend  
- `vercel.json` / `render.yaml` deployment guide  
- Swagger or Postman API doc  
Happy to help!
