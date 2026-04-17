import os
import random
import smtplib
from datetime import datetime, timedelta
from email.message import EmailMessage

from flask import Blueprint, jsonify, request
from app import db
from app.models.user import User
from app.utils.auth import generate_token, login_required

auth_bp = Blueprint('auth', __name__)


def send_email_otp(to_email: str, otp: str):
    smtp_host = os.getenv('SMTP_HOST')
    smtp_port = int(os.getenv('SMTP_PORT', '587'))
    smtp_user = os.getenv('SMTP_USER')
    smtp_password = os.getenv('SMTP_PASSWORD')
    smtp_sender = os.getenv('SMTP_SENDER', smtp_user or 'no-reply@speedsolution.in')

    if not all([smtp_host, smtp_user, smtp_password]):
        return False, 'SMTP settings are missing'

    message = EmailMessage()
    message['Subject'] = 'Speed Solution password reset OTP'
    message['From'] = smtp_sender
    message['To'] = to_email
    message.set_content(
        f"Your Speed Solution password reset OTP is {otp}. It will expire in 10 minutes."
    )

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=20) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(message)
        return True, None
    except Exception as exc:
        return False, str(exc)


@auth_bp.post('/register')
def register():
    data = request.get_json() or {}

    required_fields = ['name', 'email', 'phone', 'password']
    if any(not data.get(field) for field in required_fields):
        return jsonify({'message': 'All fields are required'}), 400

    if User.query.filter_by(email=data['email'].strip().lower()).first():
        return jsonify({'message': 'Email already registered'}), 409

    user = User(
        name=data['name'].strip(),
        email=data['email'].strip().lower(),
        phone=data['phone'].strip(),
        is_admin=False
    )
    user.set_password(data['password'])

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message': 'Registration successful',
        'token': generate_token(user),
        'user': user.to_dict()
    }), 201


@auth_bp.post('/login')
def login():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = data.get('password') or ''

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid email or password'}), 401

    return jsonify({
        'message': 'Login successful',
        'token': generate_token(user),
        'user': user.to_dict()
    })


@auth_bp.post('/forgot-password/request-otp')
def request_password_otp():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    if not email:
        return jsonify({'message': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'No account found with this email'}), 404

    otp = f"{random.randint(0, 999999):06d}"
    user.reset_otp = otp
    user.reset_otp_expires_at = datetime.utcnow() + timedelta(minutes=10)
    db.session.commit()

    sent, error_message = send_email_otp(user.email, otp)
    if sent:
        return jsonify({'message': 'OTP sent to your email. Please check your inbox.'})

    if os.getenv('FLASK_ENV', 'development').lower() != 'production':
        return jsonify({
            'message': 'SMTP is not configured, so demo OTP is returned for local testing.',
            'developer_otp': otp
        })

    return jsonify({'message': f'Could not send OTP email. {error_message or "Please contact support."}' }), 500


@auth_bp.post('/forgot-password/reset')
def reset_password():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    otp = (data.get('otp') or '').strip()
    new_password = data.get('new_password') or ''

    if not email or not otp or not new_password:
        return jsonify({'message': 'Email, OTP, and new password are required'}), 400

    if len(new_password) < 6:
        return jsonify({'message': 'Password must be at least 6 characters'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.reset_otp or user.reset_otp != otp:
        return jsonify({'message': 'Invalid OTP or email'}), 400

    if not user.reset_otp_expires_at or user.reset_otp_expires_at < datetime.utcnow():
        return jsonify({'message': 'OTP has expired. Please request a new one.'}), 400

    user.set_password(new_password)
    user.reset_otp = None
    user.reset_otp_expires_at = None
    db.session.commit()

    return jsonify({'message': 'Password reset successful. Please log in.'})


@auth_bp.get('/me')
@login_required()
def me(current_user):
    return jsonify({'user': current_user.to_dict()})
