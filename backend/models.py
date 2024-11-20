from exts import db


"""
class Recipe:
    id:int primary key
    title:str
    description:str (text)
"""

class Goal(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    status = db.Column(db.String(), nullable=False, default="to do")

    def __repr__(self):
        return f"<Goal {self.title}, Status: {self.status}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, title=None, description=None, status=None):
        if title:
            self.title = title
        if description:
            self.description = description
        if status:
            self.status = status
        db.session.commit()
