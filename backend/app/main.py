from fastapi import FastAPI
from app.routers.health import router as health_router
from app.config import settings

app = FastAPI(
    title="NitPick API"
)

app.include_router(health_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the nitPick application!",
            "environment": settings.ENVIRONMENT
            }