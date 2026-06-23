"""Backend API tests for Born In Flight (v2-2026-01 content refresh)."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_TOKEN = "flight-admin-2026"


@pytest.fixture(scope="session")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


@pytest.fixture(scope="session")
def admin():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json", "X-Admin-Token": ADMIN_TOKEN})
    return sess


# ---------- Health ----------
def test_health(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("service") == "Born In Flight"
    assert data.get("status") == "ok"


# ---------- Programs: new simplified shape, 27 seeded ----------
def test_list_programs_default_27(s):
    r = s.get(f"{API}/programs")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 27, f"Expected 27 seeded programs, got {len(data)}"
    p = data[0]
    # New simplified shape only
    assert set(p.keys()) == {"id", "pillar", "name", "description"}, f"Unexpected keys: {p.keys()}"
    for k in ("id", "pillar", "name", "description"):
        assert isinstance(p[k], str) and p[k]


@pytest.mark.parametrize("pillar", ["self", "team", "organization"])
def test_list_programs_filter_9_each(s, pillar):
    r = s.get(f"{API}/programs", params={"pillar": pillar})
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 9, f"Expected 9 programs for pillar={pillar}, got {len(data)}"
    assert all(p["pillar"] == pillar for p in data)


def test_programs_self_contains_required(s):
    data = s.get(f"{API}/programs", params={"pillar": "self"}).json()
    names = [p["name"] for p in data]
    for required in ("Athlete Leader", "NLP Practitioner", "NLP Master Practitioner"):
        assert required in names, f"Missing self program: {required}"


def test_programs_team_contains_required(s):
    data = s.get(f"{API}/programs", params={"pillar": "team"}).json()
    names = [p["name"] for p in data]
    for required in ("Leadership in the Age of AI", "Impact 360: Mastering Influence in Matrix World"):
        assert required in names, f"Missing team program: {required}"


def test_programs_org_contains_required(s):
    data = s.get(f"{API}/programs", params={"pillar": "organization"}).json()
    names = [p["name"] for p in data]
    for required in ("Manager Effectiveness Academy", "Assessment Development Centers"):
        assert required in names, f"Missing organization program: {required}"


# ---------- Testimonials: 12 expected ----------
def test_list_testimonials_12(s):
    r = s.get(f"{API}/testimonials")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 12, f"Expected 12 testimonials, got {len(data)}"
    for t in data:
        assert "id" in t and "quote" in t and "author" in t and "role" in t


def test_testimonials_authors_present(s):
    data = s.get(f"{API}/testimonials").json()
    authors = [t["author"] for t in data]
    expected = ["Sujay", "Abhishek Kedia", "Vinay", "Arun Shetty", "Yogesh",
                "Chandrabhanu", "Tiziana Barca", "Rakesh KS", "Satish K",
                "Hemant Vijay", "Sneha Masurkar", "Rupesh Nagda"]
    for a in expected:
        assert a in authors, f"Missing testimonial author: {a}"


# ---------- Leads ----------
def test_create_lead_valid_returns_201(s):
    payload = {"name": "TEST_User", "email": "test_user_v2@example.com",
               "message": "Hello from pytest v2"}
    r = s.post(f"{API}/leads", json=payload)
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["name"] == "TEST_User"
    assert data["email"] == "test_user_v2@example.com"
    assert "id" in data and "created_at" in data


def test_create_lead_invalid_email(s):
    r = s.post(f"{API}/leads", json={"name": "Bad", "email": "not-an-email", "message": "hi"})
    assert r.status_code == 422


def test_create_lead_missing_message(s):
    r = s.post(f"{API}/leads", json={"name": "Bad", "email": "ok@example.com"})
    assert r.status_code == 422


# ---------- Admin auth ----------
def test_list_leads_requires_admin(s):
    r = s.get(f"{API}/leads")
    assert r.status_code == 401


def test_list_leads_with_admin_token(admin, s):
    s.post(f"{API}/leads", json={"name": "TEST_LeadListV2",
                                 "email": "leadlist_v2@test.com", "message": "list test v2"})
    r = admin.get(f"{API}/leads")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert any(l["email"] == "leadlist_v2@test.com" for l in data)


def test_admin_login_valid(s):
    r = s.post(f"{API}/admin/login", json={"token": ADMIN_TOKEN})
    assert r.status_code == 200
    assert r.json().get("ok") is True


def test_admin_login_invalid(s):
    r = s.post(f"{API}/admin/login", json={"token": "wrong"})
    assert r.status_code == 401


# ---------- Programs CRUD with new shape ----------
def test_program_put_requires_admin(s):
    payload = {"id": "x", "pillar": "self", "name": "x", "description": "x"}
    r = s.put(f"{API}/programs/x", json=payload)
    assert r.status_code == 401


def test_program_upsert_and_delete_new_shape(admin):
    pid = f"TEST_prog_{uuid.uuid4().hex[:6]}"
    payload = {"id": pid, "pillar": "self", "name": "TEST Program v2",
               "description": "Simplified description only."}
    r = admin.put(f"{API}/programs/{pid}", json=payload)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["id"] == pid
    assert body["name"] == "TEST Program v2"
    assert body["description"] == "Simplified description only."
    assert body["pillar"] == "self"
    # Verify via GET list (data persisted)
    listing = admin.get(f"{API}/programs").json()
    persisted = next((p for p in listing if p["id"] == pid), None)
    assert persisted is not None
    assert persisted["description"] == "Simplified description only."
    # Delete
    rd = admin.delete(f"{API}/programs/{pid}")
    assert rd.status_code == 200
    listing2 = admin.get(f"{API}/programs").json()
    assert not any(p["id"] == pid for p in listing2)


# ---------- Testimonials CRUD ----------
def test_testimonial_put_requires_admin(s):
    payload = {"id": "x", "quote": "x", "author": "x", "role": "x"}
    r = s.put(f"{API}/testimonials/x", json=payload)
    assert r.status_code == 401


def test_testimonial_upsert_and_delete(admin):
    tid = f"TEST_t_{uuid.uuid4().hex[:6]}"
    payload = {"id": tid, "quote": "Great", "author": "Tester", "role": "QA"}
    r = admin.put(f"{API}/testimonials/{tid}", json=payload)
    assert r.status_code == 200
    listing = admin.get(f"{API}/testimonials").json()
    assert any(t["id"] == tid for t in listing)
    rd = admin.delete(f"{API}/testimonials/{tid}")
    assert rd.status_code == 200
