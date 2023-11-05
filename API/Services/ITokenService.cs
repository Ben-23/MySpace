using API.Entity;

namespace API;

public interface ITokenService
{
    public string CreateToken(User user);
}
