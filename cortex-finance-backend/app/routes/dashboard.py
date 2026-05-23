from fastapi import APIRouter
from app.services.analytics import generate_dashboard_data

router = APIRouter()


@router.get("/dashboard")
def dashboard():

    data = generate_dashboard_data()

    return data