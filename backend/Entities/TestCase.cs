using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IntegrationService.Entities
{
    public class TestCase
    {
        public int TestCaseId { get; set; }     
        public int IntegrationId { get; set; }   
        public int Sequence { get; set; }
        public string Label { get; set; }
        public string ElementId { get; set; }
        public string ElementClass { get; set; }
        public string ElementHref { get; set; }
        public string ElementLinkText { get; set; }
        public string Action { get; set; }
        public string Value { get; set; }
        public bool isTransition { get; set; }
        public bool isAssertion { get; set; }
        public string Url { get; set; }

        [JsonIgnore]
        [ForeignKey("IntegrationId")]
        public Integration Integration { get; set; }
    }
}
