using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IntegrationService.Entities
{
    public class Integration
    {
        public int IntegrationId { get; set; }        
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }

        [JsonIgnore]
        [ForeignKey("UserId")]
        public User User { get; set; }

        public List<TestCase> TestCases { get; set; }
    }
}
