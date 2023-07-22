migrate((db) => {
  const collection = new Collection({
    "id": "62oj10x15e12v1l",
    "created": "2023-07-10 23:53:33.414Z",
    "updated": "2023-07-10 23:53:33.414Z",
    "name": "familys_duplicate",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oviyb7ek",
        "name": "familyName",
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
        "id": "j2f7bvof",
        "name": "familyCoordinator",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "qwuakp1omvixwh1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "u8fbb169",
        "name": "familyManagers",
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
      },
      {
        "system": false,
        "id": "vfx7bnet",
        "name": "familyRequesters",
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
      },
      {
        "system": false,
        "id": "1upyx7nc",
        "name": "familyVeiwers",
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
    "listRule": "@request.auth.id != ''",
    "viewRule": "@request.auth.id = familyCoordinator.id",
    "createRule": "@request.auth.id != '' && @request.auth.collectionName = 'coordinators'",
    "updateRule": "@request.auth.id = familyCoordinator.id",
    "deleteRule": "@request.auth.id = familyCoordinator.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("62oj10x15e12v1l");

  return dao.deleteCollection(collection);
})
