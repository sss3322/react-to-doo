export const DBConfig = {
    name: "TodoAppDB",
    version: 1,
    objectStoresMeta: [
      {
        store: "tasks",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "title", keypath: "title", options: { unique: false } },
          { name: "description", keypath: "description", options: { unique: false } },
          { name: "completed", keypath: "completed", options: { unique: false } },
          { name: "dueDate", keypath: "dueDate", options: { unique: false } },
          { name: "priority", keypath: "priority", options: { unique: false } },
        ],
      },
    ],
  };
  