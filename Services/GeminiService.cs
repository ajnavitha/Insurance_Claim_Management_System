using System.Text;
using System.Text.Json;

namespace InsuranceAPI.Services
{
    public class GeminiService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public GeminiService(IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        public async Task<string> AskGeminiAsync(string prompt)
        {
            var apiKey = _configuration["Gemini:ApiKey"];

            if (string.IsNullOrWhiteSpace(apiKey))
            {
                return "API Key is missing from appsettings.json";
            }
            var model = _configuration["Gemini:Model"];

            var url =
                $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new
                            {
                                text = prompt
                            }
                        }
                    }
                }
            };

            var json = JsonSerializer.Serialize(requestBody);

            var response = await _httpClient.PostAsync(
                url,
                new StringContent(json, Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                var errorMessage = await response.Content.ReadAsStringAsync();
                return errorMessage;
            }

            var responseJson = await response.Content.ReadAsStringAsync();

            using JsonDocument document = JsonDocument.Parse(responseJson);

            return document.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString() ?? "No response.";
        }
    }
}