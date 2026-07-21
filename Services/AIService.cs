using System.Text.Json;

namespace InsuranceAPI.Services
{
    public class AIService
    {
        public object AnalyzeVehicleDamage(string imageFileName)
        {
            // AI Vision Simulation Engine with Bounding Box Coordinates
            var damages = new[]
            {
                new { Component = "Front Bumper Scratch & Dent", BoundingBox = new { X = 20, Y = 55, Width = 40, Height = 25 }, Severity = "Moderate", EstimatedRepairCost = 8500 },
                new { Component = "Left Headlight Crack", BoundingBox = new { X = 65, Y = 30, Width = 25, Height = 20 }, Severity = "Minor", EstimatedRepairCost = 3200 },
                new { Component = "Windshield Spider Crack", BoundingBox = new { X = 35, Y = 15, Width = 30, Height = 25 }, Severity = "High", EstimatedRepairCost = 14000 }
            };

            int totalRepairCost = 8500 + 3200 + 14000;
            string recommendation = totalRepairCost <= 15000 ? "Auto Approve" : totalRepairCost <= 40000 ? "Manual Review Recommended" : "High Risk Investigation";

            return new
            {
                ImageFile = imageFileName,
                OverallDamageScore = 68, // Out of 100
                EstimatedCost = totalRepairCost,
                Damages = damages,
                Recommendation = recommendation,
                ConfidenceScore = 94.8,
                ProcessedAt = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            };
        }

        public object ValidateDocumentQuality(string docType)
        {
            // AI Document Integrity & OCR Engine
            bool isBlur = false;
            double blurScore = 12.4; // Low blur = high clarity
            string authenticity = "Genuine";
            string extractedText = docType switch
            {
                "RC Book" => "REG NO: TN-09-CB-8832 | OWNER: JOHN DOE | CHASSIS NO: MA3EWB2S00192831",
                "Driving License" => "DL NO: TN-0120180098421 | NAME: JOHN DOE | EXPIRY: 2035-12-31",
                "Invoice" => "SERVICING INVOICE NO: INV-9842 | TOTAL AMOUNT: RS 25,700 | GSTIN: 33AAAAA0000A1Z5",
                _ => "DOCUMENT VERIFIED: COMPLIANT WITH STANDARD ENTERPRISE POLICY"
            };

            return new
            {
                DocumentType = docType,
                QualityStatus = "Pass",
                IsBlur = isBlur,
                BlurScore = blurScore,
                AuthenticityStatus = authenticity,
                ExtractedText = extractedText,
                Confidence = 97.2
            };
        }

        public object CalculateFraudScore(decimal claimAmount, string claimType, int userClaimsHistoryCount)
        {
            int fraudScore = 15; // Base low risk
            if (claimAmount > 50000) fraudScore += 25;
            if (claimAmount > 150000) fraudScore += 30;
            if (userClaimsHistoryCount > 3) fraudScore += 20;

            string riskCategory = fraudScore < 30 ? "Low Risk" : fraudScore < 65 ? "Medium Risk" : "High Fraud Risk";

            return new
            {
                FraudScore = fraudScore,
                RiskCategory = riskCategory,
                KeyFlags = fraudScore > 50 ? new[] { "High claim value", "Multiple recent submissions" } : new[] { "Normal submission profile" },
                SuggestedProbability = Math.Max(10, 100 - fraudScore)
            };
        }
    }
}
