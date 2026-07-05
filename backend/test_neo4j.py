from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

load_dotenv()

driver = GraphDatabase.driver(
    os.getenv("NEO4J_URI"),
    auth=(os.getenv("NEO4J_USERNAME"), os.getenv("NEO4J_PASSWORD"))
)

try:
    with driver.session() as session:
        result = session.run("RETURN 1 AS num")
        print(result.single()["num"])
        print("✅ Connected!")
except Exception as e:
    print(type(e).__name__)
    print(e)

driver.close()