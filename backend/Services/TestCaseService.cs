using IntegrationService.Entities;
using IntegrationService.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntegrationService.Services
{
    public interface ITestCaseService
    {
        IEnumerable<TestCase> GetAll(int integrationId);
        TestCase Get(int id);
        bool Create(int integrationId, int sequence, string label, string elementId, string elementClass, string elementHref, string elementLinkText, string action, string value, bool isTransition, bool isAssertion, string url);
        void Update(int id, int sequence, string label, string elementId, string elementClass, string elementHref, string elementLinkText, string action, string value, bool isTransition, bool isAssertion, string url);
        void Delete(int id);
    }

    public class TestCaseService : ITestCaseService
    {
        private DataContext _context;

        public TestCaseService(
            DataContext context)
        {
            _context = context;
        }

        public IEnumerable<TestCase> GetAll(int integrationId)
        {
            return _context.TestCases.Where(x => x.IntegrationId == integrationId);
        } // GetAll

        public bool Create(int integrationId, int sequence, string label, string elementId, string elementClass, string elementHref, string elementLinkText, string action, string value, bool isTransition, bool isAssertion, string url)
        {
            TestCase testCase = new TestCase();

            try
            {
                testCase.IntegrationId = integrationId;
                testCase.Sequence = sequence;
                testCase.Label = label;
                testCase.ElementId = elementId;
                testCase.ElementClass = elementClass;
                testCase.ElementHref = elementHref;
                testCase.ElementLinkText = elementLinkText;
                testCase.Action = action;
                testCase.Value = value;
                testCase.isTransition = isTransition;
                testCase.isAssertion = isAssertion;
                testCase.Url = url;

                // save integration
                _context.TestCases.Add(testCase);
                _context.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        } // create

        public void Update(int id, int sequence, string label, string elementId, string elementClass, string elementHref, string elementLinkText, string action, string value, bool isTransition, bool isAssertion, string url)
        {
            var testCase = getTestCase(id);

            testCase.Sequence = sequence;
            testCase.Label = label;
            testCase.ElementId = elementId;
            testCase.ElementClass = elementClass;
            testCase.ElementHref = elementHref;
            testCase.ElementLinkText = elementLinkText;
            testCase.Action = action;
            testCase.Value = value;
            testCase.isTransition = isTransition;
            testCase.isAssertion = isAssertion;
            testCase.Url = url;

            _context.TestCases.Update(testCase);
            _context.SaveChanges();
        } // update

        public TestCase Get(int id)
        {
            return getTestCase(id);
        } // Get

        public void Delete(int id)
        {
            var testCase = getTestCase(id);
            _context.TestCases.Remove(testCase);
            _context.SaveChanges();
        } // Delete

        // helper methods

        private TestCase getTestCase(int id)
        {
            var testCase = _context.TestCases.Find(id);
            if (testCase == null) throw new KeyNotFoundException("TestCase not found");
            return testCase;
        } // getIntegration

    } // TestCaseService
}
