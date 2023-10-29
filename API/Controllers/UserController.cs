using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController:ControllerBase
{
    readonly DataContext _context;
    public UserController(DataContext context)
    {
        _context=context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        return await _context.Users.FindAsync(id);
    }
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(RegisterDTO registerDTO)
    {
        if(await ExistingUser(registerDTO.UserName))
            return BadRequest("Username Exists");
        var hmac=new HMACSHA512();
        var user= new User{
            UserName=registerDTO.UserName.ToLower(),
            PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt=hmac.Key
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();        
        return user;
    }
    [HttpPost("login")]
    public async Task<ActionResult<User>> Login(LoginDTO loginDTO)
    {
        var user= await _context.Users.FirstOrDefaultAsync(x=> x.UserName==loginDTO.Username);
        if(user==null)
            return Unauthorized("User doesn't Exists");
        var hmac = new HMACSHA512
        {
            Key = user.PasswordSalt
        };
        var generatedhash= hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));
        for(int i=0;i<generatedhash.Length;i++)
        {
            if(generatedhash[i]!=user.PasswordHash[i])
                return Unauthorized("Password is wrong");
        }       
        return user;
    }
    public async Task<bool> ExistingUser(string userName)
    {
        return await _context.Users.AnyAsync(x=> x.UserName==userName.ToLower());
    }
}
