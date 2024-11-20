from flask_restx import Namespace, Resource, fields
from models import Goal
from flask import request

goals_ns=Namespace('goals', description = "A namespace for Goals.")

# Model (serializer)
goal_model = goals_ns.model(
    "Goal",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String(),
        "status": fields.String()
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
        goals = Goal.query.all()
        return goals
    
    @goals_ns.marshal_with(goal_model)
    @goals_ns.expect(goal_model)
    def post(self):
        """Create a new goal"""
        data = request.get_json()
        new_goal = Goal(
            title=data.get('title'),
            description=data.get('description'),
            status=data.get('status', 'to do')  # Default to 'to do' if status is not provided
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
            status=data.get('status')
        )
        return goal_to_update

    def delete(self, id):
        """Delete a goal by id"""
        goal_to_delete = Goal.query.get_or_404(id)
        goal_to_delete.delete()
        return {"message": "Goal deleted successfully"}, 200
