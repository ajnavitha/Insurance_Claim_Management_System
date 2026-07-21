namespace InsuranceAPI.DTOs
{
    public class MonthlyClaimDto
    {
        public string Month { get; set; } = string.Empty;

        public int TotalClaims { get; set; }

        public decimal TotalAmount { get; set; }
    }
}