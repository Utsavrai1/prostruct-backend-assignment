import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";

const swaggerDocument = yaml.load(path.join(__dirname, "swagger.yaml"));

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
