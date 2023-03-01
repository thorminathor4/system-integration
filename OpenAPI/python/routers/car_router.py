from fastapi import APIRouter, Query
from pydantic import BaseModel

router = APIRouter()

cars = [
    {"id": 1, "brand": "Toyota", "model": "Yaris"},
    {"id": 2, "brand": "Peugeot", "model": "206"},
    {"id": 3, "brand": "Peugeot", "model": "207"},
    {"id": 4, "brand": "Ford", "model": "Transit"},
    {"id": 5, "brand": "Reneualt", "model": "Clio"}
]

class Car(BaseModel):
    id: int
    brand: str
    model: str

@router.get("/api/cars")
def get_cars():
    return cars

@router.get("/api/cars/{id}")
def get_cars(id: int):
    for car in cars:
        if car["id"] == id:
            return car
        
@router.post("/api/cars")
def create_car(car: Car):
    cars.append(car)
    return car