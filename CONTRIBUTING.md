# Contributing to SJ Notes

Thank you for your interest in contributing to SJ Notes! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn package manager

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sj-notes
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On macOS/Linux
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Start Development Servers**
   ```bash
   # Backend (from backend directory)
   uvicorn main:app --reload
   
   # Frontend (from frontend directory)
   npm run dev
   ```

## Project Structure

```
sj-notes/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application file
│   ├── models.py           # Database models
│   ├── schemas.py          # Pydantic schemas
│   ├── database.py         # Database configuration
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API integration
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
└── README.md
```

## Development Guidelines

### Code Style

**Python (Backend)**
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Write descriptive docstrings for functions and classes
- Keep functions focused and single-purpose

**JavaScript/React (Frontend)**
- Use ES6+ features
- Follow React best practices and hooks patterns
- Use meaningful component and variable names
- Keep components small and focused

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb in present tense (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Add detailed description if necessary

Example:
```
Add color picker to goals component

- Implement color selection for goal creation
- Update backend schema to support goal colors
- Add color display in goal list view
```

### Pull Request Process

1. **Fork the repository** and create a feature branch
2. **Make your changes** following the coding guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if necessary
5. **Submit a pull request** with a clear description

### Testing

- Test all CRUD operations for each feature
- Verify responsive design on different screen sizes
- Check API endpoints with various input scenarios
- Ensure error handling works correctly

## Feature Requests and Bug Reports

### Bug Reports
When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

### Feature Requests
For new features, please provide:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Mockups or examples if helpful

## API Guidelines

### Adding New Endpoints
- Follow RESTful conventions
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Include proper error handling and status codes
- Add Pydantic validation for request/response models
- Update API documentation

### Database Changes
- Create migration scripts for schema changes
- Ensure backward compatibility when possible
- Update model classes and schemas accordingly

## UI/UX Guidelines

### Design Principles
- Maintain consistency with existing design
- Ensure accessibility (proper contrast, keyboard navigation)
- Follow mobile-first responsive design
- Use the established color palette and spacing

### Component Development
- Create reusable components when possible
- Follow the existing component structure
- Add proper prop validation
- Include loading and error states

## Questions and Support

If you have questions about contributing:
- Check existing issues and discussions
- Create a new issue with the "question" label
- Reach out to maintainers

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

Thank you for contributing to SJ Notes!