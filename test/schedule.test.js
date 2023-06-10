import request from 'supertest';
import app from '../src/server';

describe('test GET /schedule route', () => {
  test('should return total 17 records', async () => {
    const res = await request(app).get('/schedule');
    expect(res.body.length).toBe(17);
  });
});

describe('test GET /schedule/:line route (test case sensitive)', () => {
  test('should return all 5 Lakeshore records', async () => {
    const res = await request(app).get('/schedule/lakeShore');
    expect(res.body.length).toBe(5);
    expect(res.body[0]).toHaveProperty('id', 1);
    expect(res.body[0]).toHaveProperty('line', 'Lakeshore');
    expect(res.body[0]).toHaveProperty('departure', 800);
    expect(res.body[0]).toHaveProperty('arrival', 900);

    expect(res.body[1]).toHaveProperty('id', 2);
    expect(res.body[1]).toHaveProperty('line', 'Lakeshore');
    expect(res.body[1]).toHaveProperty('departure', 1000);
    expect(res.body[1]).toHaveProperty('arrival', 1100);

    expect(res.body[2]).toHaveProperty('id', 3);
    expect(res.body[2]).toHaveProperty('line', 'Lakeshore');
    expect(res.body[2]).toHaveProperty('departure', 1200);
    expect(res.body[2]).toHaveProperty('arrival', 1300);

    expect(res.body[3]).toHaveProperty('id', 4);
    expect(res.body[3]).toHaveProperty('line', 'Lakeshore');
    expect(res.body[3]).toHaveProperty('departure', 1400);
    expect(res.body[3]).toHaveProperty('arrival', 1500);

    expect(res.body[4]).toHaveProperty('id', 5);
    expect(res.body[4]).toHaveProperty('line', 'Lakeshore');
    expect(res.body[4]).toHaveProperty('departure', 1600);
    expect(res.body[4]).toHaveProperty('arrival', 1700);
  });

  test('should return HTTP 404 for not found line Hamilton', async () => {
    const res = await request(app).get('/schedule/hamilton');
    expect(res.status).toBe(404);
  });
});

describe('test GET /schedule/:line?departure={time} route (test case sensitive)', () => {
  test('should return single record for Barrie line and valid time at 0730', async () => {
    const res = await request(app).get('/schedule/BARRIE?departure=0730');
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('id', 6);
    expect(res.body[0]).toHaveProperty('line', 'Barrie');
    expect(res.body[0]).toHaveProperty('departure', 730);
    expect(res.body[0]).toHaveProperty('arrival', 930);
  });

  test('should return single record for Barrie line and valid time at 7:30AM', async () => {
    const res = await request(app).get('/schedule/BARRIE?departure=7:30AM');
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('id', 6);
    expect(res.body[0]).toHaveProperty('line', 'Barrie');
    expect(res.body[0]).toHaveProperty('departure', 730);
    expect(res.body[0]).toHaveProperty('arrival', 930);
  });

  test('should return empty record for Barrie line and valid time at 06:30am', async () => {
    const res = await request(app).get('/schedule/BARRIE?departure=06:30am');
    expect(res.body.length).toBe(0);
    expect(res.status).toBe(200);
  });

  test('should return HTTP 404 for not found line Hamilton and valid time', async () => {
    const res = await request(app).get('/schedule/hamilton?departure=730');
    expect(res.status).toBe(404);
  });

  test('should return HTTP 400 for invalid time format at 06:30', async () => {
    const res = await request(app).get('/schedule/BARRIE?departure=06:30');
    expect(res.status).toBe(400);
  });

  test('should return HTTP 400 for invalid time format at at 6pm', async () => {
    const res = await request(app).get('/schedule/BARRIE?departure=6pm');
    expect(res.status).toBe(400);
  });

  test('should return HTTP 400 for invalid time format at 2430', async () => {
    const res = await request(app).get('/schedule/BARRIE?departure=2430');
    expect(res.status).toBe(400);
  });
});
