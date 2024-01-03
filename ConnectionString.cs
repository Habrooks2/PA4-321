using System.Diagnostics.Contracts;
using Org.BouncyCastle.Tls;
using DotNetEnv;

namespace PA4_321{
    
    public class ConnectionString{

        public string cs {get;set;}

        public ConnectionString(){

           
            string server = "ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "t4iio5r16fszjgd1";
            string port = "3306";
            string userName = "olckkpedr755zqz9";
            string password = "wdru0i8ymf46s92a";

            cs = $@"server = {server};user = {userName}; database = {database}; port = {port};password = {password};";

        }
    }
}