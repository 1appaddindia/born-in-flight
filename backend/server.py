from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'flight-admin-2026')
SEED_VERSION = "v2-2026-01"

app = FastAPI(title="Born In Flight API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    interest: Optional[str] = None
    message: str = Field(min_length=1, max_length=2000)


class Lead(BaseModel):
    id: str
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    interest: Optional[str] = None
    message: str
    created_at: str


class Program(BaseModel):
    id: str
    pillar: str  # "self" | "team" | "organization"
    name: str
    description: str


class Testimonial(BaseModel):
    id: str
    quote: str
    author: str
    role: str


class AdminLogin(BaseModel):
    token: str


def require_admin(x_admin_token: Optional[str] = Header(default=None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True


# ---------- Health ----------
@api_router.get("")
@api_router.get("/")
async def root():
    return {"service": "Born In Flight", "status": "ok"}


# ---------- Leads ----------
@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email,
        "company": (payload.company or "").strip() or None,
        "phone": (payload.phone or "").strip() or None,
        "interest": (payload.interest or "").strip() or None,
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    return Lead(**doc)


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(_: bool = Depends(require_admin)):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Lead(**d) for d in docs]


@api_router.post("/admin/login")
async def admin_login(payload: AdminLogin):
    if payload.token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"ok": True}


# ---------- Seed data ----------
DEFAULT_PROGRAMS: List[dict] = [
    # Develop Self
    {"id": "athlete-leader", "pillar": "self", "name": "Athlete Leader",
     "description": "Great leaders don't simply perform under pressure — they thrive in it. Athlete Leader develops the mindset, resilience, discipline, and mental agility required to sustain high performance, navigate uncertainty, and lead with purpose in today's demanding world."},
    {"id": "executive-presence", "pillar": "self", "name": "Executive Presence",
     "description": "Influence begins long before you speak. This program helps leaders cultivate executive presence through authentic communication, confidence, emotional composure, and strategic visibility — enabling them to inspire trust, command attention, and lead with credibility."},
    {"id": "story-telling", "pillar": "self", "name": "Story Telling",
     "description": "Facts inform. Stories inspire action. Learn to transform complex ideas into compelling narratives that influence decisions, build alignment, and create memorable experiences across teams, customers, and stakeholders."},
    {"id": "leaders-as-coaches", "pillar": "self", "name": "Leaders as Coaches",
     "description": "The future belongs to leaders who coach, not command. This program equips managers with practical coaching skills to unlock potential, accelerate performance, foster accountability, and build high-performing teams through meaningful conversations."},
    {"id": "emotional-intelligence", "pillar": "self", "name": "Emotional Intelligence",
     "description": "Leadership starts with self-awareness. Develop the emotional intelligence to manage yourself, understand others, build stronger relationships, navigate conflict, and create psychologically safe environments where individuals and teams can flourish."},
    {"id": "influence-without-authority", "pillar": "self", "name": "Influence without Authority",
     "description": "In today's matrixed organizations, influence matters more than hierarchy. Learn how to build trust, align diverse stakeholders, communicate with impact, and drive outcomes without relying on positional power."},
    {"id": "peak-performance-blueprint", "pillar": "self", "name": "Peak Performance Blueprint",
     "description": "Sustainable success is built by design, not chance. Combining neuroscience, behavioral science, coaching, and high-performance principles, this program helps individuals create the habits, mindset, and systems needed to consistently perform at their best."},
    {"id": "nlp-practitioner", "pillar": "self", "name": "NLP Practitioner",
     "description": "Discover how Neuro-Linguistic Programming can transform the way you think, communicate, and influence. Gain practical tools to enhance personal & professional effectiveness, build deeper connections, overcome limiting beliefs, and create lasting behavioral change."},
    {"id": "nlp-master-practitioner", "pillar": "self", "name": "NLP Master Practitioner",
     "description": "Designed for experienced practitioners, this advanced program deepens your mastery of NLP through sophisticated models, transformational coaching techniques, advanced communication strategies, and identity-level change — enabling profound personal and professional transformation."},

    # Develop Team
    {"id": "leadership-age-of-ai", "pillar": "team", "name": "Leadership in the Age of AI",
     "description": "As artificial intelligence reshapes the workplace, leadership must evolve beyond technical expertise. This program equips leaders to harness AI responsibly while strengthening the uniquely human capabilities of judgment, creativity, empathy, adaptability, and strategic decision-making."},
    {"id": "impact-360", "pillar": "team", "name": "Impact 360: Mastering Influence in Matrix World",
     "description": "Influence is the currency of modern organizations. Designed for leaders navigating complex, matrixed environments, this program develops the skills to build alignment, influence stakeholders, manage conflict, and drive outcomes across functions — without relying on authority."},
    {"id": "team-excellence-accelerator", "pillar": "team", "name": "Team Excellence Accelerator",
     "description": "High-performing teams don't happen by chance — they are intentionally built. This immersive program strengthens collaboration, accountability, communication, and execution, enabling teams to consistently deliver exceptional business results."},
    {"id": "building-coaching-culture", "pillar": "team", "name": "Building Coaching Culture",
     "description": "Organizations thrive when coaching becomes a way of leading. This program empowers leaders to embed coaching conversations into everyday work, creating a culture of continuous learning, ownership, innovation, and high performance."},
    {"id": "high-trust-teams", "pillar": "team", "name": "High Trust Teams",
     "description": "Trust is the foundation of every successful team. Through practical frameworks and experiential learning, teams learn to build psychological safety, strengthen relationships, navigate healthy conflict, and foster a culture of openness, accountability, and collaboration."},
    {"id": "stakeholder-excellence", "pillar": "team", "name": "Stakeholder Excellence",
     "description": "Success depends on the quality of relationships inside and outside the organization. This program helps leaders build credibility, influence diverse stakeholders, manage expectations, and create lasting partnerships that accelerate business outcomes."},
    {"id": "collaborative-leadership", "pillar": "team", "name": "Collaborative Leadership",
     "description": "Today's challenges demand collective intelligence, not individual brilliance. This program develops leaders who foster cross-functional collaboration, break down silos, leverage diverse perspectives, and create alignment around shared goals."},
    {"id": "systemic-team-coaching", "pillar": "team", "name": "Systemic Team Coaching",
     "description": "Move beyond improving individuals to transforming the entire team system. Using a systemic coaching approach, this program enables leadership teams to strengthen collective effectiveness, enhance relationships, improve decision-making, and deliver sustainable organizational impact."},
    {"id": "outbound-leadership", "pillar": "team", "name": "Outbound Leadership",
     "description": "Transformation happens when learning moves beyond the classroom. Through thoughtfully designed experiential outdoor challenges, leaders develop resilience, trust, collaboration, strategic thinking, and adaptability while strengthening team cohesion in real-world environments."},

    # Develop Organization
    {"id": "leadership-transformation-journey", "pillar": "organization", "name": "Leadership Transformation Journey",
     "description": "Leadership transformation is a journey, not an event. This integrated development experience builds future-ready leaders by combining learning, coaching, real-world application, and reflection to create lasting behavioral change and measurable business impact."},
    {"id": "sales-excellence", "pillar": "organization", "name": "Sales Excellence",
     "description": "Exceptional sales performance is driven by capability, customer insight, and execution. This program equips sales professionals and leaders to strengthen consultative selling, customer engagement, strategic account management, and sustainable revenue growth."},
    {"id": "decision-intelligence", "pillar": "organization", "name": "Decision Intelligence",
     "description": "In a world of increasing complexity, better decisions create competitive advantage. This program enables leaders to combine critical thinking, behavioral science, systems thinking, and data-informed judgment to make faster, smarter, and more confident decisions."},
    {"id": "strategic-change-mgmt", "pillar": "organization", "name": "Strategic and Change Management",
     "description": "Transformation succeeds when strategy and people move together. This program helps leaders navigate change with clarity, build organizational alignment, manage resistance, and lead transformation initiatives that deliver sustainable business outcomes."},
    {"id": "future-ready-leaders", "pillar": "organization", "name": "Future Ready Leaders",
     "description": "Tomorrow's leaders require more than today's capabilities. Designed for emerging and experienced leaders alike, this program develops the mindsets, skills, and agility needed to lead through disruption, innovation, digital transformation, and continuous change."},
    {"id": "culture-values-you", "pillar": "organization", "name": "Culture, Values and You",
     "description": "Culture is shaped by everyday behaviors. This program helps organizations translate their values into meaningful actions, creating stronger alignment, greater accountability, and an engaged workforce that brings the organization's purpose to life."},
    {"id": "assessment-development-centers", "pillar": "organization", "name": "Assessment Development Centers",
     "description": "Identify potential. Accelerate growth. Our evidence-based Assessment and Development Centers provide deep insights into leadership capability, readiness, and future potential, enabling informed talent decisions and personalized development journeys."},
    {"id": "organizational-development", "pillar": "organization", "name": "Organizational Development",
     "description": "Sustainable performance requires strong organizational capability. We partner with organizations to strengthen leadership, culture, structure, processes, and people practices — building agile, resilient organizations equipped for long-term success."},
    {"id": "manager-effectiveness-academy", "pillar": "organization", "name": "Manager Effectiveness Academy",
     "description": "Managers have the greatest influence on organizational performance. This comprehensive academy develops the essential capabilities every manager needs — from leading people and driving performance to coaching, communication, decision-making, and execution — creating confident leaders who deliver results through their teams."},
]

DEFAULT_TESTIMONIALS: List[dict] = [
    {"id": "t1", "quote": "NLP has helped me to be an effective communicator in a group environment and overcoming the fear of addressing the senior management — a great learning experience.", "author": "Sujay", "role": "Advanced Specialist, Goldman Sachs, Bangalore"},
    {"id": "t2", "quote": "The experience was really good. Playing with numbers is something we do every day, but this was an innovative way. We definitely learned team building, interaction, and team communication. A great experience — thank you Born In Flight.", "author": "Abhishek Kedia", "role": "Deputy Manager, Deloitte, Bangalore"},
    {"id": "t3", "quote": "The program was awesome and fun-based. The main thing I liked was — it was not a gyan session. Everything was communicated through games. Short, crisp, and impactful.", "author": "Vinay", "role": "Talent Team, Deloitte, Bangalore"},
    {"id": "t4", "quote": "Born In Flight rose up to every occasion and tailor-made the programs for us across four years and multiple needs. In one word — custom-made for your need.", "author": "Arun Shetty", "role": "Sales Head, Carl Zeiss"},
    {"id": "t5", "quote": "The program was wonderful — a lot of insights on team, activity and engaging customers. Not just training, more of fun learning. In one word: engaging.", "author": "Yogesh", "role": "Carl Zeiss"},
    {"id": "t6", "quote": "Born In Flight did a fantastic job arranging this workshop professionally. The best part was meeting people from different walks of life — it enriched the whole experience for me.", "author": "Chandrabhanu", "role": "VP Digital Operations, Fork Technologies, Bangalore"},
    {"id": "t7", "quote": "I definitely enjoyed the Train-the-Trainer program — it has been amazing! The content, the extraordinary way to be effective, so cheerful and able to create such a spontaneous engaging learning experience.", "author": "Tiziana Barca", "role": "Candidates & Service Management Director, Adecco Group AG"},
    {"id": "t8", "quote": "It's been a great transforming experience! Thanks to the great mentor Prakash Rao. Blessed to be guided by the excellent trainer & life coach.", "author": "Rakesh KS", "role": "Entrepreneur, Water Treatment, Bangalore"},
    {"id": "t9", "quote": "After attending the program I created a list of alternative physical fitness activities for various time durations. Successfully initiated a set of activities for tracking progress in business.", "author": "Satish K", "role": "Director, Protech Microsystems Pvt. Ltd, Bangalore"},
    {"id": "t10", "quote": "Though I had a fair idea of what changes I needed to make in myself, I didn't know the how-to part of it. And thankfully NLP provided the 'how' part of change.", "author": "Hemant Vijay", "role": "Embedded Software Developer, Bangalore"},
    {"id": "t11", "quote": "Attending this two-day NLP workshop has worked wonders for me. It has brought the best out of my inner self and keeps me motivated to face any challenge gracefully.", "author": "Sneha Masurkar", "role": "HR Manager, Zicom, Mumbai"},
    {"id": "t12", "quote": "The program introduced the basic concepts of NLP. Now I am more focused on things that matter. It also enhanced my concentration level.", "author": "Rupesh Nagda", "role": "CEO, Parivartan Learning Solutions, Mumbai"},
]


async def seed_if_needed():
    meta = await db.meta.find_one({"key": "seed_version"})
    if meta and meta.get("value") == SEED_VERSION:
        return
    await db.programs.delete_many({})
    await db.testimonials.delete_many({})
    if DEFAULT_PROGRAMS:
        await db.programs.insert_many([{**p} for p in DEFAULT_PROGRAMS])
    if DEFAULT_TESTIMONIALS:
        await db.testimonials.insert_many([{**t} for t in DEFAULT_TESTIMONIALS])
    await db.meta.update_one({"key": "seed_version"}, {"$set": {"value": SEED_VERSION}}, upsert=True)


@api_router.get("/programs", response_model=List[Program])
async def list_programs(pillar: Optional[str] = None):
    q = {"pillar": pillar} if pillar else {}
    docs = await db.programs.find(q, {"_id": 0}).to_list(500)
    return [Program(**d) for d in docs]


@api_router.put("/programs/{program_id}", response_model=Program)
async def update_program(program_id: str, payload: Program, _: bool = Depends(require_admin)):
    payload.id = program_id
    await db.programs.update_one({"id": program_id}, {"$set": payload.model_dump()}, upsert=True)
    return payload


@api_router.delete("/programs/{program_id}")
async def delete_program(program_id: str, _: bool = Depends(require_admin)):
    await db.programs.delete_one({"id": program_id})
    return {"ok": True}


@api_router.get("/testimonials", response_model=List[Testimonial])
async def list_testimonials():
    docs = await db.testimonials.find({}, {"_id": 0}).to_list(200)
    return [Testimonial(**d) for d in docs]


@api_router.put("/testimonials/{tid}", response_model=Testimonial)
async def upsert_testimonial(tid: str, payload: Testimonial, _: bool = Depends(require_admin)):
    payload.id = tid
    await db.testimonials.update_one({"id": tid}, {"$set": payload.model_dump()}, upsert=True)
    return payload


@api_router.delete("/testimonials/{tid}")
async def delete_testimonial(tid: str, _: bool = Depends(require_admin)):
    await db.testimonials.delete_one({"id": tid})
    return {"ok": True}


app.include_router(api_router)

default_origins = [
    "https://borninflight.com",
    "https://www.borninflight.com",
    "https://born-in-flight-7lbj.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
env_origins = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", "").split(",")
    if origin.strip()
]
allowed_origins = sorted(set(default_origins + env_origins))

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def on_startup():
    await seed_if_needed()
    logger.info("Born In Flight API ready · seed=%s", SEED_VERSION)


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
