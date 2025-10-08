import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index';
import Set from '../src/models/Set';

describe('Set API', () => {
  let userId: mongoose.Types.ObjectId;

  beforeEach(() => {
    // Mock userId in session for getSets
    userId = new mongoose.Types.ObjectId();
  });

  describe('GET /set', () => {
    it('should return all sets for the user', async () => {
      // Seed some sets
      await Set.create([
        { reps: 10, weight: 50, duration: 60, user: userId, template: new mongoose.Types.ObjectId() },
        { reps: 8, weight: 60, duration: 50, user: userId, template: new mongoose.Types.ObjectId() },
      ]);

      const res = await request(app).get("/api/set")

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0]).toHaveProperty('reps', 10);
    });
  });

  describe('POST /api/set', () => {
    it('should create a new set', async () => {
      const templateId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .post('/api/set')
        .send({
          reps: 12,
          weight: 70,
          duration: 45,
          user: userId.toHexString(),
          template: templateId.toHexString(),
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('reps', 12);

      const created = await Set.findOne({ user: userId });
      expect(created).not.toBeNull();
      expect(created?.weight).toBe(70);
    });
  });

  describe('DELETE /api/set', () => {
    it('should delete a set by id', async () => {
      const set = await Set.create({
        reps: 5,
        weight: 40,
        duration: 30,
        user: userId,
        template: new mongoose.Types.ObjectId(),
      });

      const res = await request(app)
        .delete('/api/set')
        .send({ id: set._id.toHexString() });

      expect(res.statusCode).toBe(200);
      const deleted = await Set.findById(set._id);
      expect(deleted).toBeNull();
    });

    it('should return error if id is missing', async () => {
      const res = await request(app).delete('/api/set').send({});
      expect(res.body.status).toBe('fail');
      //expect(res.body.message).toBe('No id was provided!');
    });
  });
});
