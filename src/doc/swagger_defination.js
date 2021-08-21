const swaggerDefinition = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Getir Interview Rest API",
    description: "Getir Interview Rest API to get data from mongodb",
    contact: {
      name: "Pavan Sanas",
      email: "pavan.sanas@outlook.com",
      url: "https://www.linkedin.com/in/pavan-sanas-9a041738/",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: {
          error_message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;
