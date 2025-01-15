var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          Sensores:{
            type: 'object',
            properties: {
              numid: {
                type: 'string',
                example: 'urn:ngsi-ld:TemperatureSensor:001',
                description: 'Identificador único del sensor de temperatura'
              },
              name: {
                type: 'string',
                example: 'TemperatureSensor',
                description: 'El nombre del sensor de temperatura'
              },
              collectionName: {
                type: 'string',
                example: 'sth_urn_ngsi-ld_TemperatureSensor_001',
                description: 'Colección a la que pertenece el sensor de temperatura.'
              },
              allowed_params: {
                type: 'array',
                items: {
                  type: 'string'
                },
                example: [],
                description: 'Parámetros permitidos en su query.'
              },
              uso: {
                type: 'string',
                example: 'Medir la temperatura en la ciudad LEGO, con datos tomados de la API de Madrid.',
                description: 'Para qué se va a utilizar el sensor de temperatura.'
              },
              exampleQueryDateRange: {
                type: 'string',
                example: '/sensores/1?desde=2024-05-06T22:53:14.205Z&hasta=2024-05-07T01:12:15.758Z',
                description: 'Ejemplo de consulta de rango de fechas para el sensor de temperatura'
              },
              visible: {
                type: 'string',
                example: 'true',
                description: 'La visibilidad del sensor de temperatura'
              }
            }
          },
          Temperatura: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Identificador único del objeto'
              },
              type: {
                type: 'string',
                description: 'Tipo del objeto'
              },
              subscriptionId: {
                type: 'string',
                description: 'Identificador de la suscripción'
              },
              notifiedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora de la notificación'
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    Object: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'Identificador único del sensor o dispositivo'
                        },
                        type: {
                          type: 'string',
                          description: 'Tipo del sensor o dispositivo'
                        },
                        category: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Property',
                              description: 'Tipo de la propiedad category'
                            },
                            value: {
                              type: 'string',
                              description: 'Valor de la categoría'
                            }
                          }
                        },
                        controlledAsset: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Relationship',
                              description: 'Tipo de la relación controlledAsset'
                            },
                            object: {
                              type: 'string',
                              description: 'Objeto de la relación'
                            }
                          }
                        },
                        temperature: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Property',
                              description: 'Tipo de la propiedad temperature'
                            },
                            value: {
                              type: 'number',
                              description: 'Valor numérico de la temperatura'
                            },
                            unitCode: {
                              type: 'string',
                              description: 'Código de la unidad de medida de la temperatura'
                            }
                          }
                        }
                      }
                    }
                  },
                  description: 'Datos del objeto'
                }
              }
            }
          },
          Humedad: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Identificador único del objeto'
              },
              type: {
                type: 'string',
                description: 'Tipo del objeto'
              },
              subscriptionId: {
                type: 'string',
                description: 'Identificador de la suscripción'
              },
              notifiedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora de la notificación'
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    Object: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'Identificador único del sensor o dispositivo'
                        },
                        type: {
                          type: 'string',
                          description: 'Tipo del sensor o dispositivo'
                        },
                        category: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Property',
                              description: 'Tipo de la propiedad category'
                            },
                            value: {
                              type: 'string',
                              description: 'Valor de la categoría'
                            }
                          }
                        },
                        controlledAsset: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Relationship',
                              description: 'Tipo de la relación controlledAsset'
                            },
                            object: {
                              type: 'string',
                              description: 'Objeto de la relación'
                            }
                          }
                        },
                        humidity: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Property',
                              description: 'Tipo de la propiedad temperature'
                            },
                            humidity: {
                              type: 'number',
                              description: 'Valor numérico de la temperatura'
                            },
                            unitCode: {
                              type: 'string',
                              description: 'Código de la unidad de medida de la temperatura'
                            }
                          }
                        }
                      }
                    }
                  },
                  description: 'Datos del objeto'
                }
              }
            }
          },
          Ultrasonido: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Identificador único del evento de ultrasonido'
              },
              type: {
                type: 'string',
                description: 'Tipo de entidad, en este caso, Ultrasonido'
              },
              subscriptionId: {
                type: 'string',
                description: 'Identificador de la suscripción que generó esta notificación'
              },
              notifiedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora de la notificación'
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'Identificador único del objeto relacionado con el evento de ultrasonido'
                    },
                    type: {
                      type: 'string',
                      description: 'Tipo de objeto relacionado con el evento de ultrasonido'
                    },
                    category: {
                      type: 'object',
                      properties: {
                        type: {
                          type: 'string',
                          default: 'Property',
                          description: 'Indica que la categoría es una propiedad'
                        },
                        value: {
                          type: 'string',
                          description: 'Valor de la categoría del objeto'
                        }
                      }
                    },
                    controlledAsset: {
                      type: 'object',
                      properties: {
                        type: {
                          type: 'string',
                          default: 'Relationship',
                          description: 'Indica que el activo controlado es una relación'
                        },
                        object: {
                          type: 'string',
                          description: 'Objeto relacionado con el activo controlado'
                        }
                      }
                    },
                    distance: {
                      type: 'object',
                      properties: {
                        type: {
                          type: 'string',
                          default: 'Property',
                          description: 'Indica que la distancia es una propiedad'
                        },
                        value: {
                          type: 'number',
                          description: 'Valor numérico de la distancia medida'
                        },
                        unitCode: {
                          type: 'string',
                          description: 'Código de la unidad de medida de la distancia'
                        }
                      }
                    }
                  }
                },
                description: 'Datos del evento de ultrasonido'
              }
            }
          },
          Infrarrojos: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Identificador único del objeto'
              },
              type: {
                type: 'string',
                description: 'Tipo del objeto'
              },
              subscriptionId: {
                type: 'string',
                description: 'Identificador de la suscripción'
              },
              notifiedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora de la notificación'
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    Object: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          description: 'Identificador único del sensor o dispositivo'
                        },
                        type: {
                          type: 'string',
                          description: 'Tipo del sensor o dispositivo'
                        },
                        category: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Property',
                              description: 'Tipo de la propiedad category'
                            },
                            value: {
                              type: 'string',
                              description: 'Valor de la categoría'
                            }
                          }
                        },
                        controlledAsset: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Relationship',
                              description: 'Tipo de la relación controlledAsset'
                            },
                            object: {
                              type: 'string',
                              description: 'Objeto de la relación'
                            }
                          }
                        },
                        presence: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              default: 'Property',
                              description: 'Tipo de la propiedad presence'
                            },
                            value: {
                              type: 'string',
                              description: 'Valor de la presencia'
                            }
                          }
                        }
                      }
                    }
                  },
                  description: 'Datos del objeto'
                }
              }
            }
          },
        },
      },
    },
    // apis: ['./rutes/*.js'],
    // apis: ['./routes/context_apis/*.js'],
    apis: ['./express-server/routes/context_apis/*.js'],
  };
  // apis: ['./routes/*.js'],
  
  const specs = swaggerJsdoc(options);

  module.exports = {
    swaggerUi,
    specs
  };