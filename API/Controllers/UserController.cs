﻿using API.Data;
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
    //[HttpPost("register")]
    // public async Task<ActionResult<User>> Register()
    // {
        
    // }
}
