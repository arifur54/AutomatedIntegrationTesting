using IntegrationService.Entities;
using IntegrationService.Helper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntegrationService.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        User Get(int id);
        User LogIn(string username, string password);
        bool Create(string username, string firstname, string lastname, string email, string password);
        void Update(int id, string username, string firstname, string lastname, string email);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        private DataContext _context;

        public UserService(
            DataContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.Include(x => x.Integrations);
        }

        public User LogIn(string username, string password)
        {
            try
            {
                User user = _context.Users
                    .Include(x => x.Integrations)
                    .Where(x => x.Username.ToUpper() == username.ToUpper() && x.Password == password)
                    .First();

                if (user != null && user.UserId > 0)
                {
                    return user;
                }
            }
            catch (Exception ex)
            {
                return new User();
            }

            return new User();
        }

        public bool Create(string username, string firstname, string lastname, string email, string password)
        {
            User user = new User();

            try
            {
                user.Username = username;
                user.FirstName = firstname;
                user.LastName = lastname;
                user.Email = email;
                user.Password = password;
                user.DateJoined = DateTime.Now;

                // save user
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        } // Create

        public void Update(int id, string username, string firstname, string lastname, string email)
        {
            var user = getUser(id);

            if (user.Username != username)
                user.Username = username;
            if (user.FirstName != firstname)
                user.FirstName = firstname;
            if (user.LastName != lastname)
                user.LastName = lastname;
            if (user.Email != email)
                user.Email = email;

            _context.Users.Update(user);
            _context.SaveChanges();
        } // Update

        public User Get(int id)
        {
            return getUser(id);
        }

        public void Delete(int id)
        {
            var user = getUser(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        } // Delete

        // helper methods

        private User getUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        } // getUser
    } // UserService : IUserService
} // IntegrationService.Services
