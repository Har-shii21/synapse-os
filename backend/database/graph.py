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
        )

    def close(self):
        self.driver.close()

    # -------------------------
    # Save Workflow
    # -------------------------

    def save_project(self, task):

        query = """
        MERGE (core:Core {name:"Synapse Core"})
        MERGE (planner:Agent {name:"Planner"})
        MERGE (researcher:Agent {name:"Researcher"})
        MERGE (engineer:Agent {name:"Engineer"})
        MERGE (security:Agent {name:"Security"})
        MERGE (analyst:Agent {name:"Analyst"})
        MERGE (reviewer:Agent {name:"Reviewer"})
        MERGE (memory:Memory {name:"Cognitive Memory"})

        CREATE (project:Project {
            name:$task
        })

        MERGE (core)-[:USES]->(planner)
        MERGE (core)-[:USES]->(researcher)
        MERGE (core)-[:USES]->(engineer)
        MERGE (core)-[:USES]->(security)
        MERGE (core)-[:USES]->(analyst)
        MERGE (core)-[:USES]->(reviewer)

        MERGE (planner)-[:CREATES]->(project)
        MERGE (researcher)-[:ANALYZES]->(project)
        MERGE (engineer)-[:IMPLEMENTS]->(project)
        MERGE (security)-[:SECURES]->(project)
        MERGE (analyst)-[:EVALUATES]->(project)
        MERGE (reviewer)-[:REVIEWS]->(project)

        MERGE (project)-[:STORED_IN]->(memory)
        """

        with self.driver.session() as session:
            session.run(query, task=task)

    # -------------------------
    # Recent Projects
    # -------------------------

    def get_projects(self):

        query = """
        MATCH (p:Project)
        RETURN p.name AS task
        ORDER BY elementId(p) DESC
        LIMIT 5
        """

        with self.driver.session() as session:
            result = session.run(query)

            return [record["task"] for record in result]

    # -------------------------
    # Memory Search
    # -------------------------

    def search_similar_projects(self):

        query = """
        MATCH (p:Project)
        RETURN p.name AS task
        ORDER BY elementId(p) DESC
        LIMIT 3
        """

        with self.driver.session() as session:
            result = session.run(query)

            return [record["task"] for record in result]

    # -------------------------
    # Dynamic Knowledge Graph
    # -------------------------

    def get_graph_data(self):

        query = """
        MATCH (a)-[r]->(b)

        RETURN
            elementId(a) AS sourceId,
            labels(a)[0] AS sourceType,
            coalesce(a.name,a.task) AS sourceLabel,

            type(r) AS relation,

            elementId(b) AS targetId,
            labels(b)[0] AS targetType,
            coalesce(b.name,b.task) AS targetLabel
        """

        nodes = {}
        edges = []

        with self.driver.session() as session:

            result = session.run(query)

            for record in result:

                sid = record["sourceId"]
                tid = record["targetId"]

                if sid not in nodes:
                    nodes[sid] = {
                        "id": sid,
                        "label": record["sourceLabel"],
                        "type": record["sourceType"],
                    }

                if tid not in nodes:
                    nodes[tid] = {
                        "id": tid,
                        "label": record["targetLabel"],
                        "type": record["targetType"],
                    }

                edges.append({
                    "source": sid,
                    "target": tid,
                    "label": record["relation"],
                })

        return {
            "nodes": list(nodes.values()),
            "edges": edges,
        }