migrate((db) => {
  const collection = new Collection({
    "id": "qwuakp1omvixwh1",
    "created": "2023-07-06 15:11:20.503Z",
    "updated": "2023-07-06 15:11:20.503Z",
    "name": "cordinators",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "k82v256j",
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
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qwuakp1omvixwh1");

  return dao.deleteCollection(collection);
})
