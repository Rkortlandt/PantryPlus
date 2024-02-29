/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = "@request.auth.id != '' && (user = @request.auth.id || family.familyCoordinator = @request.auth.id)"
  collection.deleteRule = "@request.auth.id = user.id || @request.auth.id = family.familyCoordinator.id"

  // remove
  collection.schema.removeField("xoo2dign")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dpkybcgh",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i75zvnc51e32ysc")

  collection.listRule = "@request.auth.id != '' && (userRequest = @request.auth.id || family.familyCoordinator = @request.auth.id)"
  collection.deleteRule = "@request.auth.id = userRequest.id || @request.auth.id = family.familyCoordinator.id"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xoo2dign",
    "name": "role",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "viewer",
        "requester",
        "manager"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dpkybcgh",
    "name": "userRequest",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
