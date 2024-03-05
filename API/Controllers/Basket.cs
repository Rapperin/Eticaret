using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
   
    //  tüm controller sınıflarında ortak olan bazı ayarları sağlar.
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;

        // Dependency Injection kullanarak UserManager, TokenService ve StoreContext'i enjekte ediyoruz.
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        // Kullanıcı girişi işlemini gerçekleştiren endpoint.
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // Kullanıcı adına göre kullanıcıyı buluyoruz.
            var user = await _userManager.FindByNameAsync(loginDto.Username);
            // Kullanıcı yoksa veya şifre doğrulaması başarısızsa, Unauthorized (401) dönüyoruz.
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            // Giriş yapan kullanıcının sepetini alıyoruz.
            var userBasket = await RetrieveBasket(loginDto.Username);
            // Anonim kullanıcının sepetini alıyoruz.
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

            // Anonim kullanıcının sepeti varsa ve giriş yapan kullanıcının sepeti varsa sepeti sil anon kullanıcıya aktar
          
            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            // Kullanıcı bilgilerini ve token'ı içeren bir UserDto nesnesi dönüyoruz.(user dto nesnesi hakkında suphelerim var)
            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
            };
        }

        // Yeni kullanıcı kaydı endpointi diyebiliriz.
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
        {
            // Yeni kullanıcı oluştur
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            // Kullanıcı oluşturma işlemi gerçekleştir
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            // Başarısız olursa, hata mesajlarını ModelState'a ekle
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            // Kullanıcıya member rolü atanıyor
            await _userManager.AddToRoleAsync(user, "Member");

            // Başarılı olursa 201 Created dön(?)
            return StatusCode(201);
        }

        // Mevcut kullanıcı bilgilerini alma endpointi (Allah a emanet olan kısım..)
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // Mevcut kullanıcıyı bul
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            // Mevcut kullanıcının sepetini al
            var userBasket = await RetrieveBasket(User.Identity.Name);

            // Kullanıcı bilgilerini ve token'ı içeren bir UserDto nesnesi dönsün
            return new UserDto
