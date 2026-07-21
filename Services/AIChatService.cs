using System.Text.Json;
using InsuranceAPI.DTOs;
using InsuranceAPI.Interfaces;

namespace InsuranceAPI.Services
{
    public class AIChatService : IAIChatService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly GeminiService _geminiService;

        public AIChatService(
            IWebHostEnvironment environment,
            GeminiService geminiService)
        {
            _environment = environment;
            _geminiService = geminiService;
        }

        public async Task<ChatResponseDto> GetResponseAsync(ChatRequestDto request)
        {
            try
            {
                var filePath = Path.Combine(
                    _environment.ContentRootPath,
                    "KnowledgeBase",
                    "faq.json");

                if (File.Exists(filePath))
                {
                    var json = await File.ReadAllTextAsync(filePath);

                    var faqs = JsonSerializer.Deserialize<List<FaqItem>>(
                        json,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                    if (faqs != null)
                    {
                        var userQuestion = request.Message.Trim().ToLower();

                        foreach (var faq in faqs)
                        {
                            if (string.IsNullOrWhiteSpace(faq.Question))
                                continue;

                            if (userQuestion.Contains(faq.Question.Trim().ToLower()))
                            {
                                return new ChatResponseDto
                                {
                                    Reply = faq.Answer,
                                    Source = "Knowledge Base"
                                };
                            }
                        }
                    }
                }

                // If no FAQ matched, ask Gemini
                var aiReply = await _geminiService.AskGeminiAsync(request.Message);

                return new ChatResponseDto
                {
                    Reply = aiReply,
                    Source = "Gemini AI"
                };
            }
            catch (Exception ex)
            {
                return new ChatResponseDto
                {
                    Reply = ex.Message,
                    Source = "Error"
                };
            }
        }
    }
}