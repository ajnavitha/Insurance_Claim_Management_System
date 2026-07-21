namespace InsuranceAPI.DTOs
{
    public class ClaimRecommendationDto
    {
        public int ClaimId { get; set; }

        public decimal ClaimAmount { get; set; }

        public string RiskLevel { get; set; } = string.Empty;

        public string Recommendation { get; set; } = string.Empty;

        public string Reason { get; set; } = string.Empty;
    }
}