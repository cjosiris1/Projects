using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace HelenaGrace.Models.Data
{
    public class UserDataService
    {
        string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=HelenaGrace;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public bool Authenticate(User user)
        {
            bool success = false;

            string sqlStatement = "SELECT * FROM dbo.[USER] WHERE EMAIL = @email and PASSWORD = @password";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(sqlStatement, connection);

                command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 40).Value = user.Email;
                command.Parameters.Add("@password", System.Data.SqlDbType.VarChar, 40).Value = user.Password;

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        success = true;
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
            return success;
        }

        public User FindUser()
        {
            User foundUser = null;

            string sqlStatement = "SELECT * FROM dbo.[USER]";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(sqlStatement, connection);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        reader.Read();
                        foundUser = new User();
                        foundUser.FirstName = (string)reader["FIRST_NAME"];
                        foundUser.LastName = (string)reader["LAST_NAME"];
                        foundUser.Email = (string)reader["EMAIL"];
                        foundUser.Password = (string)reader["PASSWORD"];
                        foundUser.PhoneNumber = (string)reader["PHONE_NUMBER"];
                        foundUser.Bio = (string)reader["BIO"];
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
            return foundUser;
        }

        public bool UpdateProfile(User user)
        {
            bool success = false;

            string sqlStatement = "UPDATE dbo.[USER] SET FIRST_NAME = @firstname, LAST_NAME = @lastname, EMAIL = @email, PASSWORD = @password, PHONE_NUMBER = @phonenumber, BIO = @bio WHERE ID = @id";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(sqlStatement, connection);

                command.Parameters.Add("@id", System.Data.SqlDbType.Int).Value = 1;
                command.Parameters.Add("@firstname", System.Data.SqlDbType.VarChar, 10).Value = user.FirstName;
                command.Parameters.Add("@lastname", System.Data.SqlDbType.VarChar, 10).Value = user.LastName;
                command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 45).Value = user.Email;
                command.Parameters.Add("@password", System.Data.SqlDbType.VarChar, 45).Value = user.Password;
                command.Parameters.Add("@phonenumber", System.Data.SqlDbType.VarChar, 12).Value = user.PhoneNumber;
                command.Parameters.Add("@bio", System.Data.SqlDbType.NText).Value = user.Bio;

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
