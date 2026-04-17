from functools import wraps
from datetime import datetime, timedelta, timezone
import jwt
from flask import current_app, jsonify, request
from app.models.user import User


def generate_token(user):
    payload = {
        'sub': user.id,
        'is_admin': user.is_admin,
        'exp': datetime.now(timezone.utc) + timedelta(days=1)
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')


def decode_token(token):
    return jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])


def get_current_user():
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None

    token = auth_header.split(' ', 1)[1]
    try:
        payload = decode_token(token)
        return User.query.get(payload['sub'])
    except Exception:
        return None


def login_required(admin_only=False):
    def decorator(view_fn):
        @wraps(view_fn)
        def wrapper(*args, **kwargs):
            user = get_current_user()
            if not user:
                return jsonify({'message': 'Authentication required'}), 401
            if admin_only and not user.is_admin:
                return jsonify({'message': 'Admin access required'}), 403
            return view_fn(user, *args, **kwargs)
        return wrapper
    return decorator
