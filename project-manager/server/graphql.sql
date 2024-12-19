-- DROP TABLE users;
-- CREATE TABLE users (
--     id int,
--     name varchar(100),
--     email varchar(100)
-- );
INSERT INTO tasks (task_id, name, description,project_id,assigned_user)
VALUES
    (1, 'backend', 'api integration','1','john'),
    (2, 'database', 'create user table','2','bob'),
    (4, 'frontend', 'create signin page','2','charlie');
     
select * from tasks;
CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description VARCHAR(100),
    project_id INT,
    assigned_user VARCHAR(100)
);

ALTER TABLE tasks AUTO_INCREMENT=1001;
-- INSERT INTO projects (name, description, assigned_users)
-- VALUES 
-- ('Project A', 'Description A', '[1, 2, 3]'),
-- ('Project B', 'Description B', '[4, 5]');
INSERT INTO users (id, name,email,project_id)
VALUES 
(9, 'srikar', 'srikar@gmail.com',2),
(8, 'ajay', 'ajay@gmail.com',2);

INSERT INTO users (id, name,email,project_id)
VALUES 
(12, 'sir', 'sri@gmail.com',2);

--  ALTER TABLE users
--  ADD COLUMN project_id INT;

  ALTER TABLE tasks
  ADD COLUMN task_id INT;

  UPDATE projects
  SET description='it is project manager'
  WHERE id=2;

-- SET SQL_SAFE_UPDATES = 0;

select* from projects;
select * from tasks;
SELECT * from users;


