"""
Author: Tiffany Yang  
Date: November 21, 2024  

Goals Namespace:  
This module defines a RESTful API for managing goals using Flask-RESTx.  
It provides endpoints for creating, retrieving, updating, deleting,  
and reordering goals.  

Key Features:  
- `/hello`: A simple hello world endpoint for testing.  
- `/goals`: Manage all goals (GET all, POST new).  
- `/goal/<int:id>`: Manage individual goals (GET, PUT, DELETE).  
- `/order`: Batch update endpoint to reorder and update goal statuses.  

Key Models and Dependencies:  
- `Goal`: SQLAlchemy model for goals.  
- `goal_model`: API model for request/response serialization.  
- `db`: SQLAlchemy database session for operations.  
"""


from flask_restx import Namespace, Resource, fields
from models import Goal
from flask import request
from exts import db  # Import the db object

goals_ns=Namespace('goals', description = "A namespace for Goals.")

# Model (serializer)
goal_model = goals_ns.model(
    "Goal",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String(),
        "status": fields.String(),
        "order": fields.Integer(),
    }
)

@goals_ns.route('/hello')
class HelloResource(Resource):
    def get(self):
        print("Request received at /hello")
        return {"message": "Hello World"}


@goals_ns.route('/goals')
class GoalsResource(Resource):

    @goals_ns.marshal_list_with(goal_model)
    def get(self):
        """Get all goals"""
        goals = Goal.query.order_by(Goal.order).all()  # Fetch goals in order
        return goals
    
    @goals_ns.marshal_with(goal_model)
    @goals_ns.expect(goal_model)
    def post(self):
        """Create a new goal"""
        data = request.get_json()
        
        # Determine the new goal's order
        max_order = db.session.query(db.func.max(Goal.order)).scalar()
        new_order = (max_order + 1) if max_order is not None else 0

        # Create the new goal
        new_goal = Goal(
            title=data.get('title'),
            description=data.get('description'),
            status=data.get('status', 'to do'),  # Default to 'to do' if not provided
            order=new_order  # Set the calculated order
        )
        new_goal.save()
        return new_goal, 201


@goals_ns.route('/goal/<int:id>')
class GoalResource(Resource):
    
    @goals_ns.marshal_with(goal_model)
    def get(self, id):
        """Get a goal by id"""
        goal = Goal.query.get_or_404(id)
        return goal

    @goals_ns.marshal_with(goal_model)
    @goals_ns.expect(goal_model)
    def put(self, id):
        """Update a goal by id"""
        goal_to_update = Goal.query.get_or_404(id)
        data = request.get_json()
        goal_to_update.update(
            title=data.get('title'),
            description=data.get('description'),
            status=data.get('status'),
        )
        return goal_to_update

    def delete(self, id):
        """Delete a goal by id"""
        goal_to_delete = Goal.query.get_or_404(id)
        goal_to_delete.delete()
        return {"message": "Goal deleted successfully"}, 200

@goals_ns.route('/order')
class GoalsOrderResource(Resource):
    def put(self):
        print("Batch update received")
        data = request.get_json()
        print("Payload:", data)

        goal_ids = data.get('order')
        if not isinstance(goal_ids, list):
            return {"error": "Invalid data format. Expected a list of goal IDs."}, 400

        try:
            for index, goal in enumerate(goal_ids):
                goal_id = goal.get("id")
                if goal_id is None:
                    raise ValueError(f"Missing 'id' in goal: {goal}")
                
                goal_to_update = Goal.query.get(goal_id)
                if not goal_to_update:
                    raise ValueError(f"Goal with id {goal_id} not found")
                
                goal_to_update.order = index  # Update order
                goal_to_update.status = goal.get("status", goal_to_update.status)  # Update status if provided

            db.session.commit()
            return {"message": "Goal order updated successfully"}, 200

        except Exception as e:
            db.session.rollback()  # Rollback in case of error
            print("Error during batch update:", str(e))  # Log the error
            return {"error": f"An error occurred: {str(e)}"}, 500
