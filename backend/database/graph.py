import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv()


class Neo4jConnection:
    def __init__(self):
        self.driver = GraphDatabase.driver(
            os.getenv("NEO4J_URI"),
            auth=(
                os.getenv("NEO4J_USERNAME"),
                os.getenv("NEO4J_PASSWORD"),
            ),
            connection_timeout=30,
        )

    def close(self):
        self.driver = GraphDatabase.driver(
    os.getenv("NEO4J_URI"),
    auth=(
        os.getenv("NEO4J_USERNAME"),
        os.getenv("NEO4J_PASSWORD"),
    ),
    max_connection_lifetime=30 * 60,
    keep_alive=True,
)

    def save_project(self, task):
        query = """
        CREATE (p:Project {
            task: $task
        })
        """

        with self.driver.session() as session:
            session.run(query, task=task)