using FluentValidation;
using InsuranceAPI.DTOs;

namespace InsuranceAPI.Validators
{
    public class RegisterRequestValidator : AbstractValidator<RegisterDto>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .MinimumLength(3);

            RuleFor(x => x.Age)
                .InclusiveBetween(18, 100);

            RuleFor(x => x.Work)
                .NotEmpty();

            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Phone)
                .NotEmpty()
                .Matches(@"^[0-9]{10}$")
                .WithMessage("Phone number must be exactly 10 digits.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(6);
        }
    }
}