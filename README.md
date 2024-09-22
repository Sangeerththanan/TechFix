# TechFix - Admin Dashboard

## Project Overview
TechFix is an admin dashboard designed to streamline procurement, inventory, and pricing management for a computer shop. The platform provides comprehensive control over products, suppliers, and analytics, helping administrators make data-driven decisions.

## Key Features
### Backend API Endpoints:
1. **Analytics**:
   - Retrieve analytics reports
   - Create new analytics data
   - View specific analytics data
2. **Inventory**:
   - List current inventory
   - Track stock levels
   - Add new inventory
   - Update stock level for specific products
3. **Notifications**:
   - Get notifications
   - Send new notifications
   - Update notification status (read/unread)
4. **Pricing**:
   - Get all pricing information
   - Update price and discount
   - Get price for a specific product
5. **Products**:
   - List all available products
   - Add, update, delete products

### Frontend Features:
- **User Features**:
  - Homepage and "About Us" page
  - Product view for all users
  - User login and signup
- **Admin Dashboard**:
  - Manage products (view, add, update, delete)
  - Manage suppliers (view, add, update, delete)
  - View and analyze inventory and pricing data
  - Manage analytics and notifications

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Spring Boot, MySQL
- **Authentication**: JWT-based authentication for secure access control
- **Database**: MySQL for data persistence
- **API Integration**: REST APIs for seamless backend communication

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Sangeerththanan/TechFix.git

2. Navigate to the backend folder and run the Spring Boot application:
   ```bash
   cd backend
   ./mvnw spring-boot:run

3. Navigate to the frontend folder and start the React app:
   ```bash
   cd frontend
   npm install
   npm start

## Usage
- Admins can manage products, suppliers, inventory, and pricing.
- Users can browse products, sign up, and log in to their accounts.
- All users can view the homepage, "About Us" section, and product catalog.

## Demo Video
https://github.com/user-attachments/assets/7ea6021c-2eaf-407f-b6d7-4d77d52f4aa2

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, feel free to reach out to me at s.sangeerththanan@gmail.com.
