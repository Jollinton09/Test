
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth');
const contractRoutes = require('./routes/contracts');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Review Mate AI - API',
    version: '1.0.0',
    description: 'API for the Review Mate AI project (in-memory).'
  },
  servers: [
    { url: 'http://localhost:4000', description: 'Local server' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);

// Health
app.get('/health', (req, res) => res.json({ ok: true, timestamp: Date.now() }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`ReviewMate backend listening on port ${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
