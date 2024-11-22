from exts import db

class Goal(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    status = db.Column(db.String(), nullable=False, default="to do")
    order = db.Column(db.Integer(), nullable=False, default=0)  # New order field

    def __repr__(self):
        return f"<Goal {self.title}, Status: {self.status}, Order: {self.order}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self, title=None, description=None, status=None, order=None):
        if title:
            self.title = title
        if description:
            self.description = description
        if status:
            self.status = status
        if order is not None:  # Allow order updates
            self.order = order
        db.session.commit()
