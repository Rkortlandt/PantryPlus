migrate((db) => {
  const collection = new Collection({
    "id": "4pzk5gvesw4ltfn",
    "created": "2023-07-09 23:16:43.704Z",
    "updated": "2023-07-09 23:16:43.704Z",
    "name": "lists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pqwonymh",
        "name": "Family1s_list",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kd4va4ub",
        "name": "family",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "4lzn3v06f8t9jbq",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4pzk5gvesw4ltfn");

  return dao.deleteCollection(collection);
})
