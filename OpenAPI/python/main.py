from fastapi import FastAPI

app = FastAPI()

from routers.car_router import router as car_router
app.include_router(car_router)