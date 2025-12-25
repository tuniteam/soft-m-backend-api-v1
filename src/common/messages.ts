// Centralized API messages - English only

export const ApiMessages = {
  errors: {
    // Clients
    CLIENT_NOT_FOUND: (id: string) => `Client ${id} not found`,
    CLIENT_SIRET_EXISTS: "A client with this SIRET already exists",
    CLIENT_SIRET_NOT_IN_INSEE: (siret: string) =>
      `SIRET ${siret} not found in INSEE directory`,
    CLIENT_NEEDS_MANAGER: "A manager must be created before activation",
    CLIENT_NEEDS_SERVICE:
      "At least one service must be configured before activation",

    // Users
    USER_NOT_FOUND: (id: string) => `User ${id} not found`,
    USER_EMAIL_EXISTS: (email: string) => `Email ${email} already in use`,

    // Roles
    ROLE_NOT_FOUND: (code: string) => `Role ${code} not found`,

    // Schools
    SCHOOL_NOT_FOUND: (id: string) => `School ${id} not found`,
    SCHOOL_NAME_EXISTS:
      "A school with this name already exists for this client",

    // Classes
    CLASS_NOT_FOUND: (id: string) => `Class ${id} not found`,
    CLASS_NAME_EXISTS: "A class with this name already exists for this school",

    // Services
    SERVICE_NOT_FOUND: (id: string) => `Service ${id} not found`,

    // Validation
    INVALID_SIRET: "Invalid SIRET (14 digits required)",
    INVALID_SIREN: "Invalid SIREN (9 digits required)",
    INVALID_POSTAL_CODE: "Invalid postal code (5 digits required)",
    INVALID_PHONE: "Invalid phone number",
  },

  swagger: {
    clients: {
      tag: "Clients",
      list: {
        summary: "List all clients",
        description: "Returns a paginated list of clients with filters",
      },
      lookup: {
        summary: "Lookup SIRET",
        description: "Checks SIRET in SOFT-M and retrieves INSEE data",
      },
      create: {
        summary: "Create client",
        description: "Creates a new local authority client",
      },
      findOne: {
        summary: "Get client by ID",
        description: "Returns client details",
      },
      updateStatus: {
        summary: "Update client status",
        description: "Updates the status of a client",
      },
    },
    services: {
      tag: "Services",
      listTypes: {
        summary: "List service types",
        description: "Returns all service types",
      },
      getClientServices: {
        summary: "Get client services",
        description: "Returns services for a client",
      },
      updateClientServices: {
        summary: "Update client services",
        description: "Updates services configuration",
      },
    },
    users: {
      tag: "Users",
      listRoles: {
        summary: "List roles",
        description: "Returns all available roles",
      },
      createManager: {
        summary: "Create manager",
        description: "Creates main manager for a client",
      },
    },
    schools: {
      tag: "Schools",
      list: {
        summary: "List schools",
        description: "Returns paginated list of schools",
      },
      stats: {
        summary: "Get statistics",
        description: "Returns schools, classes, students counts",
      },
      create: {
        summary: "Create school",
        description: "Creates a new school",
      },
      findOne: {
        summary: "Get school",
        description: "Returns school details",
      },
      update: {
        summary: "Update school",
        description: "Updates school information",
      },
      delete: {
        summary: "Delete school",
        description: "Soft deletes a school",
      },
    },
    classes: {
      tag: "Classes",
      list: {
        summary: "List classes",
        description: "Returns all classes for a school",
      },
      create: {
        summary: "Create class",
        description: "Creates a new class",
      },
      update: {
        summary: "Update class",
        description: "Updates class information",
      },
      delete: {
        summary: "Delete class",
        description: "Soft deletes a class",
      },
    },
    params: {
      clientId: "Client unique identifier (UUID)",
      schoolId: "School unique identifier (UUID)",
      classId: "Class unique identifier (UUID)",
      siret: "SIRET number (14 digits)",
      page: "Page number (starts at 1)",
      limit: "Items per page (max 100)",
      status: "Filter by status",
      clientType: "Filter by client type",
      search: "Search in name, SIRET, or city",
      schoolType: "Filter by school type",
      schoolStatus: "Filter by school status",
    },
    responses: {
      200: "Success",
      201: "Created successfully",
      400: "Invalid request data",
      404: "Resource not found",
      409: "Resource already exists",
    },
  },
} as const;
