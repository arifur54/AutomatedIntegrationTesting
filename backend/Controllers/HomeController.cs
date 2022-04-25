using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntegrationService.Services;

namespace IntegrationService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private IUserService _userService;
        private IIntegrationService _integrationService;
        private ITestCaseService _testCaseService;

        public HomeController(
            IUserService userService,
            IIntegrationService integrationService,
            ITestCaseService testCaseService)
        {
            _userService = userService;
            _integrationService = integrationService;
            _testCaseService = testCaseService;
        }

        [HttpPost("login")]
        public IActionResult Login(string username, string password)
        {
            Entities.User loginUser = _userService.LogIn(username, password);

            if (loginUser.UserId > 0)
            {
                return Ok(_userService.LogIn(username, password));
            }
            else
            {
                return NotFound(_userService.LogIn(username, password));
            }
        }

        [HttpPost("createuser")]
        public IActionResult CreateUser(string username, string firstname, string lastname, string email, string password)
        {
            _userService.Create(username, firstname, lastname, email, password);
            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("createintegration")]
        public IActionResult CreateIntegration(int userId, string name, string description)
        {
            if (_integrationService.Create(userId, name, description)) 
            {             
                return Ok(new { message = "Integration creation successful" });
            }
            else
            {
                return NotFound(new { message = "Integration creation failed" });
            }
        }

        [HttpPost("createtestcase")]
        public IActionResult CreateTestCase(int integrationId, int sequence, string label, string elementId, string elementClass,  string elementHref, string elementLinkText, string elementSequence, string action, string value, bool isTransition, bool isAssertion, string url)
        {
            if (_testCaseService.Create(integrationId, sequence, label, elementId, elementClass, elementHref, elementLinkText, action, value, isTransition, isAssertion, url))
            {
                return Ok(new { message = "TestCase creation successful" });
            }
            else
            {
                return NotFound(new { message = "TestCase creation failed" });
            }
        }

        [HttpGet("getusers")]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("getintegrations")]
        public IActionResult GetAllIntegrations(int userId)
        {
            var integrations = _integrationService.GetAll(userId);
            return Ok(integrations);
        }

        [HttpGet("gettestcases")]
        public IActionResult GetAllTestCases(int integrationId)
        {
            var testCases = _testCaseService.GetAll(integrationId);
            return Ok(testCases);
        }

        [HttpGet("getuser")]
        public IActionResult GetUser(int id)
        {
            var user = _userService.Get(id);
            return Ok(user);
        }

        [HttpGet("getintegration")]
        public IActionResult GetIntegration(int id)
        {
            var integration = _integrationService.Get(id);
            return Ok(integration);
        }

        [HttpGet("gettestcase")]
        public IActionResult GetTestCase(int id)
        {
            var testCase = _testCaseService.Get(id);
            return Ok(testCase);
        }

        [HttpPut("updateuser")]
        public IActionResult UpdateUser(int id, string username, string firstname, string lastname, string email)
        {
            _userService.Update(id, username, firstname, lastname, email);
            return Ok(new { message = "User updated successfully" });
        }

        [HttpPut("updateintegration")]
        public IActionResult UpdateIntegration(int id, string name, string description)
        {
            _integrationService.Update(id, name, description);
            return Ok(new { message = "Integration updated successful" });
        }

        [HttpPut("runintegration")]
        public IActionResult RunIntegration(int id, int delayinseconds)
        {
            //_integrationService.Run(id);
            return Ok(_integrationService.Run(id, (delayinseconds*1000)));
        }

        [HttpPut("updatetestcase")]
        public IActionResult UpdateTestCase(int id, int sequence, string label, string elementId, string elementClass, string elementHref, string elementLinkText, string elementSequence, string action, string value, bool isTransition, bool isAssertion, string url)
        {
            _testCaseService.Update(id, sequence, label, elementId, elementClass, elementHref, elementLinkText, action, value, isTransition, isAssertion, url);
            return Ok(new { message = "TestCase updated successful" });
        }

        [HttpDelete("deleteuser")]
        public IActionResult DeleteUser(int id)
        {
            _userService.Delete(id);
            return Ok(new { message = "User deleted successfully" });
        }

        [HttpDelete("deleteintegration")]
        public IActionResult DeleteIntegration(int id)
        {
            _integrationService.Delete(id);
            return Ok(new { message = "Integration deleted successfully" });
        }

        [HttpDelete("deletetestcase")]
        public IActionResult DeleteTestCase(int id)
        {
            _testCaseService.Delete(id);
            return Ok(new { message = "TestCase deleted successfully" });
        }
    }
}
