using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using IntegrationService.Entities;
using OpenQA.Selenium.Support.UI;
using System.Threading;

namespace IntegrationService.Helper
{
    public class SeleniumAutomation
    {

        IWebDriver webDriver;

        public List<string> RunSeleniumTest(int integrationId, DataContext context, int delayinmiliseconds)
        {
            List<string> integrationReport = new List<string>();

            webDriver = new ChromeDriver(@".\chromedriver"); // Path.Combine(Environment.CurrentDirectory, @"\chromedriver");

            webDriver.Manage().Window.Maximize();

            IntegrationService.Entities.Integration integration = context.Integrations.Where(x => x.IntegrationId == integrationId).Include(x => x.TestCases).First();

            TestCase currentTest = null;

            try
            {
                if (integration.IntegrationId > 0)
                {
                    integrationReport.Add(string.Format("Integration [{0}] found.", integration.Name));

                    if (integration.TestCases.Count > 0)
                    {
                        integrationReport.Add(string.Format("[{0}] test cases identified.", integration.TestCases.Count.ToString()));

                        List<IntegrationService.Entities.TestCase> testCases = integration.TestCases.OrderBy(x => x.Sequence).ToList();

                        foreach (IntegrationService.Entities.TestCase testCase in testCases)
                        {
                            // Keep track of current TestCase in case it fails and we need to report details
                            currentTest = testCase;

                            // Do selenium work here

                            // set and go to URL
                            if (testCase.Url != null)
                            {
                                webDriver.Url = testCase.Url;
                            }

                            // Slow down test-case execution in order for pages to load properly
                            Thread.Sleep(delayinmiliseconds);

                            // find control by id/class/sequence, do action, check result, go to next

                            IWebElement element = null;

                            try
                            {
                                if (testCase.ElementId != null)
                                {
                                    element = webDriver.FindElement(By.Id(testCase.ElementId));
                                }

                                if (testCase.ElementClass != null)
                                {
                                    element = webDriver.FindElement(By.ClassName(testCase.ElementClass));
                                }

                                if (testCase.ElementHref != null)
                                {
                                    element = webDriver.FindElement(By.XPath(string.Format("//a[@href='{0}']", testCase.ElementHref)));
                                }

                                if (testCase.ElementLinkText != null)
                                {
                                    element = webDriver.FindElement(By.LinkText(testCase.ElementLinkText));
                                }
                            }
                            catch (Exception)
                            {
                                throw new Exception("Could not locate element by method provided.");
                            }

                            try
                            {
                                // perform element action
                                switch (testCase.Action.ToUpper())
                                {
                                    case "CLICK":
                                        element.Click();
                                        break;
                                    case "ENTER TEXT":
                                        element.SendKeys(testCase.Value);
                                        break;
                                    case "CHECK TEXT":
                                        // If text doesn't match, the test fails
                                        if (element.Text != testCase.Value)
                                        {
                                            throw new Exception("Assertion value check failed.");
                                        }
                                        break;
                                    case "BLAH":
                                        break;
                                    case "BLEH":
                                        break;
                                }
                            }
                            catch (Exception)
                            {
                                throw new Exception("Could not perform test action, or assertion failed.");
                            }

                            integrationReport.Add(string.Format("Test [{0}] [{1}] completed successfully.", currentTest.Sequence.ToString(), currentTest.Label));

                        } // foreach testcase
                    }
                    else
                    {
                        integrationReport.Add(string.Format("No test cases found."));
                    }
                }
                else
                {
                    integrationReport.Add(string.Format("Integration record not found."));
                }

            }
            catch (Exception ex)
            {
                integrationReport.Add(string.Format("Test [{0}] [{1}]  failed. Error: {2}", currentTest.Sequence.ToString(), currentTest.Label, ex.Message));
            }

            return integrationReport;
        }
    }
}
