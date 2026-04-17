from datetime import datetime, timedelta
from flask import Blueprint, jsonify
from sqlalchemy import func
from app.models.enquiry import Enquiry
from app.utils.auth import login_required
from app import db

admin_bp = Blueprint('admin', __name__)


def cleanup_old_completed():
    cutoff = datetime.utcnow() - timedelta(days=10)
    old_items = Enquiry.query.filter(
        Enquiry.status == 'Completed',
        Enquiry.completed_at.isnot(None),
        Enquiry.completed_at < cutoff
    ).all()

    for item in old_items:
        db.session.delete(item)

    if old_items:
        db.session.commit()


@admin_bp.get('/summary')
@login_required(admin_only=True)
def summary(current_user):
    cleanup_old_completed()
    total_enquiries = Enquiry.query.count()
    pending_enquiries = Enquiry.query.filter_by(status='Pending').count()
    completed_enquiries = Enquiry.query.filter_by(status='Completed').count()
    unique_services = db.session.query(func.count(func.distinct(Enquiry.service_type))).scalar() or 0

    return jsonify({
        'summary': {
            'total_enquiries': total_enquiries,
            'pending_enquiries': pending_enquiries,
            'completed_enquiries': completed_enquiries,
            'unique_services': unique_services
        }
    })


@admin_bp.get('/enquiries')
@login_required(admin_only=True)
def enquiries(current_user):
    cleanup_old_completed()
    items = Enquiry.query.order_by(Enquiry.created_at.desc()).all()
    return jsonify({'enquiries': [item.to_dict() for item in items]})


@admin_bp.patch('/enquiries/<int:enquiry_id>/complete')
@login_required(admin_only=True)
def mark_completed(current_user, enquiry_id):
    cleanup_old_completed()
    enquiry = Enquiry.query.get_or_404(enquiry_id)
    enquiry.status = 'Completed'
    enquiry.completed_at = datetime.utcnow()
    db.session.commit()

    return jsonify({
        'message': 'Enquiry marked as completed',
        'enquiry': enquiry.to_dict()
    })
