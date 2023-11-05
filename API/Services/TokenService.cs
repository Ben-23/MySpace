using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
//using Microsoft.IdentityModel.JsonWebTokens;

namespace API.Services;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key;

    public TokenService(IConfiguration config)
    {
        _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Tokenkey"]));
    }
    public string CreateToken(User user)
    {
        var claims= new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
        };
        var cred= new SigningCredentials(_key,SecurityAlgorithms.HmacSha256Signature);
        var tokenDescriptor=new SecurityTokenDescriptor{
            Subject=new ClaimsIdentity(claims),
            Expires=DateTime.Today.AddDays(7),
            SigningCredentials=cred
        };
        var tokenHandler=new JwtSecurityTokenHandler();

        var token=tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);        
    }
}
