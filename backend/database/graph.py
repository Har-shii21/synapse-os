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
        self.driver.close()

    def save_project(self, task):

        query = """
        CREATE (p:Project {
            task: $task
        })
        """

        with self.driver.session() as session:
            session.run(query, task=task)

    def get_projects(self):

        query = """
        MATCH (p:Project)
        RETURN p.task AS task
        ORDER BY elementId(p) DESC
        LIMIT 5
        """

        with self.driver.session() as session:
            result = session.run(query)

            return [
                record["task"]
                for record in result
            ]

    def search_similar_projects(self):

        query = """
        MATCH (p:Project)
        RETURN p.task AS task
        ORDER BY elementId(p) DESC
        LIMIT 3
        """

        with self.driver.session() as session:

            result = session.run(query)

            return [
                record["task"]
                for record in result
            ]