-- Active: 1706478993465@@localhost@5432@postgres

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false
);

INSERT INTO tasks (title, description) VALUES
  ('Buy groceries', 'Milk, eggs, bread'),
  ('Clean the house', 'Vacuum, dust, mop'),
  ('Do laundry', 'Wash, dry, fold');