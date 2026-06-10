// ====================================================
// Backend Seed Food Database (150+ items)
// ====================================================

export interface FoodCatalogItem {
  name: string;
  emoji: string;
  image_url: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const FOODS_CATALOG: FoodCatalogItem[] = [
  // === VEGETABLES (10) ===
  { name: "Broccoli Florets", emoji: "🥦", category: "Vegetables", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Spinach Leaves", emoji: "🥬", category: "Vegetables", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Avocado", emoji: "🥑", category: "Vegetables", calories: 160, protein: 2, carbs: 9, fat: 15, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Sweet Potato", emoji: "🍠", category: "Vegetables", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Carrot Sticks", emoji: "🥕", category: "Vegetables", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Red Bell Pepper", emoji: "🫑", category: "Vegetables", calories: 31, protein: 1, carbs: 6, fat: 0.3, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Cucumber", emoji: "🥒", category: "Vegetables", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Asparagus Spears", emoji: "🌱", category: "Vegetables", calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Brussels Sprouts", emoji: "🥬", category: "Vegetables", calories: 43, protein: 3.4, carbs: 9, fat: 0.3, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { name: "Garlic Cloves", emoji: "🧄", category: "Vegetables", calories: 149, protein: 6.4, carbs: 33, fat: 0.5, image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },

  // === FRUITS (10) ===
  { name: "Red Apple", emoji: "🍎", category: "Fruits", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Banana", emoji: "🍌", category: "Fruits", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Blueberries", emoji: "🫐", category: "Fruits", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Strawberries", emoji: "🍓", category: "Fruits", calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Fresh Mango", emoji: "🥭", category: "Fruits", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Orange Slices", emoji: "🍊", category: "Fruits", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Pineapple Chunks", emoji: "🍍", category: "Fruits", calories: 50, protein: 0.5, carbs: 13, fat: 0.1, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Watermelon", emoji: "🍉", category: "Fruits", calories: 30, protein: 0.6, carbs: 8, fat: 0.2, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Grapes", emoji: "🍇", category: "Fruits", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { name: "Cherries", emoji: "🍒", category: "Fruits", calories: 50, protein: 1, carbs: 12, fat: 0.3, image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },

  // === INDIAN (15) ===
  { name: "Butter Chicken", emoji: "🍛", category: "Indian", calories: 450, protein: 32, carbs: 14, fat: 28, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Paneer Tikka Masala", emoji: "🧀", category: "Indian", calories: 380, protein: 18, carbs: 12, fat: 26, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Chicken Biryani", emoji: "🍚", category: "Indian", calories: 550, protein: 28, carbs: 65, fat: 16, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Dal Makhani", emoji: "🥣", category: "Indian", calories: 310, protein: 11, carbs: 38, fat: 14, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Chana Masala", emoji: "🍛", category: "Indian", calories: 250, protein: 10, carbs: 40, fat: 6, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Garlic Naan", emoji: "🫓", category: "Indian", calories: 280, protein: 8, carbs: 45, fat: 7, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Samosa", emoji: "🔺", category: "Indian", calories: 150, protein: 3, carbs: 18, fat: 8, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Aloo Gobhi", emoji: "🥦", category: "Indian", calories: 180, protein: 4, carbs: 22, fat: 9, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Palak Paneer", emoji: "🥬", category: "Indian", calories: 290, protein: 14, carbs: 10, fat: 22, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Masala Dosa", emoji: "🥞", category: "Indian", calories: 350, protein: 7, carbs: 54, fat: 12, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Idli Sambar", emoji: "⚪", category: "Indian", calories: 210, protein: 6, carbs: 42, fat: 2, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Tandoori Chicken", emoji: "🍗", category: "Indian", calories: 280, protein: 35, carbs: 4, fat: 14, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Rogan Josh", emoji: "🍖", category: "Indian", calories: 420, protein: 29, carbs: 10, fat: 29, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Gulab Jamun", emoji: "🧆", category: "Indian", calories: 150, protein: 2, carbs: 24, fat: 6, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { name: "Onion Bhaji", emoji: "🧅", category: "Indian", calories: 190, protein: 3, carbs: 20, fat: 11, image_url: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },

  // === ITALIAN (15) ===
  { name: "Margherita Pizza", emoji: "🍕", category: "Italian", calories: 275, protein: 11, carbs: 36, fat: 9, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Spaghetti Carbonara", emoji: "🍝", category: "Italian", calories: 450, protein: 20, carbs: 48, fat: 20, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Lasagna Bolognese", emoji: "🥘", category: "Italian", calories: 550, protein: 28, carbs: 45, fat: 28, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Fettuccine Alfredo", emoji: "🍝", category: "Italian", calories: 620, protein: 18, carbs: 55, fat: 38, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Caprese Salad", emoji: "🥗", category: "Italian", calories: 230, protein: 10, carbs: 4, fat: 20, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Risotto Mushroom", emoji: "🍚", category: "Italian", calories: 380, protein: 8, carbs: 55, fat: 14, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Minestrone Soup", emoji: "🥣", category: "Italian", calories: 120, protein: 5, carbs: 18, fat: 2.5, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Bruschetta Tomato", emoji: "🥖", category: "Italian", calories: 150, protein: 4, carbs: 22, fat: 5, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Tiramisu Dessert", emoji: "🍰", category: "Italian", calories: 340, protein: 6, carbs: 38, fat: 18, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Gnocchi Pesto", emoji: "🥣", category: "Italian", calories: 410, protein: 8, carbs: 62, fat: 15, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Ravioli Spinach", emoji: "🥟", category: "Italian", calories: 320, protein: 12, carbs: 40, fat: 12, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Panna Cotta", emoji: "🍮", category: "Italian", calories: 280, protein: 4, carbs: 28, fat: 18, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Prosciutto Melon", emoji: "🥓", category: "Italian", calories: 180, protein: 12, carbs: 14, fat: 8, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Calzone", emoji: "🍕", category: "Italian", calories: 510, protein: 22, carbs: 58, fat: 20, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { name: "Polenta Creamy", emoji: "🥣", category: "Italian", calories: 220, protein: 5, carbs: 35, fat: 6, image_url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },

  // === CHINESE (10) ===
  { name: "Kung Pao Chicken", emoji: "🍗", category: "Chinese", calories: 390, protein: 26, carbs: 18, fat: 24, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Mapo Tofu", emoji: "🍲", category: "Chinese", calories: 280, protein: 16, carbs: 14, fat: 19, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Wonton Soup", emoji: "🥣", category: "Chinese", calories: 180, protein: 11, carbs: 20, fat: 6, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Spring Rolls", emoji: "🌯", category: "Chinese", calories: 200, protein: 4, carbs: 24, fat: 10, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Chow Mein", emoji: "🍜", category: "Chinese", calories: 410, protein: 12, carbs: 54, fat: 16, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Peking Duck", emoji: "🦆", category: "Chinese", calories: 480, protein: 24, carbs: 10, fat: 38, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Sweet & Sour Pork", emoji: "🥩", category: "Chinese", calories: 450, protein: 20, carbs: 38, fat: 24, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Dim Sum Steamed", emoji: "🥟", category: "Chinese", calories: 210, protein: 10, carbs: 26, fat: 7, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Beef and Broccoli", emoji: "🥩", category: "Chinese", calories: 320, protein: 28, carbs: 14, fat: 16, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { name: "Fried Rice Egg", emoji: "🍚", category: "Chinese", calories: 350, protein: 9, carbs: 52, fat: 12, image_url: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },

  // === MEXICAN (10) ===
  { name: "Beef Tacos", emoji: "🌮", category: "Mexican", calories: 230, protein: 14, carbs: 18, fat: 11, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Chicken Quesadilla", emoji: "🫓", category: "Mexican", calories: 420, protein: 24, carbs: 32, fat: 22, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Burrito Bowl Beef", emoji: "🥣", category: "Mexican", calories: 540, protein: 32, carbs: 54, fat: 20, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Guacamole & Chips", emoji: "🥑", category: "Mexican", calories: 290, protein: 4, carbs: 34, fat: 16, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Chicken Enchiladas", emoji: "🌯", category: "Mexican", calories: 410, protein: 22, carbs: 36, fat: 20, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Chiles Rellenos", emoji: "🌶️", category: "Mexican", calories: 340, protein: 12, carbs: 18, fat: 24, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Elote Corn", emoji: "🌽", category: "Mexican", calories: 210, protein: 5, carbs: 24, fat: 11, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Fajitas Sizzling Beef", emoji: "🍳", category: "Mexican", calories: 460, protein: 34, carbs: 24, fat: 26, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Pico de Gallo", emoji: "🥣", category: "Mexican", calories: 15, protein: 0.6, carbs: 3, fat: 0.1, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { name: "Churros with Caramel", emoji: "🥖", category: "Mexican", calories: 280, protein: 3, carbs: 42, fat: 12, image_url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },

  // === AMERICAN (10) ===
  { name: "Beef Hamburger", emoji: "🍔", category: "American", calories: 354, protein: 20, carbs: 30, fat: 17, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Hot Dog Mustard", emoji: "🌭", category: "American", calories: 290, protein: 10, carbs: 24, fat: 16, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "BBQ Pork Ribs", emoji: "🍖", category: "American", calories: 520, protein: 34, carbs: 12, fat: 38, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Buffalo Wings", emoji: "🍗", category: "American", calories: 380, protein: 24, carbs: 2, fat: 28, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Mac and Cheese", emoji: "🧀", category: "American", calories: 410, protein: 15, carbs: 44, fat: 19, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Philly Cheesesteak", emoji: "🥪", category: "American", calories: 590, protein: 36, carbs: 48, fat: 28, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Clam Chowder Soup", emoji: "🥣", category: "American", calories: 280, protein: 12, carbs: 22, fat: 16, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Corn on the Cob", emoji: "🌽", category: "American", calories: 90, protein: 3, carbs: 19, fat: 1, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Chocolate Brownie", emoji: "🧁", category: "American", calories: 250, protein: 3, carbs: 32, fat: 12, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { name: "Apple Pie", emoji: "🥧", category: "American", calories: 300, protein: 2, carbs: 44, fat: 13, image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },

  // === HEALTHY FOODS (15) ===
  { name: "Quinoa Salad Bowl", emoji: "🥗", category: "Healthy Foods", calories: 220, protein: 7, carbs: 32, fat: 6, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Grilled Chicken Salad", emoji: "🥗", category: "Healthy Foods", calories: 310, protein: 34, carbs: 8, fat: 14, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Steamed Salmon", emoji: "🐟", category: "Healthy Foods", calories: 240, protein: 28, carbs: 0, fat: 14, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Chia Seed Pudding", emoji: "🥣", category: "Healthy Foods", calories: 150, protein: 4, carbs: 16, fat: 8, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Boiled Eggs (2)", emoji: "🥚", category: "Healthy Foods", calories: 140, protein: 12, carbs: 1, fat: 10, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Oatmeal with Berries", emoji: "🥣", category: "Healthy Foods", calories: 180, protein: 6, carbs: 34, fat: 2.5, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Mixed Almonds", emoji: "🫘", category: "Healthy Foods", calories: 160, protein: 6, carbs: 6, fat: 14, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Lentil Soup Bowl", emoji: "🥣", category: "Healthy Foods", calories: 180, protein: 12, carbs: 28, fat: 2, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Hummus & Celery", emoji: "🥒", category: "Healthy Foods", calories: 120, protein: 4, carbs: 12, fat: 6, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Low-fat Greek Yogurt", emoji: "🥛", category: "Healthy Foods", calories: 100, protein: 15, carbs: 6, fat: 2, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Roasted Chickpeas", emoji: "🫘", category: "Healthy Foods", calories: 140, protein: 7, carbs: 22, fat: 3, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Brown Rice Bowl", emoji: "🍚", category: "Healthy Foods", calories: 215, protein: 5, carbs: 45, fat: 1.6, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Tofu Stir-fry", emoji: "🍲", category: "Healthy Foods", calories: 200, protein: 14, carbs: 12, fat: 11, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Protein Shake Whey", emoji: "🥤", category: "Healthy Foods", calories: 140, protein: 25, carbs: 3, fat: 2, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { name: "Baked Sweet Potato", emoji: "🍠", category: "Healthy Foods", calories: 110, protein: 2, carbs: 26, fat: 0.2, image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },

  // === FAST FOODS (10) ===
  { name: "French Fries", emoji: "🍟", category: "Fast Foods", calories: 312, protein: 3.4, carbs: 41, fat: 15, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Pepperoni Pizza Slice", emoji: "🍕", category: "Fast Foods", calories: 290, protein: 12, carbs: 32, fat: 12, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Chicken Nuggets (6)", emoji: "🍗", category: "Fast Foods", calories: 270, protein: 15, carbs: 16, fat: 16, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Double Cheeseburger", emoji: "🍔", category: "Fast Foods", calories: 490, protein: 28, carbs: 33, fat: 26, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Glazed Donut", emoji: "🍩", category: "Fast Foods", calories: 240, protein: 3, carbs: 28, fat: 12, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Onion Rings Basket", emoji: "🧅", category: "Fast Foods", calories: 380, protein: 4, carbs: 44, fat: 20, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Crispy Fried Chicken", emoji: "🍗", category: "Fast Foods", calories: 320, protein: 22, carbs: 15, fat: 19, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Soft Pretzel Salted", emoji: "🥨", category: "Fast Foods", calories: 340, protein: 9, carbs: 68, fat: 2.5, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Fish and Chips", emoji: "🐟", category: "Fast Foods", calories: 580, protein: 24, carbs: 55, fat: 30, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { name: "Bacon Grilled Cheese", emoji: "🥪", category: "Fast Foods", calories: 450, protein: 18, carbs: 32, fat: 28, image_url: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },

  // === SEAFOODS (10) ===
  { name: "Grilled Salmon Fillet", emoji: "🐟", category: "Seafoods", calories: 280, protein: 32, carbs: 0, fat: 16, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Garlic Butter Shrimp", emoji: "🍤", category: "Seafoods", calories: 210, protein: 24, carbs: 2, fat: 12, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Seared Ahi Tuna", emoji: "🐟", category: "Seafoods", calories: 180, protein: 30, carbs: 1, fat: 5, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Lobster Tail Grilled", emoji: "🦞", category: "Seafoods", calories: 130, protein: 26, carbs: 1, fat: 2, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Steamed Mussels Bowl", emoji: "🦪", category: "Seafoods", calories: 150, protein: 18, carbs: 6, fat: 4.5, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Fried Calamari Ring", emoji: "🍤", category: "Seafoods", calories: 310, protein: 16, carbs: 26, fat: 15, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Cod Fish Filet", emoji: "🐟", category: "Seafoods", calories: 90, protein: 20, carbs: 0, fat: 1, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Oysters Raw (6)", emoji: "🦪", category: "Seafoods", calories: 60, protein: 6, carbs: 4, fat: 1.5, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Crab Cakes (2)", emoji: "🦀", category: "Seafoods", calories: 260, protein: 18, carbs: 14, fat: 14, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { name: "Octopus Salad Grilled", emoji: "🐙", category: "Seafoods", calories: 160, protein: 22, carbs: 4, fat: 6, image_url: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },

  // === DESSERTS (10) ===
  { name: "Chocolate Cake Slice", emoji: "🍰", category: "Desserts", calories: 350, protein: 4, carbs: 48, fat: 16, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Strawberry Cheesecake", emoji: "🍰", category: "Desserts", calories: 400, protein: 6, carbs: 44, fat: 22, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Chocolate Chip Cookie", emoji: "🍪", category: "Desserts", calories: 150, protein: 2, carbs: 20, fat: 7, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Vanilla Ice Cream Scoop", emoji: "🍨", category: "Desserts", calories: 140, protein: 2.5, carbs: 16, fat: 7, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Macarons (3)", emoji: "🫓", category: "Desserts", calories: 160, protein: 3, carbs: 22, fat: 7, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Apple Crumble", emoji: "🥧", category: "Desserts", calories: 280, protein: 2, carbs: 42, fat: 12, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Red Velvet Cupcake", emoji: "🧁", category: "Desserts", calories: 240, protein: 3, carbs: 30, fat: 11, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Dark Chocolate Square", emoji: "🍫", category: "Desserts", calories: 80, protein: 1, carbs: 8, fat: 6, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Fruit Tart", emoji: "🥧", category: "Desserts", calories: 220, protein: 3, carbs: 32, fat: 9, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { name: "Crème Brûlée", emoji: "🍮", category: "Desserts", calories: 290, protein: 4, carbs: 26, fat: 19, image_url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },

  // === BREAKFAST (10) ===
  { name: "Eggs Benedict", emoji: "🍳", category: "Breakfast", calories: 350, protein: 18, carbs: 24, fat: 20, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Buttermilk Pancakes", emoji: "🥞", category: "Breakfast", calories: 290, protein: 6, carbs: 48, fat: 8, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Belgian Waffles Syrup", emoji: "🧇", category: "Breakfast", calories: 310, protein: 5, carbs: 52, fat: 9, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Avocado Toast Egg", emoji: "🍞", category: "Breakfast", calories: 260, protein: 11, carbs: 24, fat: 14, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "French Toast Maple", emoji: "🍞", category: "Breakfast", calories: 320, protein: 8, carbs: 44, fat: 12, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Breakfast Burrito", emoji: "🌯", category: "Breakfast", calories: 430, protein: 22, carbs: 38, fat: 20, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Smoked Salmon Bagel", emoji: "🥯", category: "Breakfast", calories: 360, protein: 24, carbs: 42, fat: 10, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Granola Fruit Bowl", emoji: "🥣", category: "Breakfast", calories: 240, protein: 6, carbs: 40, fat: 6, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Croissant with Butter", emoji: "🥐", category: "Breakfast", calories: 272, protein: 5, carbs: 28, fat: 16, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { name: "Egg & Cheese Muffin", emoji: "🥯", category: "Breakfast", calories: 290, protein: 14, carbs: 29, fat: 12, image_url: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },

  // === LUNCH (10) ===
  { name: "Chicken Caesar Wrap", emoji: "🌯", category: "Lunch", calories: 380, protein: 28, carbs: 32, fat: 16, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Cobb Salad Bowl", emoji: "🥗", category: "Lunch", calories: 420, protein: 32, carbs: 10, fat: 28, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Turkey Club Sandwich", emoji: "🥪", category: "Lunch", calories: 460, protein: 30, carbs: 44, fat: 18, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Tomato Basil Soup & Grilled Cheese", emoji: "🥪", category: "Lunch", calories: 510, protein: 18, carbs: 54, fat: 24, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Nicoise Salad Tuna", emoji: "🥗", category: "Lunch", calories: 340, protein: 26, carbs: 16, fat: 18, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Sushi Combo Pack", emoji: "🍣", category: "Lunch", calories: 380, protein: 16, carbs: 64, fat: 4, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Beef Chili Bowl", emoji: "🥣", category: "Lunch", calories: 320, protein: 22, carbs: 28, fat: 14, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Falafel Pita Pocket", emoji: "🌯", category: "Lunch", calories: 350, protein: 12, carbs: 48, fat: 12, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Quinoa Veggie Wrap", emoji: "🌯", category: "Lunch", calories: 290, protein: 9, carbs: 42, fat: 10, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { name: "Shrimp Rice Bowl", emoji: "🍚", category: "Lunch", calories: 370, protein: 26, carbs: 50, fat: 6, image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },

  // === DINNER (10) ===
  { name: "Sirloin Steak Potatoes", emoji: "🥩", category: "Dinner", calories: 590, protein: 42, carbs: 35, fat: 32, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Chicken Alfredo", emoji: "🍝", category: "Dinner", calories: 680, protein: 38, carbs: 62, fat: 30, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Baked Cod Broccoli", emoji: "🐟", category: "Dinner", calories: 220, protein: 26, carbs: 12, fat: 6, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "BBQ Pulled Pork Burger", emoji: "🍔", category: "Dinner", calories: 540, protein: 32, carbs: 44, fat: 22, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Vegetable Curry Rice", emoji: "🍛", category: "Dinner", calories: 380, protein: 8, carbs: 68, fat: 8, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Grilled Lamb Chops", emoji: "🍖", category: "Dinner", calories: 480, protein: 36, carbs: 0, fat: 38, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Shrimp Scampi Pasta", emoji: "🍝", category: "Dinner", calories: 510, protein: 28, carbs: 54, fat: 18, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Beef Stir-fry Noodles", emoji: "🍜", category: "Dinner", calories: 470, protein: 30, carbs: 52, fat: 16, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Tofu Fried Rice Bowl", emoji: "🍚", category: "Dinner", calories: 340, protein: 12, carbs: 54, fat: 8, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { name: "Turkey Meatloaf Potatoes", emoji: "🧆", category: "Dinner", calories: 410, protein: 28, carbs: 36, fat: 15, image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },

  // === PROTEIN FOODS (10) ===
  { name: "Grilled Chicken Breast", emoji: "🍗", category: "Protein Foods", calories: 165, protein: 31, carbs: 0, fat: 3.6, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Lean Ground Beef", emoji: "🥩", category: "Protein Foods", calories: 250, protein: 26, carbs: 0, fat: 15, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Tuna Canned in Water", emoji: "🐟", category: "Protein Foods", calories: 120, protein: 26, carbs: 0, fat: 1, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Cottage Cheese 2%", emoji: "🧀", category: "Protein Foods", calories: 90, protein: 12, carbs: 3, fat: 3, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Greek Yogurt Plain", emoji: "🥛", category: "Protein Foods", calories: 100, protein: 17, carbs: 4, fat: 0.7, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Tempeh Blocks", emoji: "🧱", category: "Protein Foods", calories: 190, protein: 19, carbs: 9, fat: 11, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Pork Tenderloin", emoji: "🥩", category: "Protein Foods", calories: 143, protein: 26, carbs: 0, fat: 3.5, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Edamame Pods", emoji: "🫛", category: "Protein Foods", calories: 120, protein: 11, carbs: 10, fat: 5, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Whey Protein Powder Scoop", emoji: "🥤", category: "Protein Foods", calories: 120, protein: 24, carbs: 2, fat: 1.5, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { name: "Seitan Strip Stirfry", emoji: "🥩", category: "Protein Foods", calories: 150, protein: 28, carbs: 4, fat: 1.5, image_url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },

  // === SNACKS (10) ===
  { name: "Popcorn Buttered", emoji: "🍿", category: "Snacks", calories: 120, protein: 2, carbs: 15, fat: 6, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Potato Chips Bag", emoji: "🍟", category: "Snacks", calories: 150, protein: 2, carbs: 15, fat: 10, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Mixed Almonds Cashews", emoji: "🫘", category: "Snacks", calories: 170, protein: 5, carbs: 8, fat: 15, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Beef Jerky Strip", emoji: "🥩", category: "Snacks", calories: 80, protein: 10, carbs: 3, fat: 2, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Peanut Butter Rice Cake", emoji: "🍘", category: "Snacks", calories: 130, protein: 4, carbs: 14, fat: 7, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Tortilla Chips Queso", emoji: "🫓", category: "Snacks", calories: 220, protein: 4, carbs: 24, fat: 12, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Protein Bar Oat", emoji: "🍫", category: "Snacks", calories: 200, protein: 20, carbs: 18, fat: 6, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Pretzels Mini Twist", emoji: "🥨", category: "Snacks", calories: 110, protein: 2, carbs: 23, fat: 1, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Dark Chocolate Covered Raisins", emoji: "🍇", category: "Snacks", calories: 140, protein: 1.5, carbs: 22, fat: 6, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { name: "Dried Mango Slices", emoji: "🥭", category: "Snacks", calories: 120, protein: 1, carbs: 28, fat: 0.5, image_url: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },

  // === DRINKS (10) ===
  { name: "Black Coffee", emoji: "☕", category: "Drinks", calories: 2, protein: 0.2, carbs: 0, fat: 0, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Green Tea Cup", emoji: "🍵", category: "Drinks", calories: 2, protein: 0, carbs: 0.2, fat: 0, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Diet Cola Bottle", emoji: "🥤", category: "Drinks", calories: 0, protein: 0, carbs: 0, fat: 0, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Orange Juice Fresh", emoji: "🍊", category: "Drinks", calories: 110, protein: 2, carbs: 26, fat: 0.2, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Vanilla Milkshake", emoji: "🥛", category: "Drinks", calories: 320, protein: 8, carbs: 42, fat: 14, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Coconut Water Fresh", emoji: "🥥", category: "Drinks", calories: 45, protein: 1, carbs: 10, fat: 0.2, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Red Wine Glass", emoji: "🍷", category: "Drinks", calories: 125, protein: 0.1, carbs: 3.8, fat: 0, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Craft Beer Pint", emoji: "🍺", category: "Drinks", calories: 150, protein: 1.6, carbs: 13, fat: 0, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Energy Drink Can", emoji: "⚡", category: "Drinks", calories: 110, protein: 0, carbs: 28, fat: 0, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { name: "Water Lemon Slice", emoji: "💧", category: "Drinks", calories: 0, protein: 0, carbs: 0, fat: 0, image_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" }
];
export default FOODS_CATALOG;
