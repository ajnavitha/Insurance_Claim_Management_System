using InsuranceAPI.DTOs;

namespace InsuranceAPI.Interfaces
{
    public interface IAIChatService
    {
        Task<ChatResponseDto> GetResponseAsync(ChatRequestDto request);
    }
}