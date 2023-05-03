import __dirname from "../../utils.js";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Coder Ecommerce",
      descprition: "Backend coder ecommerce project.",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
export default specs;
