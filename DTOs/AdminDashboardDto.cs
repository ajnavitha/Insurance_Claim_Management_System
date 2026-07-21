namespace InsuranceAPI.DTOs
{
    public class AdminDashboardDto
    {
        public int TotalUsers { get; set; }

        public int TotalPolicies { get; set; }

        public int TotalClaims { get; set; }

        public int PendingClaims { get; set; }

        public int ApprovedClaims { get; set; }

        public int RejectedClaims { get; set; }

        public decimal TotalClaimAmount { get; set; }

        public decimal AverageClaimAmount { get; set; }

        public decimal HighestClaimAmount { get; set; }
    }
}