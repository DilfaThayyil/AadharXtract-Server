````markdown
# 🔍 Aadhaar OCR System – Backend (Google Cloud Vision API)

This is the backend server for the **Aadhaar OCR System**, built using **Node.js** and **Express**, and powered by the **Google Cloud Vision API** for highly accurate OCR (Optical Character Recognition).

The backend receives Aadhaar card images (front and back), processes them through Google's OCR service, and returns the extracted text to the frontend.

---

## ⚙️ What It Does

✅ Accepts image uploads via a REST API  
✅ Uses Google Cloud Vision to extract Aadhaar details  
✅ Sends extracted information (Name, DOB, Aadhaar number, etc.) back to the frontend  
✅ Handles file validation, error handling, and edge cases gracefully  

---

## 🧰 Tech Stack

- 🟢 Node.js + Express
- ☁️ Google Cloud Vision API
- 📂 Multer (for handling file uploads)
- 🌍 CORS (cross-origin requests)
- 🔒 dotenv (for environment configuration)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DilfaThayyil/aadharXtract-Server.git
cd aadharXtract-Server
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Your `.env` File

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
GOOGLE_APPLICATION_CREDENTIALS=./your-google-key.json
```

Replace `your-google-key.json` with the actual file name of the service account key you downloaded.

---

### 🛠 Google Cloud Vision Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the **Vision API** for your project
3. Create a **Service Account**
4. Generate and download a **JSON key file**
5. Save the file in your backend project root
6. Set the path to this file in your `.env` as shown above

> ⚠️ **Important:** Never commit your key file or `.env` to version control. Add them to `.gitignore`.

---

## 📤 API Usage

### Endpoint: `POST /api/ocr`

* **Content-Type:** `multipart/form-data`
* **Fields:**

  * `frontImage`: Aadhaar front image file (required)
  * `backImage`: Aadhaar back image file (optional but recommended)

### ✅ Example Request (Using Postman or Form)

Send a `multipart/form-data` request with `frontImage` and `backImage` fields.

### 📦 Example Response

```json
{
  "success": true,
  "message": "Aadhaar data extracted successfully",
  "data": {
    "frontData": {
      "name": "Chauhan Parth Jatinbhai",
      "dob": "25/03/2015",
      "gender": "Male",
      "aadhaarNumber": "4309 2704 1446",
      "address": "..."
    },
    "backData": {
      "address": "..." // If available
    }
  }
}
```

---

## 🛡 Security Tips

* ✅ Sanitize and validate file types (e.g., accept only JPG/PNG)
* ✅ Limit file size using Multer (e.g., max 5MB)
* ✅ Use `.gitignore` to prevent `.env` and credential files from being committed

---

## 🧪 Testing the Server

To start the development server:

```bash
npm run dev
```

Or, if you don’t have nodemon installed:

```bash
node index.js
```

---

## 📁 .gitignore Example

```gitignore
node_modules/
.env
*.json
```

---

## 📬 Feedback & Contributions

Feel free to fork this repo, open issues, or submit pull requests!
Whether it's bug fixes, new features, or documentation updates — contributions are always welcome 🙌

---

## 📄 License

MIT License © 2025 [Dilfa Thayyil](https://github.com/DilfaThayyil)

```
