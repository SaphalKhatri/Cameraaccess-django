# Camera Access User Registration System

A Django-based user registration system with camera integration for photo capture.

## Features

- ✅ User registration with photo capture
- ✅ Camera integration using webcam
- ✅ RESTful API endpoints
- ✅ Modern, responsive UI
- ✅ Real-time validation feedback
- ✅ PostgreSQL database support

## Prerequisites

- Python 3.8+
- PostgreSQL database
- Webcam access (for photo capture)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd camera_project
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example file
   cp env_example.txt .env
   
   # Edit .env with your actual values
   # See env_example.txt for required variables
   ```

5. **Set up PostgreSQL database**
   - Create a PostgreSQL database
   - Update the database credentials in your `.env` file

6. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

8. **Run the development server**
   ```bash
   python manage.py runserver
   ```

9. **Access the application**
   - Frontend: http://localhost:8000/
   - Admin panel: http://localhost:8000/admin/
   - API endpoint: http://localhost:8000/api/users/

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Settings
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
```

## API Endpoints

### POST /api/users/
Register a new user with photo capture.

**Request Body:**
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password",
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St",
    "phone": "1234567890",
    "image": "photo_file_optional"
}
```

**Response:**
- `201 Created`: User registered successfully
- `400 Bad Request`: Validation errors

## Security Notes

⚠️ **IMPORTANT**: Before deploying to production:

1. **Change the SECRET_KEY** in your `.env` file
2. **Set DEBUG=False** for production
3. **Update ALLOWED_HOSTS** with your domain
4. **Use HTTPS** in production
5. **Configure proper database security**
6. **Set up proper file upload security**

## Development

### Project Structure
```
camera_project/
├── camera/                 # Main app
│   ├── models.py          # UserProfile model
│   ├── views.py           # API views
│   ├── serializers.py     # DRF serializers
│   └── urls.py            # App URLs
├── camera_project/        # Project settings
│   ├── settings.py        # Django settings
│   └── urls.py            # Main URLs
├── templates/             # HTML templates
├── static/                # CSS, JS, images
└── media/                 # User uploaded files
```

### Running Tests
```bash
python manage.py test
```

### Code Quality
```bash
# Check for issues
python manage.py check

# Validate models
python manage.py validate
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub. 