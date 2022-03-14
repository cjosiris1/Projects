using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace HelenaGrace.Models.Data
{
    public class CustomerDataService
    {
        string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=HelenaGrace;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public bool addNewAppointment(Appointment appointment) 
        {
            //create and prepare sql statement.
            string query = "INSERT INTO dbo.[Appointments] (email,name,dateTime,phoneNumber) VALUES (@email,@name,@dateTime,@phoneNumber)";
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                
                //command.Parameters.Add("@Id", System.Data.SqlDbType.Int).Value = appointment.id;
                command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 50).Value = appointment.email;
                command.Parameters.Add("@name", System.Data.SqlDbType.VarChar, 50).Value = appointment.name;
                command.Parameters.Add("@dateTime", System.Data.SqlDbType.DateTime).Value = appointment.dateTime;
                command.Parameters.Add("@phoneNumber", System.Data.SqlDbType.VarChar, 50).Value = appointment.phoneNumber;

                Console.WriteLine(appointment.id.ToString(), appointment.name, appointment.dateTime, appointment.email, appointment.phoneNumber);
                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
                finally
                {
                    connection.Close();
                }
            }
            return true;
        }

        public bool Delete(int id)
        {
            bool success = false;
            string sqlStatement = "DELETE FROM dbo.[Appointments] WHERE ID=@id";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(sqlStatement, connection);

                command.Parameters.Add("@id", System.Data.SqlDbType.Int).Value = id;
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

        public List<Appointment> GetAll()
        {
            List<Appointment> res = new List<Appointment>();

            string sqlStatement = "SELECT * FROM dbo.[Appointments] ORDER BY dateTime DESC";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(sqlStatement, connection);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        Appointment appt = new Appointment();
                        appt.id = (int)reader["ID"];
                        appt.name = (string)reader["name"];
                        appt.email = (string)reader["email"];
                        appt.phoneNumber = (string)reader["phoneNumber"];
                        appt.dateTime = (DateTime)reader["dateTime"];
                        res.Add(appt);
                    }
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
            return res;
        }
    }
}
