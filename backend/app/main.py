from fastapi import FastAPI
from app.routers.health import router as health_router

app = FastAPI(
    title="NitPick API"
)

app.include_router(health_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the nitPick application!"}