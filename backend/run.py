"""
Author: Tiffany Yang  
Date: November 21, 2024  

Application Entry Point:  
This script initializes and runs the Flask application using the development configuration.  
- Imports the `create_app` factory method from the main module.  
- Uses `DevConfig` for development-specific settings.  
- Starts the app on the default Flask development server.  
"""

from main import create_app
from config import DevConfig

if __name__ == '__main__':
    app = create_app(DevConfig)
    app.run()