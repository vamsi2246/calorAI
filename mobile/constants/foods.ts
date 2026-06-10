// ====================================================
// CalorAI Food Database (150+ items)
// ====================================================

export interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  image: string;
  category: string;
  calories: number;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
}

export const FOOD_ITEMS: FoodItem[] = [
  // === VEGETABLES (10) ===
  { id: "veg_1", name: "Broccoli Florets", emoji: "🥦", category: "Vegetables", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_2", name: "Spinach Leaves", emoji: "🥬", category: "Vegetables", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_3", name: "Avocado", emoji: "🥑", category: "Vegetables", calories: 160, protein: 2, carbs: 9, fat: 15, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_4", name: "Sweet Potato", emoji: "🍠", category: "Vegetables", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_5", name: "Carrot Sticks", emoji: "🥕", category: "Vegetables", calories: 41, protein: 0.9, carbs: 10, fat: 0.2, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_6", name: "Red Bell Pepper", emoji: "🫑", category: "Vegetables", calories: 31, protein: 1, carbs: 6, fat: 0.3, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_7", name: "Cucumber", emoji: "🥒", category: "Vegetables", calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_8", name: "Asparagus Spears", emoji: "🌱", category: "Vegetables", calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_9", name: "Brussels Sprouts", emoji: "🥬", category: "Vegetables", calories: 43, protein: 3.4, carbs: 9, fat: 0.3, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },
  { id: "veg_10", name: "Garlic Cloves", emoji: "🧄", category: "Vegetables", calories: 149, protein: 6.4, carbs: 33, fat: 0.5, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60" },

  // === FRUITS (10) ===
  { id: "fruit_1", name: "Red Apple", emoji: "🍎", category: "Fruits", calories: 52, protein: 0.3, carbs: 14, fat: 0.2, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_2", name: "Banana", emoji: "🍌", category: "Fruits", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_3", name: "Blueberries", emoji: "🫐", category: "Fruits", calories: 57, protein: 0.7, carbs: 14, fat: 0.3, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_4", name: "Strawberries", emoji: "🍓", category: "Fruits", calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_5", name: "Fresh Mango", emoji: "🥭", category: "Fruits", calories: 60, protein: 0.8, carbs: 15, fat: 0.4, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_6", name: "Orange Slices", emoji: "🍊", category: "Fruits", calories: 47, protein: 0.9, carbs: 12, fat: 0.1, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_7", name: "Pineapple Chunks", emoji: "🍍", category: "Fruits", calories: 50, protein: 0.5, carbs: 13, fat: 0.1, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_8", name: "Watermelon", emoji: "🍉", category: "Fruits", calories: 30, protein: 0.6, carbs: 8, fat: 0.2, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_9", name: "Grapes", emoji: "🍇", category: "Fruits", calories: 69, protein: 0.7, carbs: 18, fat: 0.2, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },
  { id: "fruit_10", name: "Cherries", emoji: "🍒", category: "Fruits", calories: 50, protein: 1, carbs: 12, fat: 0.3, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60" },

  // === INDIAN (15) ===
  { id: "ind_1", name: "Butter Chicken", emoji: "🍛", category: "Indian", calories: 450, protein: 32, carbs: 14, fat: 28, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_2", name: "Paneer Tikka Masala", emoji: "🧀", category: "Indian", calories: 380, protein: 18, carbs: 12, fat: 26, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_3", name: "Chicken Biryani", emoji: "🍚", category: "Indian", calories: 550, protein: 28, carbs: 65, fat: 16, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_4", name: "Dal Makhani", emoji: "🥣", category: "Indian", calories: 310, protein: 11, carbs: 38, fat: 14, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_5", name: "Chana Masala", emoji: "🍛", category: "Indian", calories: 250, protein: 10, carbs: 40, fat: 6, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_6", name: "Garlic Naan", emoji: "🫓", category: "Indian", calories: 280, protein: 8, carbs: 45, fat: 7, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_7", name: "Samosa", emoji: "🔺", category: "Indian", calories: 150, protein: 3, carbs: 18, fat: 8, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_8", name: "Aloo Gobhi", emoji: "🥦", category: "Indian", calories: 180, protein: 4, carbs: 22, fat: 9, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_9", name: "Palak Paneer", emoji: "🥬", category: "Indian", calories: 290, protein: 14, carbs: 10, fat: 22, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_10", name: "Masala Dosa", emoji: "🥞", category: "Indian", calories: 350, protein: 7, carbs: 54, fat: 12, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_11", name: "Idli Sambar", emoji: "⚪", category: "Indian", calories: 210, protein: 6, carbs: 42, fat: 2, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_12", name: "Tandoori Chicken", emoji: "🍗", category: "Indian", calories: 280, protein: 35, carbs: 4, fat: 14, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_13", name: "Rogan Josh", emoji: "🍖", category: "Indian", calories: 420, protein: 29, carbs: 10, fat: 29, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_14", name: "Gulab Jamun", emoji: "🧆", category: "Indian", calories: 150, protein: 2, carbs: 24, fat: 6, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },
  { id: "ind_15", name: "Onion Bhaji", emoji: "🧅", category: "Indian", calories: 190, protein: 3, carbs: 20, fat: 11, image: "https://images.unsplash.com/photo-1585938338392-50a5997042d1?w=500&auto=format&fit=crop&q=60" },

  // === ITALIAN (15) ===
  { id: "ita_1", name: "Margherita Pizza", emoji: "🍕", category: "Italian", calories: 275, protein: 11, carbs: 36, fat: 9, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_2", name: "Spaghetti Carbonara", emoji: "🍝", category: "Italian", calories: 450, protein: 20, carbs: 48, fat: 20, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_3", name: "Lasagna Bolognese", emoji: "🥘", category: "Italian", calories: 550, protein: 28, carbs: 45, fat: 28, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_4", name: "Fettuccine Alfredo", emoji: "🍝", category: "Italian", calories: 620, protein: 18, carbs: 55, fat: 38, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_5", name: "Caprese Salad", emoji: "🥗", category: "Italian", calories: 230, protein: 10, carbs: 4, fat: 20, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_6", name: "Risotto Mushroom", emoji: "🍚", category: "Italian", calories: 380, protein: 8, carbs: 55, fat: 14, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_7", name: "Minestrone Soup", emoji: "🥣", category: "Italian", calories: 120, protein: 5, carbs: 18, fat: 2.5, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_8", name: "Bruschetta Tomato", emoji: "🥖", category: "Italian", calories: 150, protein: 4, carbs: 22, fat: 5, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_9", name: "Tiramisu Dessert", emoji: "🍰", category: "Italian", calories: 340, protein: 6, carbs: 38, fat: 18, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_10", name: "Gnocchi Pesto", emoji: "🥣", category: "Italian", calories: 410, protein: 8, carbs: 62, fat: 15, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_11", name: "Ravioli Spinach", emoji: "🥟", category: "Italian", calories: 320, protein: 12, carbs: 40, fat: 12, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_12", name: "Panna Cotta", emoji: "🍮", category: "Italian", calories: 280, protein: 4, carbs: 28, fat: 18, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_13", name: "Prosciutto Melon", emoji: "🥓", category: "Italian", calories: 180, protein: 12, carbs: 14, fat: 8, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_14", name: "Calzone", emoji: "🍕", category: "Italian", calories: 510, protein: 22, carbs: 58, fat: 20, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },
  { id: "ita_15", name: "Polenta Creamy", emoji: "🥣", category: "Italian", calories: 220, protein: 5, carbs: 35, fat: 6, image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=60" },

  // === CHINESE (10) ===
  { id: "chi_1", name: "Kung Pao Chicken", emoji: "🍗", category: "Chinese", calories: 390, protein: 26, carbs: 18, fat: 24, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_2", name: "Mapo Tofu", emoji: "🍲", category: "Chinese", calories: 280, protein: 16, carbs: 14, fat: 19, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_3", name: "Wonton Soup", emoji: "🥣", category: "Chinese", calories: 180, protein: 11, carbs: 20, fat: 6, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_4", name: "Spring Rolls", emoji: "🌯", category: "Chinese", calories: 200, protein: 4, carbs: 24, fat: 10, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_5", name: "Chow Mein", emoji: "🍜", category: "Chinese", calories: 410, protein: 12, carbs: 54, fat: 16, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_6", name: "Peking Duck", emoji: "🦆", category: "Chinese", calories: 480, protein: 24, carbs: 10, fat: 38, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_7", name: "Sweet & Sour Pork", emoji: "🥩", category: "Chinese", calories: 450, protein: 20, carbs: 38, fat: 24, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_8", name: "Dim Sum Steamed", emoji: "🥟", category: "Chinese", calories: 210, protein: 10, carbs: 26, fat: 7, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_9", name: "Beef and Broccoli", emoji: "🥩", category: "Chinese", calories: 320, protein: 28, carbs: 14, fat: 16, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },
  { id: "chi_10", name: "Fried Rice Egg", emoji: "🍚", category: "Chinese", calories: 350, protein: 9, carbs: 52, fat: 12, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=60" },

  // === MEXICAN (10) ===
  { id: "mex_1", name: "Beef Tacos", emoji: "🌮", category: "Mexican", calories: 230, protein: 14, carbs: 18, fat: 11, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_2", name: "Chicken Quesadilla", emoji: "🫓", category: "Mexican", calories: 420, protein: 24, carbs: 32, fat: 22, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_3", name: "Burrito Bowl Beef", emoji: "🥣", category: "Mexican", calories: 540, protein: 32, carbs: 54, fat: 20, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_4", name: "Guacamole & Chips", emoji: "🥑", category: "Mexican", calories: 290, protein: 4, carbs: 34, fat: 16, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_5", name: "Chicken Enchiladas", emoji: "🌯", category: "Mexican", calories: 410, protein: 22, carbs: 36, fat: 20, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_6", name: "Chiles Rellenos", emoji: "🌶️", category: "Mexican", calories: 340, protein: 12, carbs: 18, fat: 24, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_7", name: "Elote Corn", emoji: "🌽", category: "Mexican", calories: 210, protein: 5, carbs: 24, fat: 11, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_8", name: "Fajitas Sizzling Beef", emoji: "🍳", category: "Mexican", calories: 460, protein: 34, carbs: 24, fat: 26, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_9", name: "Pico de Gallo", emoji: "🥣", category: "Mexican", calories: 15, protein: 0.6, carbs: 3, fat: 0.1, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },
  { id: "mex_10", name: "Churros with Caramel", emoji: "🥖", category: "Mexican", calories: 280, protein: 3, carbs: 42, fat: 12, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60" },

  // === AMERICAN (10) ===
  { id: "ame_1", name: "Beef Hamburger", emoji: "🍔", category: "American", calories: 354, protein: 20, carbs: 30, fat: 17, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_2", name: "Hot Dog Mustard", emoji: "🌭", category: "American", calories: 290, protein: 10, carbs: 24, fat: 16, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_3", name: "BBQ Pork Ribs", emoji: "🍖", category: "American", calories: 520, protein: 34, carbs: 12, fat: 38, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_4", name: "Buffalo Wings", emoji: "🍗", category: "American", calories: 380, protein: 24, carbs: 2, fat: 28, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_5", name: "Mac and Cheese", emoji: "🧀", category: "American", calories: 410, protein: 15, carbs: 44, fat: 19, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_6", name: "Philly Cheesesteak", emoji: "🥪", category: "American", calories: 590, protein: 36, carbs: 48, fat: 28, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_7", name: "Clam Chowder Soup", emoji: "🥣", category: "American", calories: 280, protein: 12, carbs: 22, fat: 16, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_8", name: "Corn on the Cob", emoji: "🌽", category: "American", calories: 90, protein: 3, carbs: 19, fat: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_9", name: "Chocolate Brownie", emoji: "🧁", category: "American", calories: 250, protein: 3, carbs: 32, fat: 12, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
  { id: "ame_10", name: "Apple Pie", emoji: "🥧", category: "American", calories: 300, protein: 2, carbs: 44, fat: 13, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },

  // === HEALTHY FOODS (15) ===
  { id: "hlth_1", name: "Quinoa Salad Bowl", emoji: "🥗", category: "Healthy Foods", calories: 220, protein: 7, carbs: 32, fat: 6, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_2", name: "Grilled Chicken Salad", emoji: "🥗", category: "Healthy Foods", calories: 310, protein: 34, carbs: 8, fat: 14, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_3", name: "Steamed Salmon", emoji: "🐟", category: "Healthy Foods", calories: 240, protein: 28, carbs: 0, fat: 14, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_4", name: "Chia Seed Pudding", emoji: "🥣", category: "Healthy Foods", calories: 150, protein: 4, carbs: 16, fat: 8, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_5", name: "Boiled Eggs (2)", emoji: "🥚", category: "Healthy Foods", calories: 140, protein: 12, carbs: 1, fat: 10, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_6", name: "Oatmeal with Berries", emoji: "🥣", category: "Healthy Foods", calories: 180, protein: 6, carbs: 34, fat: 2.5, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_7", name: "Mixed Almonds", emoji: "🫘", category: "Healthy Foods", calories: 160, protein: 6, carbs: 6, fat: 14, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_8", name: "Lentil Soup Bowl", emoji: "🥣", category: "Healthy Foods", calories: 180, protein: 12, carbs: 28, fat: 2, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_9", name: "Hummus & Celery", emoji: "🥒", category: "Healthy Foods", calories: 120, protein: 4, carbs: 12, fat: 6, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_10", name: "Low-fat Greek Yogurt", emoji: "🥛", category: "Healthy Foods", calories: 100, protein: 15, carbs: 6, fat: 2, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_11", name: "Roasted Chickpeas", emoji: "🫘", category: "Healthy Foods", calories: 140, protein: 7, carbs: 22, fat: 3, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_12", name: "Brown Rice Bowl", emoji: "🍚", category: "Healthy Foods", calories: 215, protein: 5, carbs: 45, fat: 1.6, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_13", name: "Tofu Stir-fry", emoji: "🍲", category: "Healthy Foods", calories: 200, protein: 14, carbs: 12, fat: 11, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_14", name: "Protein Shake Whey", emoji: "🥤", category: "Healthy Foods", calories: 140, protein: 25, carbs: 3, fat: 2, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },
  { id: "hlth_15", name: "Baked Sweet Potato", emoji: "🍠", category: "Healthy Foods", calories: 110, protein: 2, carbs: 26, fat: 0.2, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60" },

  // === FAST FOODS (10) ===
  { id: "fast_1", name: "French Fries", emoji: "🍟", category: "Fast Foods", calories: 312, protein: 3.4, carbs: 41, fat: 15, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_2", name: "Pepperoni Pizza Slice", emoji: "🍕", category: "Fast Foods", calories: 290, protein: 12, carbs: 32, fat: 12, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_3", name: "Chicken Nuggets (6)", emoji: "🍗", category: "Fast Foods", calories: 270, protein: 15, carbs: 16, fat: 16, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_4", name: "Double Cheeseburger", emoji: "🍔", category: "Fast Foods", calories: 490, protein: 28, carbs: 33, fat: 26, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_5", name: "Glazed Donut", emoji: "🍩", category: "Fast Foods", calories: 240, protein: 3, carbs: 28, fat: 12, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_6", name: "Onion Rings Basket", emoji: "🧅", category: "Fast Foods", calories: 380, protein: 4, carbs: 44, fat: 20, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_7", name: "Crispy Fried Chicken", emoji: "🍗", category: "Fast Foods", calories: 320, protein: 22, carbs: 15, fat: 19, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_8", name: "Soft Pretzel Salted", emoji: "🥨", category: "Fast Foods", calories: 340, protein: 9, carbs: 68, fat: 2.5, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_9", name: "Fish and Chips", emoji: "🐟", category: "Fast Foods", calories: 580, protein: 24, carbs: 55, fat: 30, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },
  { id: "fast_10", name: "Bacon Grilled Cheese", emoji: "🥪", category: "Fast Foods", calories: 450, protein: 18, carbs: 32, fat: 28, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=500&auto=format&fit=crop&q=60" },

  // === SEAFOODS (10) ===
  { id: "sea_1", name: "Grilled Salmon Fillet", emoji: "🐟", category: "Seafoods", calories: 280, protein: 32, carbs: 0, fat: 16, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_2", name: "Garlic Butter Shrimp", emoji: "🍤", category: "Seafoods", calories: 210, protein: 24, carbs: 2, fat: 12, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_3", name: "Seared Ahi Tuna", emoji: "🐟", category: "Seafoods", calories: 180, protein: 30, carbs: 1, fat: 5, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_4", name: "Lobster Tail Grilled", emoji: "🦞", category: "Seafoods", calories: 130, protein: 26, carbs: 1, fat: 2, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_5", name: "Steamed Mussels Bowl", emoji: "🦪", category: "Seafoods", calories: 150, protein: 18, carbs: 6, fat: 4.5, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_6", name: "Fried Calamari Ring", emoji: "🍤", category: "Seafoods", calories: 310, protein: 16, carbs: 26, fat: 15, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_7", name: "Cod Fish Filet", emoji: "🐟", category: "Seafoods", calories: 90, protein: 20, carbs: 0, fat: 1, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_8", name: "Oysters Raw (6)", emoji: "🦪", category: "Seafoods", calories: 60, protein: 6, carbs: 4, fat: 1.5, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_9", name: "Crab Cakes (2)", emoji: "🦀", category: "Seafoods", calories: 260, protein: 18, carbs: 14, fat: 14, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },
  { id: "sea_10", name: "Octopus Salad Grilled", emoji: "🐙", category: "Seafoods", calories: 160, protein: 22, carbs: 4, fat: 6, image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60" },

  // === DESSERTS (10) ===
  { id: "des_1", name: "Chocolate Cake Slice", emoji: "🍰", category: "Desserts", calories: 350, protein: 4, carbs: 48, fat: 16, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_2", name: "Strawberry Cheesecake", emoji: "🍰", category: "Desserts", calories: 400, protein: 6, carbs: 44, fat: 22, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_3", name: "Chocolate Chip Cookie", emoji: "🍪", category: "Desserts", calories: 150, protein: 2, carbs: 20, fat: 7, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_4", name: "Vanilla Ice Cream Scoop", emoji: "🍨", category: "Desserts", calories: 140, protein: 2.5, carbs: 16, fat: 7, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_5", name: "Macarons (3)", emoji: "🫓", category: "Desserts", calories: 160, protein: 3, carbs: 22, fat: 7, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_6", name: "Apple Crumble", emoji: "🥧", category: "Desserts", calories: 280, protein: 2, carbs: 42, fat: 12, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_7", name: "Red Velvet Cupcake", emoji: "🧁", category: "Desserts", calories: 240, protein: 3, carbs: 30, fat: 11, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_8", name: "Dark Chocolate Square", emoji: "🍫", category: "Desserts", calories: 80, protein: 1, carbs: 8, fat: 6, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_9", name: "Fruit Tart", emoji: "🥧", category: "Desserts", calories: 220, protein: 3, carbs: 32, fat: 9, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },
  { id: "des_10", name: "Crème Brûlée", emoji: "🍮", category: "Desserts", calories: 290, protein: 4, carbs: 26, fat: 19, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60" },

  // === BREAKFAST (10) ===
  { id: "brk_1", name: "Eggs Benedict", emoji: "🍳", category: "Breakfast", calories: 350, protein: 18, carbs: 24, fat: 20, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_2", name: "Buttermilk Pancakes", emoji: "🥞", category: "Breakfast", calories: 290, protein: 6, carbs: 48, fat: 8, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_3", name: "Belgian Waffles Syrup", emoji: "🧇", category: "Breakfast", calories: 310, protein: 5, carbs: 52, fat: 9, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_4", name: "Avocado Toast Egg", emoji: "🍞", category: "Breakfast", calories: 260, protein: 11, carbs: 24, fat: 14, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_5", name: "French Toast Maple", emoji: "🍞", category: "Breakfast", calories: 320, protein: 8, carbs: 44, fat: 12, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_6", name: "Breakfast Burrito", emoji: "🌯", category: "Breakfast", calories: 430, protein: 22, carbs: 38, fat: 20, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_7", name: "Smoked Salmon Bagel", emoji: "🥯", category: "Breakfast", calories: 360, protein: 24, carbs: 42, fat: 10, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_8", name: "Granola Fruit Bowl", emoji: "🥣", category: "Breakfast", calories: 240, protein: 6, carbs: 40, fat: 6, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_9", name: "Croissant with Butter", emoji: "🥐", category: "Breakfast", calories: 272, protein: 5, carbs: 28, fat: 16, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },
  { id: "brk_10", name: "Egg & Cheese Muffin", emoji: "🥯", category: "Breakfast", calories: 290, protein: 14, carbs: 29, fat: 12, image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&auto=format&fit=crop&q=60" },

  // === LUNCH (10) ===
  { id: "lun_1", name: "Chicken Caesar Wrap", emoji: "🌯", category: "Lunch", calories: 380, protein: 28, carbs: 32, fat: 16, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_2", name: "Cobb Salad Bowl", emoji: "🥗", category: "Lunch", calories: 420, protein: 32, carbs: 10, fat: 28, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_3", name: "Turkey Club Sandwich", emoji: "🥪", category: "Lunch", calories: 460, protein: 30, carbs: 44, fat: 18, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_4", name: "Tomato Basil Soup & Grilled Cheese", emoji: "🥪", category: "Lunch", calories: 510, protein: 18, carbs: 54, fat: 24, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_5", name: "Nicoise Salad Tuna", emoji: "🥗", category: "Lunch", calories: 340, protein: 26, carbs: 16, fat: 18, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_6", name: "Sushi Combo Pack", emoji: "🍣", category: "Lunch", calories: 380, protein: 16, carbs: 64, fat: 4, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_7", name: "Beef Chili Bowl", emoji: "🥣", category: "Lunch", calories: 320, protein: 22, carbs: 28, fat: 14, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_8", name: "Falafel Pita Pocket", emoji: "🌯", category: "Lunch", calories: 350, protein: 12, carbs: 48, fat: 12, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_9", name: "Quinoa Veggie Wrap", emoji: "🌯", category: "Lunch", calories: 290, protein: 9, carbs: 42, fat: 10, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },
  { id: "lun_10", name: "Shrimp Rice Bowl", emoji: "🍚", category: "Lunch", calories: 370, protein: 26, carbs: 50, fat: 6, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60" },

  // === DINNER (10) ===
  { id: "din_1", name: "Sirloin Steak Potatoes", emoji: "🥩", category: "Dinner", calories: 590, protein: 42, carbs: 35, fat: 32, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_2", name: "Chicken Alfredo", emoji: "🍝", category: "Dinner", calories: 680, protein: 38, carbs: 62, fat: 30, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_3", name: "Baked Cod Broccoli", emoji: "🐟", category: "Dinner", calories: 220, protein: 26, carbs: 12, fat: 6, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_4", name: "BBQ Pulled Pork Burger", emoji: "🍔", category: "Dinner", calories: 540, protein: 32, carbs: 44, fat: 22, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_5", name: "Vegetable Curry Rice", emoji: "🍛", category: "Dinner", calories: 380, protein: 8, carbs: 68, fat: 8, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_6", name: "Grilled Lamb Chops", emoji: "🍖", category: "Dinner", calories: 480, protein: 36, carbs: 0, fat: 38, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_7", name: "Shrimp Scampi Pasta", emoji: "🍝", category: "Dinner", calories: 510, protein: 28, carbs: 54, fat: 18, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_8", name: "Beef Stir-fry Noodles", emoji: "🍜", category: "Dinner", calories: 470, protein: 30, carbs: 52, fat: 16, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_9", name: "Tofu Fried Rice Bowl", emoji: "🍚", category: "Dinner", calories: 340, protein: 12, carbs: 54, fat: 8, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },
  { id: "din_10", name: "Turkey Meatloaf Potatoes", emoji: "🧆", category: "Dinner", calories: 410, protein: 28, carbs: 36, fat: 15, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60" },

  // === PROTEIN FOODS (10) ===
  { id: "pro_1", name: "Grilled Chicken Breast", emoji: "🍗", category: "Protein Foods", calories: 165, protein: 31, carbs: 0, fat: 3.6, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_2", name: "Lean Ground Beef", emoji: "🥩", category: "Protein Foods", calories: 250, protein: 26, carbs: 0, fat: 15, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_3", name: "Tuna Canned in Water", emoji: "🐟", category: "Protein Foods", calories: 120, protein: 26, carbs: 0, fat: 1, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_4", name: "Cottage Cheese 2%", emoji: "🧀", category: "Protein Foods", calories: 90, protein: 12, carbs: 3, fat: 3, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_5", name: "Greek Yogurt Plain", emoji: "🥛", category: "Protein Foods", calories: 100, protein: 17, carbs: 4, fat: 0.7, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_6", name: "Tempeh Blocks", emoji: "🧱", category: "Protein Foods", calories: 190, protein: 19, carbs: 9, fat: 11, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_7", name: "Pork Tenderloin", emoji: "🥩", category: "Protein Foods", calories: 143, protein: 26, carbs: 0, fat: 3.5, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_8", name: "Edamame Pods", emoji: "🫛", category: "Protein Foods", calories: 120, protein: 11, carbs: 10, fat: 5, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_9", name: "Whey Protein Powder Scoop", emoji: "🥤", category: "Protein Foods", calories: 120, protein: 24, carbs: 2, fat: 1.5, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },
  { id: "pro_10", name: "Seitan Strip Stirfry", emoji: "🥩", category: "Protein Foods", calories: 150, protein: 28, carbs: 4, fat: 1.5, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500&auto=format&fit=crop&q=60" },

  // === SNACKS (10) ===
  { id: "snk_1", name: "Popcorn Buttered", emoji: "🍿", category: "Snacks", calories: 120, protein: 2, carbs: 15, fat: 6, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_2", name: "Potato Chips Bag", emoji: "🍟", category: "Snacks", calories: 150, protein: 2, carbs: 15, fat: 10, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_3", name: "Mixed Almonds Cashews", emoji: "🫘", category: "Snacks", calories: 170, protein: 5, carbs: 8, fat: 15, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_4", name: "Beef Jerky Strip", emoji: "🥩", category: "Snacks", calories: 80, protein: 10, carbs: 3, fat: 2, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_5", name: "Peanut Butter Rice Cake", emoji: "🍘", category: "Snacks", calories: 130, protein: 4, carbs: 14, fat: 7, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_6", name: "Tortilla Chips Queso", emoji: "🫓", category: "Snacks", calories: 220, protein: 4, carbs: 24, fat: 12, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_7", name: "Protein Bar Oat", emoji: "🍫", category: "Snacks", calories: 200, protein: 20, carbs: 18, fat: 6, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_8", name: "Pretzels Mini Twist", emoji: "🥨", category: "Snacks", calories: 110, protein: 2, carbs: 23, fat: 1, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_9", name: "Dark Chocolate Covered Raisins", emoji: "🍇", category: "Snacks", calories: 140, protein: 1.5, carbs: 22, fat: 6, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },
  { id: "snk_10", name: "Dried Mango Slices", emoji: "🥭", category: "Snacks", calories: 120, protein: 1, carbs: 28, fat: 0.5, image: "https://images.unsplash.com/photo-1599490659213-e2b9527b0876?w=500&auto=format&fit=crop&q=60" },

  // === DRINKS (10) ===
  { id: "drn_1", name: "Black Coffee", emoji: "☕", category: "Drinks", calories: 2, protein: 0.2, carbs: 0, fat: 0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_2", name: "Green Tea Cup", emoji: "🍵", category: "Drinks", calories: 2, protein: 0, carbs: 0.2, fat: 0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_3", name: "Diet Cola Bottle", emoji: "🥤", category: "Drinks", calories: 0, protein: 0, carbs: 0, fat: 0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_4", name: "Orange Juice Fresh", emoji: "🍊", category: "Drinks", calories: 110, protein: 2, carbs: 26, fat: 0.2, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_5", name: "Vanilla Milkshake", emoji: "🥛", category: "Drinks", calories: 320, protein: 8, carbs: 42, fat: 14, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_6", name: "Coconut Water Fresh", emoji: "🥥", category: "Drinks", calories: 45, protein: 1, carbs: 10, fat: 0.2, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_7", name: "Red Wine Glass", emoji: "🍷", category: "Drinks", calories: 125, protein: 0.1, carbs: 3.8, fat: 0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_8", name: "Craft Beer Pint", emoji: "🍺", category: "Drinks", calories: 150, protein: 1.6, carbs: 13, fat: 0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_9", name: "Energy Drink Can", emoji: "⚡", category: "Drinks", calories: 110, protein: 0, carbs: 28, fat: 0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" },
  { id: "drn_10", name: "Water Lemon Slice", emoji: "💧", category: "Drinks", calories: 0, protein: 0, carbs: 0, fat: 0, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=60" }
];
