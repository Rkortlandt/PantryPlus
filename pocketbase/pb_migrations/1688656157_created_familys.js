migrate((db) => {
  const collection = new Collection({
    "id": "4lzn3v06f8t9jbq",
    "created": "2023-07-06 15:09:17.390Z",
    "updated": "2023-07-06 15:09:17.390Z",
    "name": "familys",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ejiu5jjm",
        "name": "field",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
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
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq");

  return dao.deleteCollection(collection);
})
