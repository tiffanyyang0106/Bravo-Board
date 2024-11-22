"""
Author: Tiffany Yang
Date: November 21, 2024

APITestCase:
Unit test suite for testing the Flask application's API endpoints.
- Uses Flask's test client for HTTP requests.
- Tests CRUD operations on goals (Create, Read, Update, Delete).
- Ensures database is set up and torn down for each test to maintain isolation.
"""


import unittest
from main import create_app
from config import TestConfig
from exts import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        
        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.create_all()

    def test_hello_world(self):
        hello_response = self.client.get('/goals/hello')
        json = hello_response.json
        # print(json)
        self.assertEqual(json, {"message": "Hello World"})
    
    def test_get_all_goal(self):
        """TEST GETTING ALL RECIPES"""
        response = self.client.get('/goals/goals')
        status_code = response.status_code
        # print(status_code)
        self.assertEqual(status_code, 200)

    def test_get_one_goal(self):
        id = 1
        response = self.client.get(f'/goals/goal/{id}')
        status_code = response.status_code
        # print(status_code)
        self.assertEqual(status_code, 404)

    def test_create_goal(self):
        create_goal_response = self.client.post(
            '/goals/goals',
            json = {
                "title" : "test goal",
                "description" : "Test description"
            }
        )
        status_code = create_goal_response.status_code
        # print(create_goal_response.json)
        self.assertEqual(status_code, 201)

    def test_update_goal(self):
        create_goal_response = self.client.post(
            '/goals/goals',
            json = {
                "title" : "test goal",
                "description" : "Test description"
            }
        )
        status_code = create_goal_response.status_code
        
        id = 1

        update_response = self.client.put(
            f'goals/goal/{id}',
            json = {
                "title" : "test goal updated",
                "description" : "Test descriptio updated"
            }
        )

        # print(update_response.json)
        status_code = update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_goal(self):
        create_goal_response = self.client.post(
            '/goals/goals',
            json = {
                "title" : "test goal",
                "description" : "Test description"
            }
        )

        id = 1
        delete_response = self.client.delete(
            f'/goals/goal/{id}',
        )

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == "__main__":
    unittest.main()

