# SmartCart

A modern, interactive shopping cart application built with React and enhanced with Google's Gemini AI to provide intelligent recipe suggestions based on your selected items.

## Features

### 🛍️ Shopping Experience
- **Product Browsing**: View a curated list of fresh products with high-quality images.
- **Cart Management**: Easily add items, update quantities, or remove products from your cart.
- **Real-time Totals**: Automatic calculation of subtotals, taxes, and final amounts.

### 🤖 AI Integration (Chef Gemini)
- **Smart Recipe Suggestions**: The application analyzes the contents of your cart using the Google Gemini API.
- **Contextual Ideas**: Click "Get Recipe Idea" to receive a custom meal suggestion that uses the ingredients you've selected, complete with a title, summary, and ingredient list.

## Technologies Used

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS via CDN
- **AI**: Google GenAI SDK (@google/genai)
- **Icons**: Lucide (SVG)

## Project Structure

- `components/`: Reusable UI components (ProductList, CartItem, CartSummary).
- `services/`: External service integrations, specifically `geminiService.ts` for AI interactions.
- `constants.ts`: Mock data including products and images.
- `types.ts`: TypeScript interfaces for strong typing across the app.

## Getting Started

1. Browse the product list on the main dashboard.
2. Click "Add to Cart" on items you wish to purchase.
3. View your cart in the sidebar.
4. Once you have items in your cart, check the **Chef Gemini Suggests** panel to get cooking inspiration!
