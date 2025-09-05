const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authMiddleware } = require('../middleware/auth');
const { simulateContractReview } = require('../services/aiReviewSimulator');

const router = express.Router();

const contracts = [];

router.post('/', authMiddleware, (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) return res.status(400).json({ error: 'title and text required' });
  const contract = { id: uuidv4(), ownerId: req.user.id, title, text, uploadedAt: new Date().toISOString() };
  contracts.push(contract);
  res.status(201).json(contract);
});

router.get('/', authMiddleware, (req, res) => {
  const mine = contracts.filter(c => c.ownerId === req.user.id);
  res.json(mine);
});

router.get('/:id', authMiddleware, (req, res) => {
  const c = contracts.find(x => x.id === req.params.id && x.ownerId === req.user.id);
  if (!c) return res.status(404).json({ error: 'Contract not found' });
  res.json(c);
});

router.delete('/:id', authMiddleware, (req, res) => {
  const idx = contracts.findIndex(x => x.id === req.params.id && x.ownerId === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Contract not found' });
  const removed = contracts.splice(idx, 1)[0];
  res.json({ ok: true, removed });
});

router.post('/:id/review', authMiddleware, (req, res) => {
  const c = contracts.find(x => x.id === req.params.id && x.ownerId === req.user.id);
  if (!c) return res.status(404).json({ error: 'Contract not found' });
  const result = simulateContractReview(c);
  res.json(result);
});

module.exports = router;
