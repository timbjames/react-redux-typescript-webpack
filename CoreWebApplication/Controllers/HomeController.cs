using Microsoft.AspNetCore.Mvc;

namespace CoreWebApplication.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
