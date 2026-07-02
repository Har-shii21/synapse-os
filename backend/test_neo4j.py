from database.graph import Neo4jConnection

db = Neo4jConnection()

db.driver.verify_connectivity()
print("Connected to Neo4j database successfully!")

db.close()