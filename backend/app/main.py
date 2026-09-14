from fastapi import FastAPI

app = FastAPI(
    title="NitPick API"
)

@app.get("/health")
async def health():
    return {"status": "ok"}