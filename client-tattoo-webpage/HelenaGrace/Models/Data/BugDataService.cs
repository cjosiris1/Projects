using System;
using System.Data.SqlClient;

namespace HelenaGrace.Models.Data
{
    public class BugDataService
    {
        string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=HelenaGrace;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public bool addNewBug(Bug bug) 
        {
            bool success = false;
            //create and prepare sql statement.
            string query = "INSERT INTO dbo.[Bugs] (email,feedback) VALUES (@email,@feedback)";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                
                //command.Parameters.Add("@Id", System.Data.SqlDbType.Int).Value = appointment.id;
                command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 50).Value = bug.email;
                command.Parameters.Add("@feedback", System.Data.SqlDbType.VarChar, 200).Value = bug.feedback;

                Console.WriteLine(bug.id.ToString(), bug.email, bug.feedback);
                try
                {
                    connection.Open();
                    if (command.ExecuteNonQuery() > 0)
                        success = true;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                finally
                {
                    connection.Close();
                }
            }
            return success;
        }
    }
}
