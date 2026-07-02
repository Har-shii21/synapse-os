from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("NEO4J_URI")
username = os.getenv("NEO4J_USERNAME")
password = os.getenv("NEO4J_PASSWORD")

print("URI:", uri)
print("USERNAME:", username)
print("PASSWORD EXISTS:", password is not None)

driver = GraphDatabase.driver(uri, auth=(username, password))

try:
    driver.verify_connectivity()
    print("✅ Connected!")

except Exception as e:
    print(type(e).__name__)
    print(e)

finally:
    driver.close()