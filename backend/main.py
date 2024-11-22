"""
Author: Tiffany Yang  
Date: November 21, 2024  

Application Factory:  
This module defines the `create_app` function for initializing and configuring the Flask application.  
It sets up database integration, RESTful API namespaces, Flask-Migrate for database migrations,  
CORS for cross-origin requests, and a shell context processor for interactive debugging.  

Key Features:  
- Configurable app setup using `config`.  
- RESTful API documentation available at `/docs`.  
- Middleware to log request information for debugging.  
"""


from flask import Flask
from flask_restx import Api
from exts import db
from models import Goal
from flask_migrate import Migrate
from goals import goals_ns
from flask_cors import CORS
from flask import request

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)

    migrate = Migrate(app, db)

    api = Api(app, doc='/docs')

    api.add_namespace(goals_ns)

    @app.before_request
    def log_request_info():
        print(f"Request received: {request.method} {request.url}")
        print(f"Headers: {request.headers}")

    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "Goal": Goal
        }

    return app
