
import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChefHat,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  Truck,
  ShieldCheck,
  Star,
  Search,
  ShoppingBag,
  Heart,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Coins,
  Clock,
  Flame,
  Leaf,
  Moon,
  CakeSlice,
  Menu,
  X,
  Plus,
  Minus,
  CheckCircle2,
  Bike,
  Gift,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
  Utensils,
  CircleHelp
} from 'lucide-react';

// FOOD DATA
const foods = [
  {
    id: 1,
    name: 'Classic Cheese Burger',
    restaurant: 'The Burger House',
    category: 'Burgers',
    price: 149,
    oldPrice: 199,
    rating: 4.8,
    time: '25 min',
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
    desc: 'Juicy patty, fresh veggies, special sauce'
  },
  {
    id: 2,
    name: 'Creamy Alfredo Pasta',
    restaurant: 'Pasta Palace',
    category: 'Pasta',
    price: 179,
    oldPrice: 219,
    rating: 4.7,
    time: '30 min',
    tag: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85',
    desc: 'Rich, cheesy, irresistibly creamy'
  },
  {
    id: 3,
    name: 'Farmhouse Pizza',
    restaurant: 'Oven & Stone',
    category: 'Pizza',
    price: 199,
    oldPrice: 249,
    rating: 4.6,
    time: '35 min',
    tag: 'NEW',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
    desc: 'Fresh veggies, cheesy delight'
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    restaurant: 'Sweet Fantasy',
    category: 'Desserts',
    price: 129,
    oldPrice: 159,
    rating: 4.9,
    time: '20 min',
    tag: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62a9f6a1?auto=format&fit=crop&w=900&q=85',
    desc: 'Warm, gooey, unforgettable'
  },
  {
    id: 5,
    name: 'Masala Dosa',
    restaurant: 'Spice Nation',
    category: 'Indian',
    price: 99,
    oldPrice: 129,
    rating: 4.5,
    time: '22 min',
    tag: 'LOCAL FAVOURITE',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85',
    desc: 'Crispy dosa with a spiced potato filling'
  },
  {
    id: 6,
    name: 'Loaded Golden Fries',
    restaurant: 'Snack Station',
    category: 'Snacks',
    price: 89,
    oldPrice: 119,
    rating: 4.6,
    time: '18 min',
    tag: 'QUICK BITE',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',
    desc: 'Golden, crispy and perfectly seasoned'
  },
  {
    id: 7,
    name: 'Fresh Garden Bowl',
    restaurant: 'Green Fork',
    category: 'Healthy',
    price: 159,
    oldPrice: 189,
    rating: 4.7,
    time: '20 min',
    tag: 'FRESH PICK',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
    desc: 'Crunchy greens, bright colours, fresh dressing'
  },
  {
    id: 8,
    name: 'Chilli Garlic Noodles',
    restaurant: 'Wok & Roll',
    category: 'Chinese',
    price: 169,
    oldPrice: 199,
    rating: 4.4,
    time: '28 min',
    tag: 'SPICY PICK',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=85',
    desc: 'Wok-tossed noodles with a spicy kick'
  }
];

// CATEGORIES
const categories = [
  { name: 'All', emoji: '✦' },
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Pasta', emoji: '🍝' },
  { name: 'Indian', emoji: '🥘' },
  { name: 'Chinese', emoji: '🥡' },
  { name: 'Snacks', emoji: '🍟' },
  { name: 'Desserts', emoji: '🍰' },
  { name: 'Healthy', emoji: '🥗' }
];

// MOODS
const moods = [
  {
    title: 'Spicy Mode',
    subtitle: 'Turn up the heat',
    icon: Flame,
    className: 'mood-spicy',
    filter: 'Chinese',
    emoji: '🌶️'
  },
  {
    title: 'Comfort Food',
    subtitle: 'Feel at home',
    icon: Heart,
    className: 'mood-comfort',
    filter: 'Burgers',
    emoji: '🍔'
  },
  {
    title: 'Healthy Vibes',
    subtitle: 'Fresh & light',
    icon: Leaf,
    className: 'mood-healthy',
    filter: 'Healthy',
    emoji: '🥗'
  },
  {
    title: 'Midnight Cravings',
    subtitle: 'Late night hunger',
    icon: Moon,
    className: 'mood-midnight',
    filter: 'Snacks',
    emoji: '🌙'
  },
  {
    title: 'Sweet Tooth',
    subtitle: 'Life is sweeter',
    icon: CakeSlice,
    className: 'mood-sweet',
    filter: 'Desserts',
    emoji: '🍰'
  }
];

