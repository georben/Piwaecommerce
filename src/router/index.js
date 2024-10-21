import { createRouter, createWebHistory } from 'vue-router';
import AdminRegisters from '@/Administrator/AdminLoginRegister/AdminRegister.vue';

//views
import Home from '../views/HOmePAGE.vue';
import About from '../views/ABOutPAGE.vue';
import Contact from '../views/CONtactPAGE.vue';

//Login and Register 
import Login from '../Login-register/LOginPAGE.vue';
import Register from '../Login-register/REgisterPAGE.vue';

//Registered (Protected)
import LandingPAGE from '../registeredacc/LandingPAGE.vue';
import ProfilePAGE from '../registeredacc/Profilepages/PROFilePAGE.vue';
import PpurchaseHistory from '@/registeredacc/MyAccount/PurchaseHistory.vue';
import MyListPAGE from '@/registeredacc/Profilepages/MyListPAGE.vue';
import MyPurchasePAGEs from '@/registeredacc/Profilepages/MyPurchasePAGE.vue';
import AddtocarPAGEs from '@/registeredacc/AddtoCartPAGEs.vue';
import checkoutss from '@/registeredacc/CheckOUTPAGES.vue';
import PRoductDetails from '@/registeredacc/ProductDetails.vue';
import ContactPAGESS from '@/registeredacc/ContacTPAGEs.vue';
import AboutPAGESS from '@/registeredacc/AboutPAGGEES.vue';
import NoTiFiCaTiOn from '@/registeredacc/Profilepages/NotificationPage.vue';
import InBoXPaGes from '@/registeredacc/Profilepages/InboxPage.vue';

//Transactions
import TranSactions from '@/Transactions/BuyNow.vue';
import Todeliver from '@/Transactions/ToDeliver.vue';
import Toreceive from '@/Transactions/ToReceive.vue';
import Tocancel from '@/Transactions/ToCancel.vue';
import MyPuRcHaSeHiStoRy from '@/Transactions/MyPurchaseHistory';

//Shop Visit....
import ShopVisit from '@/ShopVisit/ShopVisitUser.vue';

//Socket
import RealTimeChat from '@/socket/ReALtImeChatPage.vue';

// Define routes
const routes = [
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: () => import('../Administrator/AdminDashboard.vue'),
    meta: { requiresAuth: true, role: 'admin' },
  },
  { path: '/admin-register', name: 'AdminRegisterss', component: AdminRegisters, meta: { requiresAdminAuth: false}},
  // Public Routes
  { path: '/', name: 'HOme', component: Home },
  { path: '/about', name: 'AbOUt', component: About },
  { path: '/contact', name: 'ContACt', component: Contact },
  { path: '/login', name: 'LOgin', component: Login, meta:{ requiresAuth: false} },
  { path: '/register', name: 'REgister', component: Register, meta:{ requiresAuth: false} },

  // Registered (Protected)
  { path: '/LandingPage', name: 'hhhh', component: LandingPAGE, meta: { requiresAuth: true } },
  { path: '/ProfilePage', name: 'Profile', component: ProfilePAGE, meta: { requiresAuth: true } },
  { path: '/PurchaseHistory', name: 'ppurchase', component: PpurchaseHistory, meta: { requiresAuth: true } },
  { path: '/MyList', name: 'Myyylist', component: MyListPAGE, meta: { requiresAuth: true } },
  { path: '/My-Purchases', name: 'Peeersonal', component: MyPurchasePAGEs, meta: { requiresAuth: true } },
  { path: '/add-to-cart', name:'AddtocarPAGEss', component:AddtocarPAGEs, meta: { requiresAuth: true }},
  { path: '/check-out-page', name: 'checkkkk', component: checkoutss, meta: { requiresAuth: true }},
  { path: '/product/:id', name: 'PRODUCTDETAILS', component: PRoductDetails, meta: { requiresAuth: true}},
  { path: '/contacts', name:'Cccccoonntttact', component: ContactPAGESS, meta: { requiresAuth: true}},
  { path: '/abouts', name:'AAAbbbooouttt', component: AboutPAGESS, meta: {requiresAuth: true}},
  { path: '/notification', name: 'NOTIficaTION', component: NoTiFiCaTiOn, meta: { requiresAuth: true}},
  { path: '/inbox', name: 'InBooxPaGGe', component: InBoXPaGes, meta: { requiresAuth: true}},
  
  //TRANSACTIONS
  { path: '/order/:productId', name: 'TRanSActIONpage', component: TranSactions, meta: { requiresAuth: true }},
  { path: '/to-delivery', name: 'ToDeLiVeRy', component: Todeliver, meta: { requiresAuth: true}},
  { path: '/to-receive', name: 'ToReCeiVe', component: Toreceive, meta: {requiresAuth: true}},
  { path: '/to-cancel', name: 'ToCaNcEl', component: Tocancel, meta: { requiresAuth: true}},
  { path: '/my-purchase-history', name: 'MyPURCHASEhistory', component: MyPuRcHaSeHiStoRy, meta: { requiresAuth: true}},

  //ShopVisit
  { path: '/visit', name: 'ViSiT', component: ShopVisit, meta: { requiresAuth:true}},

  //socket
  { path: '/contact-seller', name: 'RealTime', component: RealTimeChat, meta: { requiresAuth: true}},
]

// Create router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
}); 
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  // Routes that require regular user authentication
  if (to.meta.requiresAuth) {
    if (token && isAdmin !== 'true') { // Regular user token
      next();
    } else if (!token) {
      next({ name: 'LOgin' }); // Redirect to regular login page
    } else {
      next({ name: 'HOme' }); // Redirect to homepage if admin tries to access user routes
    }
  } 
  // Routes that require admin authentication
  else if (to.meta.requiresAdminAuth) {
    if (token && isAdmin === 'true') { // Admin token and isAdmin flag
      next();
    } else if (!token || isAdmin !== 'true') {
      next({ name: 'AdminLOGIN' }); // Redirect to admin login if not authenticated as admin
    } else {
      next({ name: 'HOme' }); // If a regular user tries to access admin route, redirect to homepage
    }
  } 
  // Public routes or default route behavior
  else {
    if (token) {
      if (isAdmin === 'true') {
        next({ name: 'AdminDashboard' }); // Redirect admin to the dashboard if they are logged in
      } else {
        next({ name: 'hhhh' }); // Redirect regular users to their landing page if logged in
      }
    } else {
      next(); // Allow access to public routes if no token
    }
  }
});
export default router;
