/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gpsne8ee",
    "name": "role",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "manager",
        "requester",
        "viewer"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0iarb5abfj9atin")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gpsne8ee",
    "name": "role",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "manager",
        "requester",
        "viewer"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
