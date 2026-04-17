from flask import Blueprint, jsonify, request
from app import db
from app.models.enquiry import Enquiry
from app.utils.auth import get_current_user

enquiry_bp = Blueprint('enquiries', __name__)


@enquiry_bp.post('')
def create_enquiry():
    data = request.get_json() or {}
    required_fields = ['name', 'phone', 'age', 'service_type', 'request_type']

    if any(data.get(field) in [None, ''] for field in required_fields):
        return jsonify({'message': 'Please fill all required fields'}), 400

    try:
        age = int(data['age'])
        if age < 1 or age > 120:
            raise ValueError
    except (TypeError, ValueError):
        return jsonify({'message': 'Age must be a valid number between 1 and 120'}), 400

    enquiry = Enquiry(
        name=data['name'].strip(),
        phone=str(data['phone']).strip(),
        age=age,
        service_type=data['service_type'].strip(),
        request_type=data['request_type'].strip(),
        message=(data.get('message') or '').strip() or None,
        user_id=getattr(get_current_user(), 'id', None)
    )

    db.session.add(enquiry)
    db.session.commit()

    return jsonify({'message': 'Enquiry saved successfully', 'enquiry': enquiry.to_dict()}), 201
