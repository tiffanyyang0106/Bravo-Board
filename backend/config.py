from decouple import config

class Config:
    SECRET_KEY = config('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = config('SQLALCHEMY_TRACK_MODIFICATIONS',cast=bool)

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = config('SQLALCHEMY_DATABASE_DEV_URI')
    DEBUG = True
    SQLALCHEMY_ECHO = True

class ProdConfig(Config):
    pass

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = config('SQLALCHEMY_DATABASE_TEST_URI')
    TESTING = True
    SQLALCHEMY_ECHO = False