using IntegrationService.Entities;
using IntegrationService.Helper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IntegrationService.Helper;

namespace IntegrationService.Services
{
    public interface IIntegrationService
    {
        IEnumerable<Integration> GetAll(int userId);
        Integration Get(int id);
        bool Create(int userId, string name, string description);
        void Update(int id, string name, string description);
        List<string> Run(int id, int delayinmiliseconds);
        void Delete(int id);
    }

    public class IntegrationService : IIntegrationService
    {
        private DataContext _context;

        public IntegrationService(
            DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Integration> GetAll(int userId)
        {
            return _context.Integrations.Where(x => x.UserId == userId).Include(x => x.TestCases);
        } // GetAll

        public bool Create(int userId, string name, string description)
        {
            Integration integration = new Integration();

            try
            {
                integration.UserId = userId;
                integration.Name = name;
                integration.Description = description;
                integration.DateCreated = DateTime.Now;

                // save integration
                _context.Integrations.Add(integration);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        } // create

        public void Update(int id, string name, string description)
        {
            var integration = getIntegration(id);

            integration.Name = name;
            integration.Description = description;

            _context.Integrations.Update(integration);
            _context.SaveChanges();
        } // update

        public List<string> Run(int id, int delayinmiliseconds)
        {
            SeleniumAutomation sel = new SeleniumAutomation();

            return sel.RunSeleniumTest(id, _context, delayinmiliseconds);
        } // Get

        public Integration Get(int id)
        {
            return getIntegration(id);
        } // Get

        public void Delete(int id)
        {
            var integration = getIntegration(id);
            _context.Integrations.Remove(integration);
            _context.SaveChanges();
        } // Delete

        // helper methods

        private Integration getIntegration(int id)
        {
            var integration = _context.Integrations.Include(x => x.TestCases).Where(x => x.IntegrationId == id).First();
            if (integration == null) throw new KeyNotFoundException("Integration not found");
            return integration;
        } // getIntegration

    } //IntegrationService

} // IntegrationService.Services
