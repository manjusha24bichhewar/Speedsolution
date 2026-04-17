import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect, text
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'change-this-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///speed_solution.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app, resources={r'/api/*': {'origins': '*'}})
    db.init_app(app)

    from .models.user import User
    from .models.enquiry import Enquiry
    from .routes.auth_routes import auth_bp
    from .routes.enquiry_routes import enquiry_bp
    from .routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(enquiry_bp, url_prefix='/api/enquiries')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    @app.get('/')
    def root():
        return {'message': 'Speed Solution API is running. Open /api/health to test.'}

    @app.get('/api/health')
    def health_check():
        return {'status': 'ok', 'message': 'Speed Solution backend is running'}

    with app.app_context():
        db.create_all()
        ensure_compatible_schema()
        seed_admin_if_missing(User)

    return app


def ensure_compatible_schema():
    inspector = inspect(db.engine)

    if 'enquiries' in inspector.get_table_names():
        enquiry_columns = {column['name'] for column in inspector.get_columns('enquiries')}
        if 'status' not in enquiry_columns:
            db.session.execute(text("ALTER TABLE enquiries ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'Pending'"))
        if 'completed_at' not in enquiry_columns:
            db.session.execute(text("ALTER TABLE enquiries ADD COLUMN completed_at DATETIME NULL"))

    if 'users' in inspector.get_table_names():
        user_columns = {column['name'] for column in inspector.get_columns('users')}
        if 'reset_otp' not in user_columns:
            db.session.execute(text("ALTER TABLE users ADD COLUMN reset_otp VARCHAR(10) NULL"))
        if 'reset_otp_expires_at' not in user_columns:
            db.session.execute(text("ALTER TABLE users ADD COLUMN reset_otp_expires_at DATETIME NULL"))

    db.session.commit()


def seed_admin_if_missing(User):
    admin = User.query.filter_by(email='admin@speedsolution.in').first()
    if admin:
        return

    admin = User(
        name='Admin',
        email='admin@speedsolution.in',
        phone='9076104510',
        is_admin=True
    )
    admin.set_password('Admin@123')
    db.session.add(admin)
    db.session.commit()
