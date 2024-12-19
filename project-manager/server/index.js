const express=require('express');
const {graphqlHTTP} =require('express-graphql');
const {buildSchema} =require('graphql')
const app=express();
const cors=require('cors');

const mysql=require('mysql2');
app.use(cors());

const connection = mysql.createConnection({
    host: '127.0.0.1',      // Hostname
    user: 'root',           // Username
    password: '73869', // Replace with the password for the root user
    database: 'graphql_demo'   // Replace with your database name
});


connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });

  const schema=buildSchema(`
    type Query {
  message: String
  getUser(id: Int!): User
  users: [User]
  projects:[Project]
  tasks:[task]
  }

type Mutation {
  addUser(id: Int!, name: String!, email: String!,project_id:Int!): User
}

type User {
  id: Int
  name: String
  email: String
  project_id: Int
}
  type task{
  task_id:Int
  name:String
  description:String
  project_id:Int
  assigned_user:String
  }

type Project {
  id: Int
  name: String
  project_id: Int
  description: String
}


`);

//backned api

const root={
    message:()=>"hello world",

    getUser:async({id})=>{
        return new Promise((resolve,reject)=>{
            const query='select * from users where id=?';
            connection.query(query,[id],(err,results)=>{
                if(err)
                    reject(err);
                else
                resolve(results[0]);
            })
        })
    },

    users:async()=>{
        return new Promise((resolve,reject)=>{
            const query='select * from users';
            connection.query(query,(err,results)=>{
                if(err)
                    reject(err)
                else
                    resolve(results);
            })
        })
    },
    tasks:async()=>{
      return new Promise((resolve,reject)=>{
          const query='select * from tasks';
          connection.query(query,(err,results)=>{
              if(err)
                  reject(err)
              else
                  resolve(results);
          })
      })
  },
    projects:async()=>{
      return new Promise((resolve,reject)=>{
          const query='select * from projects';
          connection.query(query,(err,results)=>{
              if(err)
                  reject(err)
              else
                  resolve(results);
          })
      })
  },
    addUser: async ({id, name, email,project_id }) => {
        return new Promise((resolve, reject) => {
          const query = 'INSERT INTO users (id,name, email,project_id) VALUES (?,?, ?,?)';
          connection.query(query, [id,name, email,project_id], (err, results) => {
            if (err) {
              reject(err);
            } else {
              // Fetch the newly inserted user using the last inserted ID
              const newUserQuery = 'SELECT * FROM users WHERE id = ?';
              connection.query(newUserQuery, [id], (err, userResults) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(userResults[0]); // Return the newly added user
                }
              });
            }
          });
        });
      },

 };


app.use('/graphql',graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true,
}));

app.listen(3000,()=>{
    console.log("app is listening");
})