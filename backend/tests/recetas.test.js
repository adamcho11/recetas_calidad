const request = require("supertest");
const app = require("../src/app");

describe("API Recetas", () => {
  test("GET /api/recetas - retorna lista de recetas", async () => {
    const res = await request(app).get("/api/recetas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/recetas/:id - retorna Empanadas tucumanas", async () => {
    const res = await request(app).get("/api/recetas/4");
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe("Empanadas tucumanas");
    expect(res.body.ingredientes).toEqual(
      expect.arrayContaining(["masa", "carne", "cebolla", "huevo", "comino", "pimentón"])
    );
    expect(res.body.categoria).toBe("almuerzo");
  });

  test("GET /api/recetas/:id - retorna receta existente", async () => {
    const res = await request(app).get("/api/recetas/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nombre");
    expect(res.body).toHaveProperty("ingredientes");
  });

  test("GET /api/recetas/:id - retorna 404 si no existe", async () => {
    const res = await request(app).get("/api/recetas/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  test("GET /api/recetas/categoria/:cat - filtra por categoría", async () => {
    const res = await request(app).get("/api/recetas/categoria/almuerzo");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((r) => expect(r.categoria).toBe("almuerzo"));
  });
});
