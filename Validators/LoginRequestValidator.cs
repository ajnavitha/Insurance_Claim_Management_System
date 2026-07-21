using FluentValidation;
using InsuranceAPI.DTOs;

namespace InsuranceAPI.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginDto>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}