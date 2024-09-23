from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

from app import models


class Login(BaseModel):
    """login validation"""

    email: EmailStr
    password: str


class TokenData(BaseModel):
    """tokend data validation"""

    id: str


class TokenResponse(BaseModel):
    """token response validation"""

    token: str
    token_type: str


class UserCreate(BaseModel):
    """usercreate validation"""

    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """userResponse validation"""

    id: int
    name: str
    email: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class ProfileUpdate(BaseModel):
    """profile update validation"""

    bio: Optional[str]
    addresse: Optional[str]
    picture: Optional[str]
    phone: Optional[str]


class ProfileResponse(BaseModel):
    """profile response validation"""

    id: Optional[int]
    bio: Optional[str]
    addresse: Optional[str]
    picture: Optional[str]
    phone: Optional[str]

    class Config:
        orm_mode = True


class ServiceCreate(BaseModel):
    """service create validation"""

    name: str
    type: str
    image: str
    description: str
    location: str
    latitude: float
    longitude: float
    available: Optional[bool]


class ServiceUpdate(BaseModel):
    """service update validation"""

    name: Optional[str]
    type: Optional[str]
    image: Optional[str]
    description: Optional[str]
    location: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    available: Optional[bool]


class ServiceResponse(BaseModel):
    """service response validation"""

    id: int
    name: str
    type: str
    image: str
    description: str
    location: str
    latitude: float
    longitude: float
    available: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class BookingCreate(BaseModel):
    """booking create validation"""

    schedule_time: datetime
    service_id: int


class BookingUpdate(BaseModel):
    """booking update validation"""

    status: Optional[models.Status]
    schedule_time: Optional[datetime]
    rating: Optional[int]
    review: Optional[str]


class BookingResponse(BaseModel):
    """booking response validation"""

    id: int
    status: models.Status
    schedule_time: datetime
    rating: int
    review: str
    created_at: str
    user_id: int
    service_id: int

    class Config:
        orm_mode = True
