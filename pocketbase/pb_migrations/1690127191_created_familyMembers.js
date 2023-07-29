migrate((db) => {
  const collection = new Collection({
    "id": "0iarb5abfj9atin",
    "created": "2023-07-23 15:46:31.538Z",
    "updated": "2023-07-23 15:46:31.538Z",
    "name": "familyMembers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pxkrnyqh",
        "name": "user",
        "type": "relation",
        "required": true,
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
        "id": "u6exbea8",
        "name": "family",
        "type": "relation",
        "required": true,
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
        "id": "gpsne8ee",
        "name": "role",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "manager",
            "requester",
            "viewer"
          ]
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
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin");

  return dao.deleteCollection(collection);
})
