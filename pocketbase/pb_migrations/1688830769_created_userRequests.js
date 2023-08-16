migrate((db) => {
  const collection = new Collection({
    "id": "i75zvnc51e32ysc",
    "created": "2023-07-08 15:39:29.892Z",
    "updated": "2023-07-08 15:39:29.892Z",
    "name": "userRequests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dpkybcgh",
        "name": "userRequest",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "uqggmat5",
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
      },
      {
        "system": false,
        "id": "xoo2dign",
        "name": "role",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "viewer",
            "requester",
            "manager"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id != ''",
    "viewRule": null,
    "createRule": "@request.auth.id != ''",
    "updateRule": null,
    "deleteRule": "@request.auth.id = userRequest.id || @request.auth.id = family.familyCoordinator.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc");

  return dao.deleteCollection(collection);
})