// BRAND COMPONENT
function Brand({ small = false }) {
  return (
    <div className={`brand ${small ? 'brand-small' : ''}`}>
      <span className="brand-mark">
        <ChefHat
          size={small ? 26 : 34}
          strokeWidth={1.7}
        />
      </span>

      <span className="brand-copy">
        <b>CRAVE CLUB</b>
        <small>FOOD · FRIENDS · GOOD VIBES</small>
      </span>
    </div>
  );
}

// ORNAMENT COMPONENT
function Ornament({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`ornament ${className}`}
    >
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

// AUTH SCREEN
function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [name, setName] = useState('');

  const submit = (e) => {
    e.preventDefault();

    setError('');
    setNotice('');

    if (
      !email.trim() ||
      !password.trim() ||
      (mode === 'signup' && !name.trim())
    ) {
      setError('Please complete all required fields.');
      return;
    }

    if (password.length < 4) {
      setError('Use at least 4 characters for this demo password.');
      return;
    }

    onLogin({
      name: name.trim() || email.split('@')[0] || 'Foodie',
      email,
      remember
    });
  };

  return (
    <main className="auth-screen">
      <div className="auth-backdrop" />

      <Ornament className="ornament-top-left" />
      <Ornament className="ornament-top-right" />
      <Ornament className="ornament-bottom-right" />
      <Ornament className="ornament-bottom-left" />

      <div className="auth-layout">
        <motion.section
          className="auth-story"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
        >
          <Brand />

          <div className="story-copy">
            <p className="eyebrow">WELCOME TO</p>

            <h1>
              CRAVE <span>CLUB</span>
            </h1>

            <h2>Your cravings. Our priority.</h2>

            <p className="story-description">
              Delicious food, fast delivery, and rewards that keep you coming back.
            </p>
          </div>

          <div className="story-perks">
            <div>
              <Truck />
              <span>Fast Delivery</span>
            </div>

            <i />

            <div>
              <ShieldCheck />
              <span>Safe &amp; Secure</span>
            </div>

            <i />

            <div>
              <Star />
              <span>Great Offers</span>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="glass-card"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          <div className="glass-card-brand">
            <span className="mini-chef">
              <ChefHat size={40} />
            </span>

            <h2>CRAVE CLUB</h2>

            <p>
              {mode === 'login'
                ? 'Login to your account'
                : mode === 'signup'
                  ? 'Create your account'
                  : 'Reset your password'}
            </p>

            <small>Good food is just a login away!</small>
          </div>

          {mode === 'forgot' ? (
            <form
              className="auth-form"
              onSubmit={(e) => {
                e.preventDefault();
                setNotice(
                  'Password reset demo: connect an email service to send a real reset link.'
                );
              }}
            >
              <label className="input-wrap">
                <Mail />

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              {notice && (
                <p className="notice-text">{notice}</p>
              )}

              <button
                className="primary-button"
                type="submit"
              >
                Send reset link
                <ArrowRight size={19} />
              </button>

              <button
                className="text-back"
                type="button"
                onClick={() => {
                  setMode('login');
                  setNotice('');
                }}
              >
                Back to login
              </button>
            </form>
          ) : (
            <form
              className="auth-form"
              onSubmit={submit}
            >
              {mode === 'signup' && (
                <label className="input-wrap">
                  <ChefHat />

                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              )}

              <label className="input-wrap">
                <Mail />

                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </label>

              <label className="input-wrap">
                <LockKeyhole />

                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={
                    mode === 'signup'
                      ? 'new-password'
                      : 'current-password'
                  }
                />

                <button
                  className="eye-button"
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </button>
              </label>

              {mode === 'login' && (
                <div className="auth-options">
                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />

                    <span />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setMode('forgot');
                      setError('');
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {error && (
                <p className="error-text">{error}</p>
              )}

              <button
                className="primary-button"
                type="submit"
              >
                {mode === 'login' ? 'Login' : 'Create Account'}
                <ArrowRight size={20} />
              </button>

              <div className="divider">
                <span />
                or
                <span />
              </div>

              <button
                className="google-button"
                type="button"
                onClick={() =>
                  setNotice(
                    'Google sign-in needs OAuth setup before it can be used.'
                  )
                }
              >
                <b className="google-g">G</b>
                Continue with Google
              </button>

              {notice && (
                <p className="notice-text">{notice}</p>
              )}

              <p className="switch-mode">
                {mode === 'login'
                  ? "Don't have an account?"
                  : 'Already have an account?'}{' '}

                <button
                  type="button"
                  onClick={() => {
                    setMode(
                      mode === 'login' ? 'signup' : 'login'
                    );
                    setError('');
                    setNotice('');
                  }}
                >
                  {mode === 'login' ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </form>
          )}
        </motion.section>
      </div>

      <div className="auth-footnote">
        <span>CRAFTED FOR CRAVINGS</span>
      </div>
    </main>
  );
}

// FOOD CARD
function FoodCard({
  food,
  onAdd,
  quantity,
  onFavorite,
  favorite
}) {
  return (
    <motion.article
      className="food-card"
      layout
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="food-image-wrap">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80';
          }}
        />

        <span className="food-tag">
          {food.tag}
        </span>

        <button
          className={`favorite-button ${favorite ? 'is-favorite' : ''}`}
          onClick={() => onFavorite(food.id)}
          aria-label="Toggle favourite"
        >
          <Heart
            size={19}
            fill={favorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="food-info">
        <p className="restaurant-name">
          {food.restaurant}
        </p>

        <h3>{food.name}</h3>

        <p className="food-desc">
          {food.desc}
        </p>

        <div className="food-meta">
          <span>
            <Star size={14} fill="currentColor" />
            {food.rating}
          </span>

          <span>
            <Clock size={14} />
            {food.time}
          </span>
        </div>

        <div className="food-bottom">
          <div>
            <strong>₹{food.price}</strong>

            {food.oldPrice && (
              <del>₹{food.oldPrice}</del>
            )}
          </div>

          <button
            className={`add-button ${quantity ? 'added' : ''}`}
            onClick={() => onAdd(food)}
          >
            {quantity ? (
              <>
                <CheckCircle2 size={15} />
                {quantity} in cart
              </>
            ) : (
              <>
                Add
                <Plus size={15} />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// BIKE TRACK COMPONENT
function BikeTrack() {
  return (
    <div
      className="bike-track"
      aria-label="Animated delivery bike"
    >
      <span className="route-dot" />
      <span className="route-dash" />

      <motion.div
        className="bike-rider"
        animate={{
          x: [0, 8, 0],
          y: [0, -2, 0]
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Bike size={39} />
      </motion.div>

      <span className="route-home">⌂</span>
    </div>
  );
}

// FOOTER COMPONENT
function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <footer className="site-footer">
      <Ornament className="footer-ornament" />

      <div className="footer-grid">
        <div className="footer-brand">
          <Brand small />

          <p>
            We bring good food, great people and happy moments together.
            Because life is better with food!
          </p>

        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#restaurants">Restaurants</a>
          <a href="#offers">Offers</a>
          <a href="#rewards">Rewards</a>
          <a href="#track">Track Order</a>
        </div>

        <div className="footer-column">
          <h4>Help & Support</h4>
          <a href="#help">FAQs</a>
          <a href="mailto:hello@craveclub.example">Contact Us</a>
          <a href="#terms">Terms & Conditions</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#refund">Refund Policy</a>
        </div>

        <div className="footer-column">
          <h4>Your Account</h4>
          <a href="#account">My Profile</a>
          <a href="#orders">My Orders</a>
          <a href="#addresses">Saved Addresses</a>
          <a href="#favourites">Favourites</a>
          <a href="#login">Login / Sign Up</a>
        </div>

        <div className="newsletter">
          <h4>Join the Crave Club</h4>

          <p>
            Get new offers, foodie finds and a little happiness in your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (email.includes('@')) {
                setSubscribed(true);
              }
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button aria-label="Subscribe">
              <ArrowRight />
            </button>
          </form>

          {subscribed && (
            <small className="subscribe-success">
              You're on the list! (Demo subscription)
            </small>
          )}

        </div>
      </div>

    </footer>
  );
}

// HOME SCREEN
function HomeScreen({ user, onLogout }) {
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState(3.2);
  const [distanceSet, setDistanceSet] = useState(false);
  const [activeMood, setActiveMood] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [coins, setCoins] = useState(120);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartItems = foods.filter(
    (food) => cart[food.id]
  );

  const count = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (sum, food) => sum + food.price * cart[food.id],
    0
  );

  const delivery =
    distance <= 5
      ? 0
      : distance <= 8
        ? 20
        : distance <= 12
          ? 40
          : null;

  const coinDiscount = Math.min(
    Math.floor(coins / 10) * 10,
    subtotal ? Math.floor(subtotal * 0.1) : 0
  );

  const total =
    subtotal + (delivery ?? 0) - coinDiscount;

  const shownFoods = useMemo(
    () =>
      foods.filter((food) => (
        (category === 'All' || food.category === category) &&
        `${food.name} ${food.restaurant} ${food.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )),
    [category, search]
  );

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast('');
    }, 2400);
  };

  const addFood = (food) => {
    setCart((previous) => ({
      ...previous,
      [food.id]: (previous[food.id] || 0) + 1
    }));

    showToast(`${food.name} added to your bag`);
  };

  const updateQty = (id, delta) => {
    setCart((previous) => {
      const next = { ...previous };
      const quantity = (next[id] || 0) + delta;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) => (
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    ));
  };

  const chooseMood = (mood) => {
    setActiveMood(mood.title);
    setCategory(mood.filter);

    document
      .getElementById('restaurants')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const placeOrder = () => {
    if (!cartItems.length) {
      showToast('Add something delicious to your bag first');
      return;
    }

    if (delivery === null) {
      showToast('This demo delivery area is limited to 12 km');
      return;
    }

    setOrderPlaced(true);

    setCoins((current) =>
      current + Math.max(10, Math.floor(subtotal / 10))
    );

    setCart({});
    setCartOpen(false);

    showToast('Order placed! You earned Crave Coins ✨');
  };

  return (
    <div className="home-page" id="home">
      {/* HEADER */}
      <header className="main-header">
        <a
          className="brand-link"
          href="#home"
        >
          <Brand small />
        </a>

        <nav className={menuOpen ? 'nav-open' : ''}>
          <a
            className="active"
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="#restaurants"
            onClick={() => setMenuOpen(false)}
          >
            Restaurants
          </a>

          <a
            href="#offers"
            onClick={() => setMenuOpen(false)}
          >
            Offers
          </a>

          <a
            href="#rewards"
            onClick={() => setMenuOpen(false)}
          >
            Rewards
          </a>

          <a
            href="#track"
            onClick={() => setMenuOpen(false)}
          >
            Track Order
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button search-toggle"
            onClick={() =>
              document.getElementById('food-search')?.focus()
            }
            aria-label="Search"
          >
            <Search />
          </button>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={18} />
            <span>Bag</span>

            {count > 0 && <b>{count}</b>}
          </button>

          <div className="user-chip">
            <span className="avatar">
              {(user.name || 'F').slice(0, 1).toUpperCase()}
            </span>

            <span>
              Hi, {user.name.split(' ')[0]}
            </span>

            <button
              onClick={onLogout}
              title="Log out"
            >
              ↗
            </button>
          </div>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <Ornament className="hero-ornament" />

          <div className="hero-copy">
            <p className="eyebrow">
              YOUR CRAVINGS, OUR PRIORITY.
            </p>

            <h1>
              GOOD FOOD.
              <br />
              <span>GREAT MOOD.</span>
            </h1>

            <p className="hero-desc">
              Fresh ingredients. Authentic taste. Delivered to your doorstep.
            </p>

            <form
              className="location-search"
              onSubmit={(e) => {
                e.preventDefault();
                setDistanceSet(true);

                showToast(
                  distance <= 5
                    ? 'Great news — free delivery in your area!'
                    : 'Delivery fee calculated for your selected distance.'
                );
              }}
            >
              <MapPin size={18} />

              <input
                placeholder="Enter your delivery location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Delivery location"
              />

              <button aria-label="Check delivery">
                <ArrowRight />
              </button>
            </form>

            <div className="hero-benefits">
              <span>
                <Truck />
                <b>Free Delivery</b>
                <small>up to 5 km</small>
              </span>

              <i />

              <span>
                <Coins />
                <b>Gold Coins</b>
                <small>& Rewards</small>
              </span>

              <i />

              <span>
                <Star />
                <b>Top Rated</b>
                <small>Restaurants</small>
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=90"
              alt="Gourmet burger with fresh ingredients"
              onError={(e) => {
                e.currentTarget.style.opacity = '.2';
              }}
            />

            <div className="hero-image-vignette" />

            <div className="floating-delivery">
              <span>
                <Truck />
              </span>

              <div>
                <b>FREE DELIVERY</b>
                <small>UNDER 5 KM</small>
              </div>
            </div>

            <div className="hero-stamp">
              <span>✦</span>
              <b>Made fresh</b>
              <small>just for you</small>
            </div>
          </div>
        </section>

        {/* MOOD SECTION */}
        <section className="mood-section section-pad">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CHOOSE YOUR MOOD</p>
              <h2>What are you craving?</h2>

              <p className="section-subtitle">
                Tell us how you feel, we'll suggest the perfect food.
              </p>
            </div>

            <a href="#restaurants">
              Explore all
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mood-grid">
            {moods.map((m) => (
              <motion.button
                key={m.title}
                className={`mood-card ${m.className} ${
                  activeMood === m.title ? 'mood-active' : ''
                }`}
                onClick={() => chooseMood(m)}
                whileHover={{ y: -5 }}
              >
                <span className="mood-icon">
                  <m.icon />
                </span>

                <span className="mood-emoji">
                  {m.emoji}
                </span>

                <b>{m.title}</b>
                <small>{m.subtitle}</small>

                <ArrowUpRight
                  className="mood-arrow"
                  size={16}
                />
              </motion.button>
            ))}
          </div>
        </section>

        {/* CATEGORY SECTION */}
        <section className="category-section section-pad">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                A LITTLE BIT OF EVERYTHING
              </p>

              <h2>Find your favourite</h2>
            </div>
          </div>

          <div className="category-row">
            {categories.map((c) => (
              <button
                key={c.name}
                className={`category-pill ${
                  category === c.name ? 'selected' : ''
                }`}
                onClick={() => {
                  setCategory(c.name);
                  setActiveMood('');
                }}
              >
                <span>{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>
        </section>

        {/* RESTAURANT SECTION */}
        <section
          className="restaurant-section section-pad"
          id="restaurants"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">POPULAR PICKS</p>
              <h2>Loved by foodies</h2>

              <p className="section-subtitle">
                The dishes everyone's talking about.
              </p>
            </div>

            <div className="search-field">
              <Search size={17} />

              <input
                id="food-search"
                placeholder="Search dishes or restaurants"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="food-grid">
            {shownFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onAdd={addFood}
                quantity={cart[food.id] || 0}
                favorite={favorites.includes(food.id)}
                onFavorite={toggleFavorite}
              />
            ))}
          </div>

          {shownFoods.length === 0 && (
            <div className="empty-state">
              <Utensils />

              <h3>No dishes found</h3>
              <p>Try another search or category.</p>

              <button
                className="outline-button"
                onClick={() => {
                  setSearch('');
                  setCategory('All');
                }}
              >
                Show all food
              </button>
            </div>
          )}
        </section>

        {/* FEATURE BAND */}
        <section className="feature-band section-pad">
          <div className="app-promo">
            <div className="coin-orbit coin-one">₹</div>
          
            <div className="phone-mock">
              <div className="phone-notch" />

              <Brand small />

              <div className="phone-food" />

              <div className="phone-lines">
                <i />
                <i />
                <i />
              </div>

              <div className="phone-bottom">
                <span>⌂</span>
                <span>♡</span>
                <span>🛍</span>
                <span>☺</span>
              </div>
            </div>

            <div className="promo-copy">
              <p className="eyebrow">YOUR FOOD. YOUR CLUB.</p>

              <h2>
                Order faster.
                <br />
                <span>Earn more.</span>
              </h2>

              <p>
                Collect Crave Coins, unlock member-only offers,
                and keep your favourite flavours close.
              </p>

              <a
                href="#rewards"
                className="outline-button"
              >
                Discover the perks
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="how-card" id="track">
            <p className="eyebrow">SIMPLE AS THAT</p>

            <h2>How it works</h2>

            <p className="section-subtitle">
              Good food is only four steps away.
            </p>

            <div className="steps-row">
              <div>
                <span><Search /></span>
                <b>Discover</b>
                <small>Explore nearby food</small>
              </div>

              <i />

              <div>
                <span><ShoppingBag /></span>
                <b>Choose</b>
                <small>Build your perfect bag</small>
              </div>

              <i />

              <div>
                <span><CheckCircle2 /></span>
                <b>Order</b>
                <small>Place your order</small>
              </div>

              <i />

              <div>
                <span><Bike /></span>
                <b>Track</b>
                <small>Follow the journey</small>
              </div>
            </div>

            <BikeTrack />
          </div>
        </section>

        {/* OFFERS, REVIEWS AND REWARDS */}
        <section className="offer-review-reward section-pad" id="offers">
          <div className="offer-panel">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">A LITTLE EXTRA JOY</p>
                <h2>Special offers</h2>
              </div>

              <Gift />
            </div>

            <div className="offer-stack">
              <div className="offer-tile offer-orange">
                <small>FIRST ORDER</small>
                <b>50% OFF</b>
                <span>Use code: WELCOME</span>
              </div>

              <div className="offer-tile offer-green">
                <small>WEEKEND SPECIAL</small>
                <b>Up to 30% OFF</b>
                <span>On selected restaurants</span>
              </div>

              <div className="offer-tile offer-gold">
                <small>COIN BONUS</small>
                <b>100 Coins</b>
                <span>On orders above ₹499</span>
              </div>
            </div>
          </div>

          <div className="review-panel">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">
                  REAL PEOPLE, REAL CRAVINGS
                </p>

                <h2>Foodie love</h2>
              </div>

              <Star />
            </div>

            <div className="review-quote">
              <div className="review-stars">★★★★★</div>

              <p>
                “Amazing food and super-fast delivery! Love the gold
                coin rewards. Definitely my go-to app!”
              </p>

              <div className="review-author">
                <span>PS</span>

                <div>
                  <b>Priya S.</b>
                  <small>Happy Crave Club member</small>
                </div>
              </div>
            </div>
          </div>

          <div className="rewards-panel" id="rewards">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">EARN. REDEEM. REPEAT.</p>
                <h2>Crave Coins</h2>
              </div>

              <Coins />
            </div>

            <p className="section-subtitle">
              Every order brings you closer to your next treat.
            </p>

            <div className="coin-balance">
              <span className="coin-large">
                <Coins />
              </span>

              <div>
                <small>YOUR DEMO BALANCE</small>

                <b>
                  {coins} <em>coins</em>
                </b>
              </div>
            </div>

            <div className="coin-progress">
              <span
                style={{
                  width: `${Math.min(coins % 100, 100)}%`
                }}
              />
            </div>

            <p className="coin-caption">
              100 coins = ₹10 off · Demo rewards balance
            </p>

            <button
              className="primary-button small-button"
              onClick={() =>
                showToast(
                  'Rewards dashboard demo — redeem coins at checkout.'
                )
              }
            >
              Explore rewards
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* DELIVERY STRIP */}
        <section className="delivery-strip section-pad">
          <div className="delivery-icon">
            <Truck />
          </div>

          <div>
            <p className="eyebrow">
              YOUR NEIGHBOURHOOD, DELIVERED
            </p>

            <h2>Hungry? We're already on our way.</h2>

            <p>
              Free delivery within 5 km. Clear fees, no surprises.
            </p>
          </div>

          <div className="distance-control">
            <label htmlFor="distance">
              Demo distance
            </label>

            <select
              id="distance"
              value={distance}
              onChange={(e) => {
                setDistance(Number(e.target.value));
                setDistanceSet(true);
              }}
            >
              <option value={2}>2 km</option>
              <option value={3.2}>3.2 km</option>
              <option value={5}>5 km</option>
              <option value={6.5}>6.5 km</option>
              <option value={10}>10 km</option>
              <option value={14}>14 km</option>
            </select>

            <strong>
              {delivery === 0
                ? 'FREE'
                : delivery === null
                  ? 'Unavailable'
                  : `₹${delivery} delivery`}
            </strong>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* TOAST MESSAGE */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast-message"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <CheckCircle2 size={18} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />

            <motion.aside
              className="cart-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 27,
                stiffness: 260
              }}
            >
              <div className="drawer-heading">
                <div>
                  <p className="eyebrow">YOUR CRAVINGS</p>

                  <h2>
                    Your bag <span>({count})</span>
                  </h2>
                </div>

                <button
                  className="icon-button"
                  onClick={() => setCartOpen(false)}
                  aria-label="Close cart"
                >
                  <X />
                </button>
              </div>

              {orderPlaced && (
                <div className="order-success">
                  <CheckCircle2 />

                  <b>Order placed successfully!</b>

                  <span>
                    Your demo order is on its way. Coins have been added.
                  </span>

                  <button
                    onClick={() => setOrderPlaced(false)}
                  >
                    Continue browsing
                  </button>
                </div>
              )}

              {!cartItems.length && !orderPlaced ? (
                <div className="empty-cart">
                  <ShoppingBag size={45} />

                  <h3>Your bag is taking a little nap</h3>

                  <p>
                    Add something delicious and we'll take it from here.
                  </p>

                  <button
                    className="primary-button"
                    onClick={() => setCartOpen(false)}
                  >
                    Explore food
                    <ArrowRight />
                  </button>
                </div>
              ) : (
                cartItems.length > 0 && (
                  <>
                    <div className="cart-items">
                      {cartItems.map((f) => (
                        <div
                          className="cart-line"
                          key={f.id}
                        >
                          <img
                            src={f.image}
                            alt=""
                          />

                          <div className="cart-line-copy">
                            <b>{f.name}</b>
                            <small>{f.restaurant}</small>
                            <strong>₹{f.price}</strong>
                          </div>

                          <div className="qty-control">
                            <button
                              onClick={() => updateQty(f.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>

                            <span>{cart[f.id]}</span>

                            <button
                              onClick={() => updateQty(f.id, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="cart-summary">
                      <div>
                        <span>Subtotal</span>
                        <b>₹{subtotal}</b>
                      </div>

                      <div>
                        <span>
                          Delivery fee {distance <= 5 ? '(within 5 km)' : ''}
                        </span>

                        <b className={delivery === 0 ? 'free-text' : ''}>
                          {delivery === 0
                            ? 'FREE'
                            : delivery === null
                              ? 'Unavailable'
                              : `₹${delivery}`}
                        </b>
                      </div>

                      <div>
                        <span>
                          Coin discount <small>(demo)</small>
                        </span>

                        <b>-₹{coinDiscount}</b>
                      </div>

                      <div className="cart-total">
                        <span>Total</span>
                        <b>₹{Math.max(0, total)}</b>
                      </div>

                      <button
                        className="primary-button checkout-button"
                        onClick={placeOrder}
                      >
                        Place demo order
                        <ArrowRight />
                      </button>

                      <p className="demo-note">
                        Demo checkout only · No payment is collected
                      </p>
                    </div>
                  </>
                )
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// MAIN APP COMPONENT
export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem('craveClubUser') || 'null'
      );
    } catch {
      return null;
    }
  });

  const login = (details) => {
    const safe = {
      name: details.name || 'Foodie',
      email: details.email
    };

    setUser(safe);

    sessionStorage.setItem(
      'craveClubUser',
      JSON.stringify(safe)
    );
  };

  const logout = () => {
    sessionStorage.removeItem('craveClubUser');
    setUser(null);
  };

  useEffect(() => {
    document.title = user
      ? `Crave Club | Hi, ${user.name}`
      : 'Crave Club | Login';
  }, [user]);

  return (
    <AnimatePresence mode="wait">
      {user ? (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HomeScreen
            user={user}
            onLogout={logout}
          />
        </motion.div>
      ) : (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <AuthScreen onLogin={login} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
