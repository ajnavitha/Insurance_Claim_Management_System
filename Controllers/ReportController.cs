using ClosedXML.Excel;
using InsuranceAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace InsuranceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class ReportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ============================
        // PDF Report
        // ============================
        [HttpGet("claims-pdf")]
        public async Task<IActionResult> ExportClaimsPdf()
        {
            QuestPDF.Settings.License = LicenseType.Community;

            var claims = await _context.Claims.ToListAsync();

            var pdf = Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(20);

                    page.Header()
                        .Text("Insurance Claim Report")
                        .FontSize(20)
                        .Bold()
                        .FontColor(Colors.Blue.Medium);

                    page.Content()
                        .Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(2);
                                columns.RelativeColumn(2);
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            table.Header(header =>
                            {
                                header.Cell().Element(CellStyle).Text("Policy");
                                header.Cell().Element(CellStyle).Text("Claim Type");
                                header.Cell().Element(CellStyle).Text("Amount");
                                header.Cell().Element(CellStyle).Text("Status");

                                static IContainer CellStyle(IContainer container)
                                {
                                    return container
                                        .DefaultTextStyle(x => x.Bold())
                                        .Padding(5)
                                        .Background(Colors.Grey.Lighten2);
                                }
                            });

                            foreach (var claim in claims)
                            {
                                table.Cell().Padding(5).Text(claim.PolicyNumber);
                                table.Cell().Padding(5).Text(claim.ClaimType);
                                table.Cell().Padding(5).Text($"₹ {claim.Amount}");
                                table.Cell().Padding(5).Text(claim.Status);
                            }
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text($"Generated on {DateTime.Now:dd-MM-yyyy HH:mm:ss}");
                });
            }).GeneratePdf();

            return File(pdf, "application/pdf", "ClaimsReport.pdf");
        }

        // ============================
        // Excel Report
        // ============================
        [HttpGet("claims-excel")]
        public async Task<IActionResult> ExportClaimsExcel()
        {
            var claims = await _context.Claims.ToListAsync();

            using var workbook = new XLWorkbook();

            var worksheet = workbook.Worksheets.Add("Claims");

            worksheet.Cell(1, 1).Value = "Policy Number";
            worksheet.Cell(1, 2).Value = "Claim Type";
            worksheet.Cell(1, 3).Value = "Amount";
            worksheet.Cell(1, 4).Value = "Status";
            worksheet.Cell(1, 5).Value = "Submitted Date";

            int row = 2;

            foreach (var claim in claims)
            {
                worksheet.Cell(row, 1).Value = claim.PolicyNumber;
                worksheet.Cell(row, 2).Value = claim.ClaimType;
                worksheet.Cell(row, 3).Value = claim.Amount;
                worksheet.Cell(row, 4).Value = claim.Status;
                worksheet.Cell(row, 5).Value = claim.SubmittedDate;

                row++;
            }

            worksheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();

            workbook.SaveAs(stream);

            return File(
                stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "ClaimsReport.xlsx");
        }
    }
}