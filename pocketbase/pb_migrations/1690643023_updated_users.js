migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.viewRule = "@request.auth.familyRelation.id = familyRelation.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yssnpxbo",
    "name": "familyRelation",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0iarb5abfj9atin",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  collection.viewRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yssnpxbo",
    "name": "family",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0iarb5abfj9atin",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
