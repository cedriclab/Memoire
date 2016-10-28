db = (new Mongo()).getDB("memoire_manips");

db.users_parsed.remove({});
db.normalized_questions.remove({});
db.normalized_resources.remove({});