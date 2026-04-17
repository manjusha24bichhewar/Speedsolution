# Speed Solution Full-Stack Project

A cleaned and deployment-ready full-stack project for Speed Solution.

## What is included
- React + Vite frontend
- Flask backend
- Admin dashboard to view enquiries
- Mark enquiry as completed
- Auto-delete completed enquiries after 10 days
- Forgot password with OTP by email
- Contact details updated to:
  - Phone: +919076104510
  - Email: speedsolution25@yahoo.com
  - WhatsApp: +919076104510
  - Location: New Mumbai, Maharashtra, India

## Default admin login
- Email: `admin@speedsolution.in`
- Password: `Admin@123`

Change this after first successful login.

## Local run

### Backend
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

Backend runs at `http://127.0.0.1:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`

## Important environment variables

### Backend (`backend/.env`)
```env
FLASK_ENV=development
SECRET_KEY=change-this-secret-key
DATABASE_URL=sqlite:///speed_solution.db
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SENDER=speedsolution25@yahoo.com
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://127.0.0.1:5000/api
```

## Forgot password OTP notes
- In local/development mode, if SMTP is not configured, the backend returns a demo OTP in the API response so you can test easily.
- In production, configure SMTP on Render so OTP emails can be sent properly.

## Deploy on Render (backend)
This repo includes `render.yaml`, or you can create the service manually:
- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn run:app`

Recommended environment variables on Render:
```env
FLASK_ENV=production
SECRET_KEY=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SENDER=speedsolution25@yahoo.com
```

## Deploy on Vercel (frontend)
Set Vercel root directory to `frontend`.

Add environment variable:
```env
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
```

A `frontend/vercel.json` file is already included so routes like `/login`, `/admin`, and `/forgot-password` work correctly.

## Features added in this updated package
1. Contact/location updated to New Mumbai
2. Admin can mark enquiries as completed
3. Completed enquiries auto-delete after 10 days
4. Forgot password with OTP via email
5. React route fix for Vercel
6. Cleaner project structure for deployment

## Notes
- This package is cleaned for easier GitHub upload. Generated folders like `node_modules`, `venv`, `.git`, and local DB files were removed.
- On first backend run, the database and seeded admin account are created automatically.
