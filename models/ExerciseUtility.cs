using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace PA4_321.models
{
    public class ExerciseUtility
    {
        public void CreateExerciseTable(){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"CREATE TABLE exercises(id INTEGER PRIMARY KEY AUTO_INCREMENT, type TEXT, date TEXT, distance INTEGER)";

            using var cmd = new MySqlCommand(stm,con);

            cmd.ExecuteNonQuery();
        }
        
        public void CreateExercise(Exercise myExercise) {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"INSERT INTO exercises(id, type, date, distance) VALUES (@id, @type, @date, @distance)";

            using var cmd = new MySqlCommand(stm,con);

            cmd.Parameters.AddWithValue("@id", myExercise.ID);
            cmd.Parameters.AddWithValue("@type", myExercise.Type);
            //cmd.Parameters.AddWithValue("@date", myExercise.Date);
            cmd.Parameters.AddWithValue("@date", myExercise.Date);
            cmd.Parameters.AddWithValue("@distance", myExercise.Distance);
            //Console.WriteLine("sql" + myExercise.Date);
            cmd.Prepare();  
            
            cmd.ExecuteNonQuery();
 
        }
        
        public void DropExerciseTable(){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"DROP TABLE IF EXISTS exercises";

            using var cmd = new MySqlCommand(stm,con);

            cmd.ExecuteNonQuery();
        }
        
        public void DeleteExercise(int id){
            
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"DELETE FROM exercises WHERE id = @id";

            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@id", id);

            cmd.Prepare();
            cmd.ExecuteNonQuery();
        }
    
        public List<Exercise> GetAllExercises()
        {
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;

            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT * FROM exercises";
            
            using var cmd = new MySqlCommand(stm, con);
            using var rdr = cmd.ExecuteReader();

            List<Exercise> exercises = new List<Exercise>();

            while (rdr.Read())
            {
                Exercise exercise = new Exercise
                {
                    ID = Convert.ToInt32(rdr["id"]),
                    Type = rdr["type"].ToString(),
                    Date = rdr["date"].ToString(),
                    Distance = Convert.ToInt32(rdr["distance"])
                };

                exercises.Add(exercise);
            }

            return exercises;
        }
    }
}

// Utility Model - functions to add or delete an exercise or table and read all the info from database