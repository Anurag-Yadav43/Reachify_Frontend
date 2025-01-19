Reachify Full Stack Assignment
Full-stack application with React frontend and FastAPI backend featuring CRUD operations and Azure deployment.

 Local Development Setup
Prerequisites

Node.js 18+
Python 3.9+
Git

Frontend Setup
bashCopycd frontend
npm install
npm start
Frontend runs at http://localhost:


API Documentation
Access Swagger docs at https://reachifybackend.azurewebsites.net/docs
Endpoints

path('admin/', admin.site.urls),
     path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

🛠️ Tech Stack

Frontend: React, React Hooks, Context API
Backend: FastAPI, JWT Auth, SQLAlchemy
Database: sq.lite3
Deployment: Microsoft Azure, GitHub Actions

The application is deployed on Microsoft Azure using GitHub Actions for CI/CD:

Frontend: Azure Static Web Apps
Backend: Azure App Service


CI/CD Pipeline

Automatic deployments triggered on pushes to main branch
Separate workflows for frontend and backend
Environment variables managed through Azure Portal
