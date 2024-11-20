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
