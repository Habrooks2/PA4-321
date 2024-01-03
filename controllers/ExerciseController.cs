using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using PA4_321.models;

namespace PA4_321.Controllers
{
    [ApiController]
    [Route("api/exercise")]
    public class ExerciseController : ControllerBase
    {
    
       
       [HttpPost()]
        public IActionResult  Post([FromBody] Exercise newExercise)
        {
            try
    {
        ExerciseUtility addexercise = new ExerciseUtility();
        addexercise.CreateExercise(newExercise);

        // Return a JSON response indicating success
        return Ok(new { message = "Exercise created successfully" });
    }
    catch (Exception ex)
    {
        // Log the exception
        Console.WriteLine(ex.ToString());
        
        // Return a JSON response indicating failure
        return BadRequest(new { message = "Failed to create exercise" });
    }
        }

        
       [HttpDelete("Delete/{exerciseID}")]
        public IActionResult Delete(int id)
        {
             try
            {           ExerciseUtility deleteExercise = new ExerciseUtility();
                    deleteExercise.DeleteExercise(id);
                    return Ok();
        // Add logging to check if the method is invoked
        //Console.WriteLine($"Deleting exercise with ID: {id}");

        // Rest of your code to delete the exercise
            }
            catch (Exception ex)
            {
        // Log the exception
                Console.WriteLine(ex.ToString());
                throw; // Rethrow the exception to see it in the console
            }
        }

        [HttpGet]
        public List<Exercise> Get()
        {
            ExerciseUtility readObject = new ExerciseUtility();
            return readObject.GetAllExercises();
        }
    }
}

// Exercise Controller - is the mediator between my html and my models ..  it controls the way the user interacts with my app .. post, delete, and read exercise