'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const helmet_1 = __importDefault(require('helmet'));
const morgan_1 = __importDefault(require('morgan'));
const routes_1 = __importDefault(require('./routes'));
const error_middleware_1 = require('./middlewares/error.middleware');
const express_api_reference_1 = require('@scalar/express-api-reference');
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const js_yaml_1 = __importDefault(require('js-yaml'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api', routes_1.default);
const openApiSpec = js_yaml_1.default.load(
  fs_1.default.readFileSync(path_1.default.join(__dirname, '../docs/openapi.yaml'), 'utf8')
);
app.use(
  '/docs',
  (0, express_api_reference_1.apiReference)({
    spec: {
      content: openApiSpec,
    },
  })
);
app.use(error_middleware_1.errorMiddleware);
app.get('/', (req, res) => {
  res.json({ message: 'Frida API is running' });
});
exports.default = app;
