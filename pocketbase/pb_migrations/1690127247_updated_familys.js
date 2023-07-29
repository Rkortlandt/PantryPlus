migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.viewRule = "@request.auth.id = familyCoordinator.id"

  // remove
  collection.schema.removeField("ejiu5jjm")

  // remove
  collection.schema.removeField("7xa0is6g")

  // remove
  collection.schema.removeField("z9skyvrb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yedsvbjb",
    "name": "familyMembers",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0iarb5abfj9atin",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4lzn3v06f8t9jbq")

  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejiu5jjm",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7xa0is6g",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z9skyvrb",
    "name": "familyViewers",
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
  }))

  // remove
  collection.schema.removeField("yedsvbjb")

  return dao.saveCollection(collection)
})
